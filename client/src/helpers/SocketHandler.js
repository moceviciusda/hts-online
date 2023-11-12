import io from 'socket.io-client'

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000')

        scene.socket.on('connect', () => {
            console.log('connected')
            scene.socket.emit('ready', scene.socket.id)
            scene.UIHandler.assignPlayerAreas()
        })

        scene.socket.on('alert', alert => {
            scene.UIHandler.alert(alert)
        })

        scene.socket.on('setCurrentTurn', currentTurn => {
            scene.GameHandler.setCurrentTurn(currentTurn)
            if (scene.GameHandler.gameState === 'ready') {
                scene.endTurn.setInteractive()
            }
        })

        scene.socket.on('setGameState', gameState => {
            scene.GameHandler.setGameState(gameState)

            if (gameState === 'partyLeaderSelection') {
                for (let player in scene.GameHandler.players) {
                    if (player !== scene.socket.id) {
                        scene.UIHandler.areas[player] = scene.UIHandler.availableAreas.shift()
                    }
                }
            }

            if (gameState === 'dealingHands') {
                scene.leaderSelectionText.destroy()
                scene.confirmLeader.destroy()
                scene.fadeBackground.setVisible(false)
                scene.GameHandler.partyLeaders.forEach(leader => {
                    leader.preFX.clear()
                    leader.setTint()
                    for (let player in scene.GameHandler.players) {
                        if (leader.getData('name') === scene.GameHandler.players[player].partyLeader) {
                            leader.setData('owner', player)
                            scene.CardHandler.moveToLeaderArea(leader).then(() => {
                                if (leader.getData('owner') === scene.GameHandler.currentTurn) {
                                    scene.socket.emit('leaderMoved')
                                }
                            })
                        }
                    }

                    if (!leader.getData('owner')) {
                        leader.destroy()
                    }
                });
                scene.discardPile = scene.DeckHandler.dealCard(scene.deckArea.x, scene.deckArea.y, 'cardBack', null).setAngle(-90).setInteractive()
                scene.discardPile.on('pointerup', () => scene.UIHandler.buildCardSelectionView(scene.discardArea.getData('cards')))
                scene.DeckHandler.dealCard(scene.monsterArea.x+344-85, scene.monsterArea.y, 'monsterCardBack', null)
                scene.UIHandler.buildGameText()
            }

            if (gameState === 'ready') {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    scene.monsterArea.getData('cards').forEach(monster => {
                        monster.preFX.clear()
                        if (monster.checkRequirements(scene.socket.id)) scene.CardHandler.highlight(monster)
                    })
                    scene.endTurn.setInteractive()
                }
            }
        })

        scene.socket.on('partyLeaders', partyLeaders =>{
            scene.UIHandler.dealPartyLeaders(partyLeaders)
            scene.UIHandler.buildLeaderSelectText()
        })

        scene.socket.on('dealMonster', monster => {
            scene.DeckHandler.dealMonster(monster)
        })

        scene.socket.on('updatePlayers', players => {
            scene.GameHandler.players = players
            console.log('Players Updated: ', scene.GameHandler.players)
        })

        scene.socket.on('updateDeck', deck => {
            scene.GameHandler.deck = deck
            console.log('Deck Updated: ', scene.GameHandler.deck)
        })

        scene.socket.on('drawCard', (card, player) => {
            scene.DeckHandler.drawCard(card, player)
        })

        scene.socket.on('cardPlayed', (name, target, player) => {
            let handArea = scene.UIHandler.areas[player].handArea
            let cardPlayed
            if (player === scene.socket.id) {
                cardPlayed = handArea.cards.find(card => card.getData('name') === name && card.getData('playing'))
            } else {
                cardPlayed = handArea.cards.find(card => card.getData('name') === name).setData('playing', true)
            }
            scene.UIHandler.buildChallengeView(cardPlayed, player)

            scene.socket.once('notChallenged', () => {
                scene.UIHandler.destroyChallengeView()

                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    if (cardPlayed.getData('type') === 'hero') scene.socket.emit('heroSummoned', name, player)
                    else if (cardPlayed.getData('type') === 'item')scene.socket.emit('itemEquiped', name, target, player)
                    else if (cardPlayed.getData('type') === 'magic')scene.socket.emit('magicCast', name, player)
                }
                scene.socket.removeAllListeners("challenged")
            })

            scene.socket.once('challenged', (challengeName, challenger) => {
                let playerResult, challengerResult
                let players = scene.GameHandler.players
                let challengerHandArea = scene.UIHandler.areas[challenger].handArea
                let challengeCard, challengerDice, playerDice
                if (challenger === scene.socket.id) {
                    challengeCard = challengerHandArea.cards.find(card => card.getData('name') === challengeName && card.getData('playing'))
                } else {
                    challengeCard = challengerHandArea.cards.find(card => card.getData('name') === challengeName).setData('playing', true)
                }
                challengerHandArea.cards.splice(challengerHandArea.cards.indexOf(challengeCard), 1)
    
                if (challenger !== scene.socket.id) {
                    scene.CardHandler.flipCard(challengeCard)
                }
                
                scene.CardHandler.moveToChallenge(challengeCard, cardPlayed)
                // initial challenge Rolls
                .then(() => new Promise(resolve => {
                    scene.UIHandler.destroyCardPreview()
                    scene.UIHandler.challenged(player, challenger)
                    scene.CardHandler.stackHand(challenger)

                    playerDice = scene.UIHandler.DiceHandler.buildDice(cardPlayed.x, cardPlayed.y + 300)
                    challengerDice = scene.UIHandler.DiceHandler.buildDice(challengeCard.x, challengeCard.y + 300)

                    playerResult = players[player].lastRoll.result1+players[player].lastRoll.result2
                    challengerResult = players[challenger].lastRoll.result1+players[challenger].lastRoll.result2

                    scene.UIHandler.DiceHandler.rollDice(
                        playerDice, 
                        players[player].lastRoll.result1,
                        players[player].lastRoll.result2
                        )
                    .then(() => {scene.UIHandler.DiceHandler.rollDice(
                        challengerDice, 
                        players[challenger].lastRoll.result1,
                        players[challenger].lastRoll.result2
                        )
                    .then(() => resolve())
                    })
                }))
                // Check for The Fist of Reason
                .then(() => new Promise(resolve => {
                    let leaderCard = scene.UIHandler.areas[challenger].leaderArea.getData('card')
                    if (leaderCard.getData('name') === 'theFistOfReason') {
                        scene.CardHandler.modifyRoll(challengerDice, leaderCard, 2)
                        .then(result => {
                            challengerResult = result
                            resolve()
                        })
                    } else resolve()
                }))
                // Check for Titan Wyvern
                .then(() => new Promise(resolve => {
                    let titanWyvern = scene.UIHandler.areas[player].slayArea.getData('monsters').concat(scene.UIHandler.areas[challenger].slayArea.getData('monsters'))
                    .find(monsterCard => monsterCard.getData('name') === 'titanWyvern')
                    if (titanWyvern) {
                        let ownerDice
                        titanWyvern.getData('owner') === player ? ownerDice = playerDice : ownerDice = challengerDice
                        scene.CardHandler.modifyRoll(ownerDice, titanWyvern, 1)
                        .then(result => {
                            titanWyvern.getData('owner') === player ? playerResult = result : challengerResult = result
                            resolve()
                        })
                    } else resolve()
                }))
                // Apply player turn modifiers
                .then(() => new Promise(resolve => {
                    scene.GameHandler.players[player].modifiers.reduce(
                        (promise, modifier) => promise.then(() => {
                            // this.move(unit)
                            console.log(modifier)
                            scene.CardHandler.modifyRoll(playerDice, modifier.card, modifier.value)
                            .then(result => playerResult = result)
                        }),
                        Promise.resolve()
                    ).then(() => resolve())
                }))
                // Apply challenger turn modifiers
                .then(() => new Promise(resolve => {
                    scene.GameHandler.players[challenger].modifiers.reduce(
                        (promise, modifier) => promise.then(() => {
                            // this.move(unit)
                            console.log(modifier)
                            scene.CardHandler.modifyRoll(challengerDice, modifier.card, modifier.value)
                            .then(result => challengerResult = result)
                        }),
                        Promise.resolve()
                    ).then(() => resolve())
                }))
                // Resolve Challenge
                .then(() => {
                    if (playerResult >= challengerResult) {
                        scene.discardArea.data.list.cards.push(challengeCard)
                        scene.CardHandler.moveToDiscard(challengeCard)
                        .then(() => {
                            if (player === scene.socket.id) scene.socket.emit('challengeFailed')
                        })
                    } else {
                        scene.UIHandler.destroyChallengeView()
                        cardPlayed.setData('playing', false)
                        challengeCard.setData('playing', false)
                        handArea.cards.splice(handArea.cards.indexOf(cardPlayed), 1)
                        
                        scene.discardArea.data.list.cards.push(cardPlayed)
                        scene.CardHandler.moveToDiscard(cardPlayed)
                        .then(() => scene.CardHandler.stackHand(player))
                        scene.discardArea.data.list.cards.push(challengeCard)
                        scene.CardHandler.moveToDiscard(challengeCard)
                        .then(() => {
                            scene.socket.removeAllListeners("notChallenged")
                            if (player === scene.socket.id) scene.socket.emit('challengeSuccessful')
                        })              
                    }
                })   

            })
        })

        scene.socket.on('heroSummoned', (name, player) => {
            let handArea = scene.UIHandler.areas[player].handArea
            let hero = handArea.cards.find(card => card.getData('name') === name && card.getData('playing'))
            
            handArea.cards.splice(handArea.cards.indexOf(hero), 1)
            scene.UIHandler.areas[player].heroArea.data.list.heroes.push(hero)
            hero.setData('playing', false)

            scene.CardHandler.moveToHeroArea(hero)
            .then(() => {
                scene.CardHandler.stackHand(player)
                scene.CardHandler.stackHeroes(player)
            })
        })

        scene.socket.on('itemEquiped', (itemName, heroName, player) => {
            let handArea = scene.UIHandler.areas[player].handArea
            let item = handArea.cards.find(card => card.getData('name') === itemName && card.getData('playing'))
            handArea.cards.splice(handArea.cards.indexOf(item), 1)
            item.setData('playing', false)

            let hero = scene.UIHandler.heroesOnBoard().find(card => card.getData('name') === heroName)
            scene.CardHandler.equipItem(item, hero)
            .then(() => scene.CardHandler.stackHand(player))
        })

        scene.socket.on('magicCast', (name, player) => {
            let handArea = scene.UIHandler.areas[player].handArea
            let magic = handArea.cards.find(card => card.getData('name') === name && card.getData('playing'))
            
            // Check for The Cloaked Sage
            if (scene.UIHandler.areas[player].leaderArea.getData('card').getData('name') === 'theCloakedSage' && scene.socket.id === player) {
                scene.socket.emit('drawCard', player)
            }
            
            handArea.cards.splice(handArea.cards.indexOf(magic), 1)
            magic.effect(player)
            magic.setData('playing', false)
            scene.discardArea.data.list.cards.push(magic)
            scene.CardHandler.moveToDiscard(magic)
            .then(() => scene.CardHandler.stackHand(player))
        })


        scene.socket.on('attacking', (monsterName, player) => {
            let monsterCard = scene.monsterArea.getData('cards').find(card => card.getData('name') === monsterName)
            monsterCard.preFX.clear()
            let dice
            let rollResult = scene.GameHandler.players[player].lastRoll.result1 + scene.GameHandler.players[player].lastRoll.result2

            scene.UIHandler.buildAttackView(monsterCard, player)
            .then(() => new Promise(resolve => {
                dice = scene.UIHandler.DiceHandler.buildDice(scene.scale.width/2, scene.scale.height/2)
                
                scene.UIHandler.DiceHandler.rollDice(
                    dice, 
                    scene.GameHandler.players[player].lastRoll.result1,
                    scene.GameHandler.players[player].lastRoll.result2
                    )
                .then(() => resolve())
            }))
            // Check for The Divine Arrow
            .then(() => new Promise(resolve => {
                let leaderCard = scene.UIHandler.areas[player].leaderArea.getData('card')
                if (leaderCard.getData('name') === 'theDivineArrow') {
                    scene.CardHandler.modifyRoll(dice, leaderCard, 1)
                    .then(result => {
                        rollResult = result
                        resolve()
                    })
                } else resolve()
            }))
            // Resolve Attack
            .then(() => {
                let result = monsterCard.checkSlay(rollResult)
                // scene.children.bringToTop(leaderCard)

                scene.UIHandler.destroyAttackView()
                scene.UIHandler.DiceHandler.destroyDice()
                scene.CardHandler.moveToLeaderArea(scene.UIHandler.areas[player].leaderArea.getData('card'))
                
                if (result === 'success') {
                    scene.monsterArea.data.list.cards.splice(scene.monsterArea.data.list.cards.indexOf(monsterCard), 1)
                    monsterCard.setData('owner', player)
                    
                    scene.CardHandler.moveToSlayArea(monsterCard)
                    .then(() => {
                        scene.UIHandler.areas[player].slayArea.data.list.monsters.push(monsterCard)
                        if (scene.socket.id === scene.GameHandler.currentTurn) scene.socket.emit('monsterSlayed', monsterCard.getData('name'), player)
                        monsterCard.slay(player)
                    })
                    
                } else if (result === 'fail') {
                    monsterCard.defeat(player)
                } else {
                    if (scene.socket.id === scene.GameHandler.currentTurn) scene.socket.emit('monsterSurvived', monsterCard.getData('name'), player)
                }
                scene.CardHandler.stackMonsters()
            })
        })

        scene.socket.on('diceRoll', (result1, result2, player) => {
            scene.GameHandler.players[player].lastRoll = {result1: result1, result2: result2}
            console.log(player, 'Rolled:', result1+result2, '(', result1, '+', result2, ')')
        })

        scene.socket.on('heroSacrificed', (heroName, player) => {
            let hero = scene.UIHandler.areas[player].heroArea.data.list.heroes.find(card => card.getData('name') === heroName)
            hero.setData('selected', false)
            scene.CardHandler.sacrificeHero(hero)
        })
        
        scene.socket.on('heroStolen', (heroName, heroOwner, player) => {
            let hero = scene.UIHandler.areas[heroOwner].heroArea.data.list.heroes.find(card => card.getData('name') === heroName)
            hero.setData({
                selected: false,
                owner: player
            })
            scene.UIHandler.areas[heroOwner].heroArea.data.list.heroes.splice(scene.UIHandler.areas[heroOwner].heroArea.data.list.heroes.indexOf(hero), 1)
            scene.UIHandler.areas[player].heroArea.data.list.heroes.push(hero)

            scene.CardHandler.moveToHeroArea(hero)
            .then(() => {
                scene.CardHandler.stackHeroes(heroOwner)
                scene.CardHandler.stackHeroes(player)
            })
        })

        scene.socket.on('discard', (cardName, player) => {
            let card
            if (player === scene.socket.id) {
                card = scene.UIHandler.areas[player].handArea.cards.find(card => card.getData('name') === cardName && card.getData('selected'))
            } else {
                card = scene.UIHandler.areas[player].handArea.cards.find(card => card.getData('name') === cardName)
            }
            card.setData('selected', false)
            scene.CardHandler.discard(card)
        })

        scene.socket.on('pullFromDiscard', (cardName, player) => {
            let card
            if (player === scene.socket.id) {
                card = scene.discardArea.getData('cards').find(card => card.getData('name') === cardName && card.getData('selected'))
            } else {
                card = scene.discardArea.getData('cards').find(card => card.getData('name') === cardName)
            }
            card.setData('selected', false)
            scene.CardHandler.pullFromDiscard(card, player)
        })

        scene.socket.on('unequipItem', (heroName, player) => {
            let heroCard = scene.UIHandler.areas[player].heroArea.data.list.heroes.find(heroCard => heroCard.getData('name') === heroName)
            let itemCard = heroCard.getData('item')

            heroCard.setData({
                class: heroCard.getData('originalClass'),
                item: null
            })
            itemCard.setData({
                hero: null,
                location: 'hand'
            })

            scene.UIHandler.areas[player].handArea.cards.push(itemCard)
            scene.CardHandler.moveToHand(itemCard, player)
            .then(() => scene.CardHandler.stackHand(player))
            
        })
    }
}