import MonsterCard from "./MonsterCard"

export default class TitanWyvern extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'titanWyvern'
        this.cardSprite = 'titanWyvern'
    }
}