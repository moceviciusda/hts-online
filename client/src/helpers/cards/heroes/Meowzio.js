import Card from "../Card";

export default class Meowzio extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'meowzio'
        this.cardSprite = 'meowzio'
        this.type = 'hero'
        this.class = 'thief'
    }
}