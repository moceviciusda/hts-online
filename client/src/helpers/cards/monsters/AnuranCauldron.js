import MonsterCard from "./MonsterCard"

export default class AnuranCauldron extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'anuranCauldron'
        this.cardSprite = 'anuranCauldron'
        this.battleRequirements = {
            heroCount: 3,
            classRequirements: {}
        }
    }
}