import Card from "../Card";

export default class Hopper extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'hopper'
        this.cardSprite = 'hopper'
        this.type = 'hero'
        this.class = 'wizard'
    }
}