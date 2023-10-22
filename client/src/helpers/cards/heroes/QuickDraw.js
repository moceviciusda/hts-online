import Card from "../Card";

export default class QuickDraw extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'quickDraw'
        this.cardSprite = 'quickDraw'
        this.type = 'hero'
        this.class = 'ranger'
    }
}