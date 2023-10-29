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

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            if (roll >= 9) this.slay()
            else if (roll <= 6) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}