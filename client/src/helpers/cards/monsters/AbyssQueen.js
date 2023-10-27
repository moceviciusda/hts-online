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
    }
}