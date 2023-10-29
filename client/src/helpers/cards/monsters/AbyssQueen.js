import MonsterCard from "./MonsterCard"

export default class AbyssQueen extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'abyssQueen'
        this.cardSprite = 'abyssQueen'
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
            if (roll >= 8) this.slay()
            else if (roll <= 5) this.defeat()
            else console.log(this.name, 'neutral')
        }
    }
}