import Card from "../Card";

export default class WindsOfChange extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Winds Of Change'
        this.name = 'windsOfChange'
        this.cardSprite = 'windsOfChange'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                scene.UIHandler.buildBoardSelectView(
                    scene.UIHandler.heroesOnBoard().filter(heroCard => heroCard.getData('item')),
                    1,
                    'Unequip Item',
                    card => scene.socket.emit('unequipItem', card.getData('name'), card.getData('owner'))
                )
                .then(() => scene.socket.emit('drawCard', player))
            }
            
        }
    }
}