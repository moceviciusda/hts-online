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
                                    scene.socket.emit('leadersMoved')
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

        scene.socket.on('heroPlayed', (name, player) => {
            if (player !== scene.socket.id) {
                let card = scene.UIHandler.areas[player].handArea.cards.find(card => card.getData('name') === name)
                scene.UIHandler.areas[player].handArea.cards.splice(scene.UIHandler.areas[player].handArea.cards.indexOf(card), 1)

                scene.CardHandler.moveToHeroArea(card)
                .then(() => scene.CardHandler.flipCard(card))
                .then(() => scene.CardHandler.stackHand(player))

                scene.UIHandler.areas[player].heroArea.data.list.heroes.push(card)
            }
        })

        scene.socket.on('itemEquiped', (itemName, heroName, player) => {
            if (player !== scene.socket.id) {
                let item = scene.UIHandler.areas[player].handArea.cards.find(card => card.getData('name') === itemName)
                scene.UIHandler.areas[player].handArea.cards.splice(scene.UIHandler.areas[player].handArea.cards.indexOf(item), 1)

                let hero = scene.UIHandler.heroesOnBoard().find(card => card.getData('name') === heroName)
                scene.CardHandler.equipItem(item, hero)
                .then(() => scene.CardHandler.flipCard(item))
                .then(() => scene.CardHandler.stackHand(player))
            }
        })

    }
}