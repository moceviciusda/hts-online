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

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            if (roll >= 8) this.slay()
            else if (roll <= 4) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}