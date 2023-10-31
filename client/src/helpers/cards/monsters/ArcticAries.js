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

        this.checkSlay = roll => {
            if (roll >= 10)     return 'success'
            else if (roll <= 6) return 'fail'
            else                return 'neutral'
        }
    }
}