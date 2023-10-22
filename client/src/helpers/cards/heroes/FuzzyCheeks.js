import Card from "../Card";

export default class FuzzyCheeks extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'fuzzyCheeks'
        this.cardSprite = 'fuzzyCheeks'
        this.type = 'hero'
        this.class = 'bard'
    }
}