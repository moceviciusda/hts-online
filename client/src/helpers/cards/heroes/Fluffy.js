import Card from "../Card";

export default class Fluffy extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'fluffy'
        this.cardSprite = 'fluffy'
        this.type = 'hero'
        this.class = 'wizard'
    }
}