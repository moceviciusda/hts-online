import Card from "../Card";

export default class SeriousGrey extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'seriousGrey'
        this.cardSprite = 'seriousGrey'
        this.type = 'hero'
        this.class = 'ranger'
    }
}