import MonsterCard from "./MonsterCard"

export default class Dracos extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'dracos'
        this.cardSprite = 'dracos'
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
            if (roll <= 5) this.slay()
            else if (roll >= 8) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}