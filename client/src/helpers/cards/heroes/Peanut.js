import Card from "../Card";

export default class Peanut extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'peanut'
        this.cardSprite = 'peanut'
        this.type = 'hero'
        this.class = 'bard'
    }
}