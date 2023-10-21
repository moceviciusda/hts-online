import Card from "../Card";

export default class BearClaw extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'bearClaw'
        this.cardSprite = 'bearClaw'
        this.type = 'hero'
    }
}