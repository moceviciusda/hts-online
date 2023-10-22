import Card from "../Card";

export default class Buttons extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'buttons'
        this.cardSprite = 'buttons'
        this.type = 'hero'
        this.class = 'wizard'
    }
}