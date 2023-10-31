import MonsterCard from "./MonsterCard"

export default class CorruptedSabretooth extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'corruptedSabretooth'
        this.cardSprite = 'corruptedSabretooth'
        this.battleRequirements = {
            heroCount: 3,
            classRequirements: {}
        }

        this.slay = player => {
            console.log(this.name, 'slain')
            if (scene.socket.id === scene.GameHandler.currentTurn) {
                scene.socket.emit('drawCard', player)
            }
        }

        this.checkSlay = roll => {
            if (roll >= 9)      return 'success'
            else if (roll <= 6) return 'fail'
            else                return 'neutral'
        }
    }
}