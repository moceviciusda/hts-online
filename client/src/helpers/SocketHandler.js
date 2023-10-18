import io from 'socket.io-client'

export default class SocketHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000')

        scene.socket.on('connect', () => {
            console.log('connected')
            scene.socket.emit('ready', scene.socket.id)
            scene.UIHandler.assignPlayerAreas()
        })

        scene.socket.on('setCurrentTurn', currentTurn => {
            scene.GameHandler.setCurrentTurn(currentTurn)
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
                scene.GameHandler.partyLeaders.forEach(leader => {
                    leader.postFX.clear()
                    leader.setTint()
                    for (let player in scene.GameHandler.players) {
                        if (leader.getData('name') === scene.GameHandler.players[player].partyLeader) {
                            leader.setData('owner', player)
                            scene.CardHandler.moveToLeaderArea(leader)
                        }
                        
                    }
                    if (!leader.getData('owner')) {
                        leader.destroy()
                    }
                });
            }
            if (gameState === 'ready') {
                scene.DeckHandler.dealCard(scene.deckArea.x, scene.deckArea.y, 'cardBack', null).setAngle(-90)
            }
        })

        scene.socket.on('partyLeaders', partyLeaders =>{
            // if (!scene.UIHandler.partyLeadersDealt) {
                scene.UIHandler.dealPartyLeaders(partyLeaders)
            // }
            scene.UIHandler.buildLeaderSelectText()
            // if (scene.socket.id === scene.GameHandler.currentTurn) {
            //     scene.UIHandler.selectLeader()
            // }
            
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

        scene.socket.on('ready', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.players[socketId].hand.push(scene.DeckHandler.dealCard(155 + (i * 155), 860, cards[i], scene.socket.id))
                    
                }
            } else {
                pass
            }
        })

        // scene.socket.on('cardPlayed', (cardName, socketId) => {
        //     if (socketId !== scene.socket.id) {
        //         scene.GameHandler.opponent.hand.shift().destroy()
        //         scene.DeckHandler.dealCard(scene.playerHeroArea.x, scene.playerHeroArea.y, cardName)
        //     }
        // })


    }
}