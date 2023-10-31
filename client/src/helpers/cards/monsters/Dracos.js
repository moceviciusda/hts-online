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

        this.checkSlay = roll => {
            if (roll <= 5)      return 'success'
            else if (roll >= 8) return 'fail'
            else                return 'neutral'
        }
    }
}