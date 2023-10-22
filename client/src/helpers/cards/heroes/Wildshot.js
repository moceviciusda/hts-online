import Card from "../Card";

export default class Wildshot extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'wildshot'
        this.cardSprite = 'wildshot'
        this.type = 'hero'
        this.class = 'ranger'
    }
}