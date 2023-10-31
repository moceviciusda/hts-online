import MonsterCard from "./MonsterCard"

export default class Malamammoth extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'malamammoth'
        this.cardSprite = 'malamammoth'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {ranger: 1}
        }

        this.defeat = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildDiscardView(2)
            }
        }

        this.checkSlay = roll => {
            if (roll >= 8)      return 'success'
            else if (roll <= 4) return 'fail'
            else                return 'neutral'
        }
    }
}