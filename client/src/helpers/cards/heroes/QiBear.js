import Card from "../Card";

export default class QiBear extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'qiBear'
        this.cardSprite = 'qiBear'
        this.type = 'hero'
        this.class = 'fighter'
    }
}