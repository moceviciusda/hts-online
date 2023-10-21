import CardHandler from "../CardHandler";

export default class Card {
    constructor(scene) {

        this.CardHandler = new CardHandler(scene)

        this.render = (x, y, owner) => {
            let card = scene.add.image(x, y, this.cardSprite).setScale(0.5, 0.5).setInteractive().setData({
                name: this.name,
                owner: owner,
                sprite: this.cardSprite,
                type: this.type,
                backSprite: 'htsCardBack',
                location: 'deck'
            })
            if (this.type === 'hero') {
                card.setData({
                    class: this.class,
                    item: null
                })
            }

            if (owner === scene.socket.id) {
                scene.input.setDraggable(card)
            } else {
                card.setTexture(card.getData('backSprite'))
            }

            return card

        }
        
    }
}