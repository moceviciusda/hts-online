import Card from "../Card";

export default class Whiskers extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'whiskers'
        this.cardSprite = 'whiskers'
        this.type = 'hero'
        this.class = 'wizard'
    }
}