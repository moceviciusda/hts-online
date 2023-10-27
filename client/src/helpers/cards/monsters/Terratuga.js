import MonsterCard from "./MonsterCard"

export default class Terratuga extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'terratuga'
        this.cardSprite = 'terratuga'
        this.battleRequirements = {
            heroCount: 1,
            classRequirements: {}
        }
    }
}