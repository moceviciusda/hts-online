import Card from "../Card";

export default class Wiggles extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'wiggles'
        this.cardSprite = 'wiggles'
        this.type = 'hero'
        this.class = 'wizard'
    }
}