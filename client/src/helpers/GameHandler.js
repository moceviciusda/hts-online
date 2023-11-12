import { Socket } from "socket.io-client"

export default class GameHandler {
    constructor(scene) {
        this.gameState = 'initializing'
        this.partyLeaders = []
        this.monsters = []
        this.deck = []
        this.players = {
        }
        this.currentTurn = null

        this.updateDeck = deck => {
            this.deck = deck
        }

        this.updatePlayers = players => {
            this.players = players
            // for (let player in this.players) {
            //     this.players[player].modifiers.passive = []
            //     this.players[player].modifiers.turn = []
            // }
            console.log('Players Updated: ', this.players)
        }

        this.setGameState = gameState => {
            this.gameState = gameState
            console.log('GameState: ' + this.gameState)
        }

        this.setCurrentTurn = currentTurn => {
            this.currentTurn = currentTurn
            console.log('currentTurn: ' + this.currentTurn)
        }

    }
}