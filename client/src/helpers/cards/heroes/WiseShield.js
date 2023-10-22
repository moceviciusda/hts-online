import Card from "../Card";

export default class WiseShield extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'wiseShield'
        this.cardSprite = 'wiseShield'
        this.type = 'hero'
        this.class = 'guardian'
    }
}