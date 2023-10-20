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

        // this.opponent = {
        //     deck: [],
        //     graveyard: [],
        //     hand: [],
        //     crystals: [],
        //     mana: 1,
        //     deckPosition: [120, 130]
        // }



        // this.nextRound = () => {
        //     this.round++
        //     console.log('round: ' + this.round)
        // }

        // this.changeGameState = gameState => {
        //     this.gameState = gameState
        //     console.log('GameState: ' + this.gameState)
        // }

        // this.buildCrystals = (playerReal, opponentReal) => {

        //     for (let i = 0; i < 5; i++) {
        //         if (i < playerReal) {
        //             let crystal = scene.DeckHandler.dealCard('realCrystal', scene.GameHandler.player)
        //             scene.GameHandler.player.crystals.push(crystal.setScale(0.75))
        //         } else {
        //             let crystal = scene.DeckHandler.dealCard('fakeCrystal', scene.GameHandler.player)
        //             scene.GameHandler.player.crystals.push(crystal.setScale(0.75))
        //         }

        //         if (i < opponentReal) {
        //             let crystal = scene.DeckHandler.dealCard('realCrystal', scene.GameHandler.opponent)
        //             scene.GameHandler.opponent.crystals.push(crystal.setScale(0.75))
        //         } else {
        //             let crystal = scene.DeckHandler.dealCard('fakeCrystal', scene.GameHandler.opponent)
        //             scene.GameHandler.opponent.crystals.push(crystal.setScale(0.75))
        //         }
        //     }

        //     Phaser.Utils.Array.Shuffle(scene.GameHandler.player.crystals)
        //     Phaser.Utils.Array.Shuffle(scene.GameHandler.opponent.crystals)

        //     scene.GameHandler.player.crystals.forEach((crystal, i) => {
        //         let key = 'lane' + (i + 1)
        //         crystal.setData('boardPosition', scene.board[key][0])
        //         scene.board[key][0].setData('card', crystal)
        //         crystal.x = scene.board[key][0].x
        //         crystal.y = scene.board[key][0].y + 20
        //     })

        //     scene.GameHandler.opponent.crystals.forEach((crystal, i) => {
        //         let key = 'lane' + (i + 1)
        //         crystal.setData('boardPosition', scene.board[key][9])
        //         console.log(scene.board[key][9].setData('card', crystal))
        //         crystal.x = scene.board[key][9].x
        //         crystal.y = scene.board[key][9].y + 20
        //     })
            
        // }



    }
}