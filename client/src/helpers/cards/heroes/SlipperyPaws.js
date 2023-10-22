import Card from "../Card";

export default class SlipperyPaws extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'slipperyPaws'
        this.cardSprite = 'slipperyPaws'
        this.type = 'hero'
        this.class = 'thief'
    }
}