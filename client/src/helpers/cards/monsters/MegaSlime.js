import MonsterCard from "./MonsterCard"

export default class MegaSlime extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'megaSlime'
        this.cardSprite = 'megaSlime'
        this.battleRequirements = {
            heroCount: 4,
            classRequirements: {}
        }

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            roll > 7 ? this.slay() : this.defeat()
        }
    }
}