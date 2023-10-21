import Card from "../Card";

export default class SealingKey extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'sealingKey'
        this.cardSprite = 'sealingKey'
        this.type = 'item'
    }
}