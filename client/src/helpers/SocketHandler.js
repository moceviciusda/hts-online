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
                scene.DeckHandler.dealCard(scene.deckArea.x, scene.deckArea.y, 'cardBack', null).setAngle(-90)
                scene.DeckHandler.dealCard(scene.monsterArea.x+344-85, scene.monsterArea.y, 'monsterCardBack', null)
                scene.UIHandler.buildGameText()
            }

            if (gameState === 'ready') {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
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
                    if (cardPlayed.getData('type') === 'hero') scene.socket.emit('heroPlayed', name, player)
                    else if (cardPlayed.getData('type') === 'item')scene.socket.emit('itemEquiped', name, target, player)    
                }
                scene.socket.removeAllListeners("challenged")
            })

            scene.socket.once('challenged', (challengeName, challenger) => {
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
                .then(() => new Promise(resolve => {
                    scene.UIHandler.challenged(player, challenger)
                    scene.CardHandler.stackHand(challenger)

                    playerDice = scene.UIHandler.buildDice(cardPlayed.x, cardPlayed.y + 300)
                    console.log(playerDice)
                    
                    challengerDice = scene.UIHandler.buildDice(challengeCard.x, challengeCard.y + 300)
                    console.log(challengerDice)
                    scene.UIHandler.rollDice(
                        playerDice, 
                        players[player].lastRoll.result1,
                        players[player].lastRoll.result2
                        )
                    .then(() => {scene.UIHandler.rollDice(
                        challengerDice, 
                        players[challenger].lastRoll.result1,
                        players[challenger].lastRoll.result2
                        )
                    .then(() => resolve())
                    })
                }))
                .then(() => {
                    if (players[player].lastRoll.result1+players[player].lastRoll.result2 >= players[challenger].lastRoll.result1+players[challenger].lastRoll.result2) {
                        scene.CardHandler.moveToDiscard(challengeCard)
                        .then(() => {
                            if (player === scene.socket.id) scene.socket.emit('challengeFailed')
                        })
                    } else {
                        scene.UIHandler.destroyChallengeView()
                        cardPlayed.setData('playing', false)
                        challengeCard.setData('playing', false)
                        handArea.cards.splice(handArea.cards.indexOf(cardPlayed), 1)
                        

                        scene.CardHandler.moveToDiscard(cardPlayed)
                        .then(() => scene.CardHandler.stackHand(player))
                        scene.CardHandler.moveToDiscard(challengeCard)
                        .then(() => {
                            scene.socket.removeAllListeners("notChallenged")
                            if (player === scene.socket.id) scene.socket.emit('challengeSuccessful')
                        })              
                    }
                })   

            })
        })

        scene.socket.on('heroPlayed', (name, player) => {
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

        scene.socket.on('diceRoll', (result1, result2, player) => {
            scene.GameHandler.players[player].lastRoll = {result1: result1, result2: result2}
            console.log(player, 'Rolled:', result1+result2, '(', result1, '+', result2, ')')
        })
        
    }
}