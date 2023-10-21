import Card from "../Card";

export default class ThiefMask extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'thiefMask'
        this.cardSprite = 'thiefMask'
        this.type = 'item'
    }
}