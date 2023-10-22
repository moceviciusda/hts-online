import Card from "../Card";

export default class MightyBlade extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'mightyBlade'
        this.cardSprite = 'mightyBlade'
        this.type = 'hero'
        this.class = 'guardian'
    }
}