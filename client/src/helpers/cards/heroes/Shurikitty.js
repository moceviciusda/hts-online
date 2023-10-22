import Card from "../Card";

export default class Shurikitty extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'shurikitty'
        this.cardSprite = 'shurikitty'
        this.type = 'hero'
        this.class = 'thief'
    }
}