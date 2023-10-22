import Card from "../Card";

export default class SlyPickings extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'slyPickings'
        this.cardSprite = 'slyPickings'
        this.type = 'hero'
        this.class = 'thief'
    }
}