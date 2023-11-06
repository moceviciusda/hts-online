import Card from "../Card";

export default class ForcedExchange extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Forced Exchange'
        this.name = 'forcedExchange'
        this.cardSprite = 'forcedExchange'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                let targetPlayer
                let targetOptions = scene.children.list.filter(card => card.getData('type') === 'hero' && card.getData('location') === 'board' && card.getData('owner') !== player)

                if (targetOptions.length > 0) {
                    scene.UIHandler.buildBoardSelectView(
                        targetOptions,
                        1,
                        'Steal a Hero Card',
                        card => {
                            targetPlayer = card.getData('owner')
                            scene.socket.emit('heroStolen', card.getData('name'), card.getData('owner'), player)
                        }
                    )
                    .then(() => {
                        scene.time.delayedCall(500, () => {
                            scene.UIHandler.buildBoardSelectView(
                                scene.children.list.filter(card => card.getData('type') === 'hero' && card.getData('location') === 'board' && card.getData('owner') === player),
                                1,
                                'Give Away a Hero Card',
                                card => scene.socket.emit('heroStolen', card.getData('name'), player, targetPlayer)
                            )
                            .then(() => scene.socket.emit('setGameState', 'ready'))
                        })
                    })
                }

            }
            
        }
    }
}