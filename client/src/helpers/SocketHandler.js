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
                    leader.postFX.clear()
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
            scene.UIHandler.buildChallengeView(name, player)
            let handArea = scene.UIHandler.areas[player].handArea
            let cardPlayed
            if (player === scene.socket.id) {
                cardPlayed = handArea.cards.find(card => card.getData('name') === name && card.getData('playing'))
            } else {
                cardPlayed = handArea.cards.find(card => card.getData('name') === name).setData('playing', true)
            }

            scene.socket.once('challenged', (challengeName, challenger) => {
                // console.log('YOOOOOOOOOO', name, target, player, handArea, cardPlayed)
                let challengerHandArea = scene.UIHandler.areas[challenger].handArea
                // console.log(challengerHandArea)
                let challengeCard
                if (challenger === scene.socket.id) {
                    challengeCard = challengerHandArea.cards.find(card => card.getData('name') === challengeName && card.getData('playing'))
                } else {
                    challengeCard = challengerHandArea.cards.find(card => card.getData('name') === challengeName).setData('playing', true)
                }
                challengerHandArea.cards.splice(challengerHandArea.cards.indexOf(challengeCard), 1)
                // card.setData('playing', false)
    
                if (challenger !== scene.socket.id) {
                    scene.CardHandler.flipCard(challengeCard)
                }
                scene.CardHandler.moveToChallenge(challengeCard, cardPlayed)
                .then(() => scene.CardHandler.stackHand(challenger))


                scene.socket.emit('diceRoll', challenger)
                scene.socket.once('diceRoll', (result1, result2, challenger) => {
                    let challengerDice = scene.UIHandler.buildDice(challengeCard.x, challengeCard.y)
                    scene.UIHandler.rollDice(challengerDice, result1, result2)
                    .then(result => console.log(challenger, 'Rolled:', result, '(', result1, '+', result2, ')'))
                    .then(() => {

                        scene.socket.emit('diceRoll', player)
                        scene.socket.once('diceRoll', (result1, result2, player) => {
                            let playerDice = scene.UIHandler.buildDice(cardPlayed.x, cardPlayed.y)
                            scene.UIHandler.rollDice(playerDice, result1, result2)
                            .then(result => console.log(player, 'Rolled:', result, '(', result1, '+', result2, ')'))
                        })
                    })
                })

            })

            scene.socket.once('notChallenged', () => {
                scene.UIHandler.destroyChallengeView()

                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    if (cardPlayed.getData('type') === 'hero') scene.socket.emit('heroPlayed', name, player)
                    else if (cardPlayed.getData('type') === 'item')scene.socket.emit('itemEquiped', name, target, player)    
                }
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

        
        
    }
}