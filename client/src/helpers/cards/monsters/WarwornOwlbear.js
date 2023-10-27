import MonsterCard from "./MonsterCard"

export default class WarwornOwlbear extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'warwornOwlbear'
        this.cardSprite = 'warwornOwlbear'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {thief: 1}
        }
    }
}