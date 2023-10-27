import MonsterCard from "./MonsterCard"

export default class DarkDragonKing extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'darkDragonKing'
        this.cardSprite = 'darkDragonKing'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {bard: 1}
        }

    }
}