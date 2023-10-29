import MonsterCard from "./MonsterCard"

export default class DarkDragonKing extends MonsterCard {
    constructor(scene) {
        super(scene)
        this.name = 'darkDragonKing'
        this.cardSprite = 'darkDragonKing'
        this.battleRequirements = {
            heroCount: 2,
            classRequirements: {bard: 1}
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