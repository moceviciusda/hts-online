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
                    card => new Promise(resolve => {
                        scene.discardArea.data.list.cards.splice(scene.discardArea.data.list.cards.indexOf(card), 1)
                        scene.UIHandler.areas[player].handArea.cards.push(card)
                        scene.CardHandler.moveToHand(card, player)
                        .then(() => resolve())
                    })
                )
            }
        }
    }
}