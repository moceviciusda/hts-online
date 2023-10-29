import MonsterCard from "./MonsterCard"

export default class AnuranCauldron extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'anuranCauldron'
        this.cardSprite = 'anuranCauldron'
        this.battleRequirements = {
            heroCount: 3,
            classRequirements: {}
        }

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            roll > 6 ? this.slay() : this.defeat()
        }
    }
}