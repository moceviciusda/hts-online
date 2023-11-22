import Card from "../Card";

export default class Plus2Minus2 extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Modifier +2 /-2'
        this.name = 'plus2Minus2'
        this.cardSprite = 'plus2Minus2'
        this.type = 'modifier'

        this.options = [2, -2]

    }
}