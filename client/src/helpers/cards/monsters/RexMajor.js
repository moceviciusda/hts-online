import MonsterCard from "./MonsterCard"

export default class RexMajor extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'rexMajor'
        this.cardSprite = 'rexMajor'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {guardian: 1}
        }
    }
}