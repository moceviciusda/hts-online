import MonsterCard from "./MonsterCard"

export default class RexMajor extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'rexMajor'
        this.cardSprite = 'rexMajor'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {guardian: 1}
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