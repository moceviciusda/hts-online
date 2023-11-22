import Card from "../Card";

export default class Minus4 extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Modifier -4'
        this.name = 'minus4'
        this.cardSprite = 'minus4'
        this.type = 'modifier'

        this.options = [-4]

    }
}