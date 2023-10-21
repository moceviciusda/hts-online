import Card from "../Card";

export default class Bullseye extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'bullseye'
        this.cardSprite = 'bullseye'
        this.type = 'hero'
        this.class = 'ranger'
    }
}