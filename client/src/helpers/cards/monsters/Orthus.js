import MonsterCard from "./MonsterCard"

export default class Orthus extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'orthus'
        this.cardSprite = 'orthus'
    }
}