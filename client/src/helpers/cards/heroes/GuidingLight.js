import Card from "../Card";

export default class GuidingLight extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'guidingLight'
        this.cardSprite = 'guidingLight'
        this.type = 'hero'
        this.class = 'guardian'
    }
}