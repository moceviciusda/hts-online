import Card from "../Card";

export default class VibrantGlow extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'vibrantGlow'
        this.cardSprite = 'vibrantGlow'
        this.type = 'hero'
        this.class = 'guardian'
    }
}