import MonsterCard from "./MonsterCard"

export default class Malamammoth extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'malamammoth'
        this.cardSprite = 'malamammoth'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {ranger: 1}
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