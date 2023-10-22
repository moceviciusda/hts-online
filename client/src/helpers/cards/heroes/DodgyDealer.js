import Card from "../Card";

export default class DodgyDealer extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'dodgyDealer'
        this.cardSprite = 'dodgyDealer'
        this.type = 'hero'
        this.class = 'bard'
    }
}