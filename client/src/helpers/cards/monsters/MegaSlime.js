import MonsterCard from "./MonsterCard"

export default class MegaSlime extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'megaSlime'
        this.cardSprite = 'megaSlime'
        this.battleRequirements = {
            heroCount: 4,
            classRequirements: {}
        }
    }
}