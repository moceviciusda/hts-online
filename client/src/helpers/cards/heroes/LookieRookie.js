import Card from "../Card";

export default class LookieRookie extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'lookieRookie'
        this.cardSprite = 'lookieRookie'
        this.type = 'hero'
        this.class = 'ranger'
    }
}