import Card from "../Card";

export default class LuckyBucky extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'luckyBucky'
        this.cardSprite = 'luckyBucky'
        this.type = 'hero'
        this.class = 'bard'
    }
}