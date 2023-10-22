import Card from "../Card";

export default class NappingNibbles extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'nappingNibbles'
        this.cardSprite = 'nappingNibbles'
        this.type = 'hero'
        this.class = 'bard'
    }
}