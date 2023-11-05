import Card from "../Card";

export default class DecoyDoll extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'decoyDoll'
        this.displayName = 'Decoy Doll'
        this.cardSprite = 'decoyDoll'
        this.type = 'item'
    }
}