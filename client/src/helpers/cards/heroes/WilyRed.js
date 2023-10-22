import Card from "../Card";

export default class WilyRed extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'wilyRed'
        this.cardSprite = 'wilyRed'
        this.type = 'hero'
        this.class = 'ranger'
    }
}