import MonsterCard from "./MonsterCard"

export default class MonsterCardBack extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'monsterCardBack'
        this.cardSprite = 'htsMonsterBack'
    }
}