import Card from "../Card";

export default class ForcefulWinds extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Forceful Winds'
        this.name = 'forcefulWinds'
        this.cardSprite = 'forcefulWinds'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                let items = scene.children.list.filter(card => card.getData('type') === 'item' && card.getData('location') === 'board')
                items.forEach(itemCard => scene.socket.emit('unequipItem', itemCard.getData('hero').getData('name'), itemCard.getData('owner')))
            }
        }

    }
}