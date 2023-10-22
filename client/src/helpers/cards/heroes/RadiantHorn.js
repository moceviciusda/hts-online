import Card from "../Card";

export default class RadiantHorn extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'radiantHorn'
        this.cardSprite = 'radiantHorn'
        this.type = 'hero'
        this.class = 'guardian'
    }
}