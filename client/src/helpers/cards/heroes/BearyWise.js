import Card from "../Card";

export default class BearyWise extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'bearyWise'
        this.cardSprite = 'bearyWise'
        this.type = 'hero'
        this.class = 'fighter'
    }
}