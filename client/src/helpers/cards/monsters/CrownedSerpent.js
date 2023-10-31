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

        this.checkSlay = roll => {
            if (roll >= 10)     return 'success'
            else if (roll <= 7) return 'fail'
            else                return 'neutral'
        }
    }
}