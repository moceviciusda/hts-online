import Card from "../Card";

export default class FuryKnuckle extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'furyKnuckle'
        this.cardSprite = 'furyKnuckle'
        this.type = 'hero'
        this.class = 'fighter'
    }
}