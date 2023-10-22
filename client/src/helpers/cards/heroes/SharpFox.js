import Card from "../Card";

export default class SharpFox extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'sharpFox'
        this.cardSprite = 'sharpFox'
        this.type = 'hero'
        this.class = 'ranger'
    }
}