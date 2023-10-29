import MonsterCard from "./MonsterCard"

export default class Bloodwing extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'bloodwing'
        this.cardSprite = 'bloodwing'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {}
        }

        this.slay = () => {
            console.log(this.name, 'slain')
        }

        this.defeat = () => {
            console.log(this.name, 'defeat')
        }

        this.checkSlay = roll => {
            if (roll >= 9) this.slay()
            else if (roll <= 6) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}