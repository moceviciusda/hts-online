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
    }
}