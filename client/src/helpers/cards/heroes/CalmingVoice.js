import Card from "../Card";

export default class CalmingVoice extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'calmingVoice'
        this.cardSprite = 'calmingVoice'
        this.type = 'hero'
        this.class = 'guardian'
    }
}