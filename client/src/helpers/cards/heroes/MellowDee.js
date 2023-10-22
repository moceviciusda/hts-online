import Card from "../Card";

export default class MellowDee extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'mellowDee'
        this.cardSprite = 'mellowDee'
        this.type = 'hero'
        this.class = 'bard'
    }
}