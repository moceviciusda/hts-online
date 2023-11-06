import Card from "../Card";

export default class CallToTheFallen extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Call to the Fallen'
        this.name = 'callToTheFallen'
        this.cardSprite = 'callToTheFallen'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildCardSelectionView(
                    scene.discardArea.getData('cards').filter(dCard => dCard.getData('type') === 'hero'),
                    1,
                    'Pick a Hero',
                    card => scene.socket.emit('pullFromDiscard', card.getData('name'), player)
                )
                .then(cards => {
                    cards.forEach(card => scene.CardHandler.moveToDiscard(card))
                    scene.time.delayedCall(500, () => scene.GameHandler.setGameState('ready'))
                })
            }
        }
    }
}