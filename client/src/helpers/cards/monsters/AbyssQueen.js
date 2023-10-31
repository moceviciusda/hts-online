import MonsterCard from "./MonsterCard"

export default class AbyssQueen extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'abyssQueen'
        this.cardSprite = 'abyssQueen'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {}
        }

        this.checkSlay = roll => {
            if (roll >= 8)      return 'success'
            else if (roll <= 5) return 'fail'
            else                return 'neutral'
        }
    }
}