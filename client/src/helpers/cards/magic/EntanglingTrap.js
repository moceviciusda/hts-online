import Card from "../Card";

export default class EntanglingTrap extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Entangling Trap'
        this.name = 'entanglingTrap'
        this.cardSprite = 'entanglingTrap'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildDiscardView(2)
                .then(() => scene.UIHandler.buildBoardSelectView(
                    scene.children.list.filter(card => card.getData('type') === 'hero' && card.getData('location') === 'board' && card.getData('owner') !== player),
                    1,
                    'Steal a Hero Card',
                    card => scene.socket.emit('heroStolen', card.getData('name'), card.getData('owner'), player)
                    )
                    .then(() => scene.socket.emit('setGameState', 'ready'))
                )
            }
            
        }
    }
}