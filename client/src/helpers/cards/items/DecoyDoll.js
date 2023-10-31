import Card from "../Card";

export default class DecoyDoll extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'Decoy Doll'
        this.cardSprite = 'decoyDoll'
        this.type = 'item'
    }
}