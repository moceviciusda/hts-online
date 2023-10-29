import MonsterCard from "./MonsterCard"

export default class WarwornOwlbear extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'warwornOwlbear'
        this.cardSprite = 'warwornOwlbear'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {thief: 1}
        }

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            if (roll >= 8) this.slay()
            else if (roll <= 4) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}