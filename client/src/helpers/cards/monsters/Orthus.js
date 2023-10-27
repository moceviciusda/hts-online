import MonsterCard from "./MonsterCard"

export default class Orthus extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'orthus'
        this.cardSprite = 'orthus'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {wizard: 1}
        }
    }
}