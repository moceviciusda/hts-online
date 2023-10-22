import Card from "../Card";

export default class HolyCurselifter extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'holyCurselifter'
        this.cardSprite = 'holyCurselifter'
        this.type = 'hero'
        this.class = 'guardian'
    }
}