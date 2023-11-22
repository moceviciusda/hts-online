import Card from "../Card";

export default class Plus1Minus3 extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Modifier +1 /-3'
        this.name = 'plus1Minus3'
        this.cardSprite = 'plus1Minus3'
        this.type = 'modifier'

        this.options = [1, -3]

    }
}