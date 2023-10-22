import Card from "../Card";

export default class PanChucks extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'panChucks'
        this.cardSprite = 'panChucks'
        this.type = 'hero'
        this.class = 'fighter'
    }
}