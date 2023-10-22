import Card from "../Card";

export default class PlunderingPuma extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'plunderingPuma'
        this.cardSprite = 'plunderingPuma'
        this.type = 'hero'
        this.class = 'thief'
    }
}