import MonsterCard from "./MonsterCard"

export default class Terratuga extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'terratuga'
        this.cardSprite = 'terratuga'
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
            if (roll >= 11) this.slay()
            else if (roll <= 7) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}