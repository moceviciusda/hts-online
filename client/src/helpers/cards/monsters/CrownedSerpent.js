import MonsterCard from "./MonsterCard"

export default class CrownedSerpent extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'crownedSerpent'
        this.cardSprite = 'crownedSerpent'
        this.battleRequirements = {
            heroCount: 2,
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
            else if (roll <= 7) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}