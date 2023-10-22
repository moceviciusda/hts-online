import Card from "../Card";

export default class BadAxe extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'badAxe'
        this.cardSprite = 'badAxe'
        this.type = 'hero'
        this.class = 'fighter'
    }
}