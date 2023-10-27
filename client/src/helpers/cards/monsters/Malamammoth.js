import MonsterCard from "./MonsterCard"

export default class Malamammoth extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'malamammoth'
        this.cardSprite = 'malamammoth'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {ranger: 1}
        }
    }
}