import Card from "../Card";

export default class GuardianMask extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'guardianMask'
        this.cardSprite = 'guardianMask'
        this.type = 'item'
        this.class = 'guardian'
    }
}