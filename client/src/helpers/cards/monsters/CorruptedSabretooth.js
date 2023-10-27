import MonsterCard from "./MonsterCard"

export default class CorruptedSabretooth extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'corruptedSabretooth'
        this.cardSprite = 'corruptedSabretooth'
        this.battleRequirements = {
            heroCount: 3,
            classRequirements: {}
        }
    }
}