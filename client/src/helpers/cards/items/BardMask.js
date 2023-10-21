import Card from "../Card";

export default class BardMask extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'bardMask'
        this.cardSprite = 'bardMask'
        this.type = 'item'
    }
}