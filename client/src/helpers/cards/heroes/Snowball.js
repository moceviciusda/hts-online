import Card from "../Card";

export default class Snowball extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'snowball'
        this.cardSprite = 'snowball'
        this.type = 'hero'
        this.class = 'wizard'
    }
}