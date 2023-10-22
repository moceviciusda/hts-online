import Card from "../Card";

export default class HeavyBear extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'heavyBear'
        this.cardSprite = 'heavyBear'
        this.type = 'hero'
        this.class = 'fighter'
    }
}