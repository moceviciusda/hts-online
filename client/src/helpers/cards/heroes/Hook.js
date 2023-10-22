import Card from "../Card";

export default class Hook extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'hook'
        this.cardSprite = 'hook'
        this.type = 'hero'
        this.class = 'ranger'
    }
}