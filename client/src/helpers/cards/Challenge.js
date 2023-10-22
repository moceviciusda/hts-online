import Card from "./Card"

export default class Challenge extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'challenge'
        this.cardSprite = 'challenge'
        this.type = 'challenge'
    }
}