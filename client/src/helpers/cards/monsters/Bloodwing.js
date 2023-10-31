import MonsterCard from "./MonsterCard"

export default class Bloodwing extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'bloodwing'
        this.cardSprite = 'bloodwing'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {}
        }

        this.checkSlay = roll => {
            if (roll >= 9)      return 'success'
            else if (roll <= 6) return 'fail'
            else                return 'neutral'
        }
    }
}