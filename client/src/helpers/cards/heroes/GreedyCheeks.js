import Card from "../Card";

export default class GreedyCheeks extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'greedyCheeks'
        this.cardSprite = 'greedyCheeks'
        this.type = 'hero'
        this.class = 'bard'
    }
}