import MonsterCard from "./MonsterCard"

export default class ArcticAries extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'arcticAries'
        this.cardSprite = 'arcticAries'
        this.battleRequirements = {
            heroCount: 1,
            classRequirements: {}
        }

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            if (roll >= 10) this.slay()
            else if (roll <= 6) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}