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
    }
}