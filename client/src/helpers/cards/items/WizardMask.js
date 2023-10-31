import Card from "../Card";

export default class WizardMask extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'wizardMask'
        this.cardSprite = 'wizardMask'
        this.type = 'item'
        this.class = 'wizard'
    }
}