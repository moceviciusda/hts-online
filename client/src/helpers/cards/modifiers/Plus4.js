import Card from "../Card";

export default class Plus4 extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Modifier +4'
        this.name = 'plus4'
        this.cardSprite = 'plus4'
        this.type = 'modifier'

        this.options = [4]

    }
}