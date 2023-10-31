import Card from "../Card";

export default class FighterMask extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'fighterMask'
        this.cardSprite = 'fighterMask'
        this.type = 'item'
        this.class = 'fighter'
    }
}