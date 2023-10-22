import Card from "../Card";

export default class KitNapper extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'kitNapper'
        this.cardSprite = 'kitNapper'
        this.type = 'hero'
        this.class = 'thief'
    }
}