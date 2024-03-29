import Card from "../Card";

export default class DestructiveSpell extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Destructive Spell'
        this.name = 'destructiveSpell'
        this.cardSprite = 'destructiveSpell'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildDiscardView(1)
                .then(() => scene.UIHandler.buildBoardSelectView(
                    scene.children.list.filter(card => card.getData('type') === 'hero' && card.getData('location') === 'board'),
                    1,
                    'Destroy a Hero',
                    card => scene.socket.emit('heroSacrificed', card.getData('name'), card.getData('owner'))
                    )
                    .then(() => scene.socket.emit('setGameState', 'ready'))
                )

            }
        }
    }
}