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

        this.slay = player => {
            console.log(this.name, 'slain')
            if (scene.socket.id === scene.GameHandler.currentTurn) {
                scene.socket.emit('drawCard', player)
                scene.socket.emit('drawCard', player)
            }
        }

        this.checkSlay = roll => {
            if (roll > 7)   return 'success'
            else            return 'fail'
        }
    }
}