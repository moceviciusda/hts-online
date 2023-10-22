import Card from "../Card";

export default class ToughTeddy extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'toughTeddy'
        this.cardSprite = 'toughTeddy'
        this.type = 'hero'
        this.class = 'fighter'
    }
}