import Card from "../Card";

export default class Spooky extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'spooky'
        this.cardSprite = 'spooky'
        this.type = 'hero'
        this.class = 'wizard'
    }
}