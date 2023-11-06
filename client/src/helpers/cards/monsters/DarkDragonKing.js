import MonsterCard from "./MonsterCard"

export default class DarkDragonKing extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'darkDragonKing'
        this.cardSprite = 'darkDragonKing'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {bard: 1}
        }

        this.defeat = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildDiscardView(2)
                .then(() => scene.socket.emit('setGameState', 'ready'))
            }
        }

        this.checkSlay = roll => {
            if (roll >= 8)      return 'success'
            else if (roll <= 4) return 'fail'
            else                return 'neutral'
        }
    }
}