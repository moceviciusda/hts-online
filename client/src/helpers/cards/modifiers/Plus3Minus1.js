import Card from "../Card";

export default class Plus3Minus1 extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Modifier +3 /-1'
        this.name = 'plus3Minus1'
        this.cardSprite = 'plus3Minus1'
        this.type = 'modifier'

        this.options = [3, -1]

    }
}