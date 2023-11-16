import Card from "../Card";

export default class EnchantedSpell extends Card {
    constructor(scene) {
        super(scene)
        this.displayName = 'Enchanted Spell'
        this.name = 'enchantedSpell'
        this.cardSprite = 'enchantedSpell'
        this.type = 'magic'

        this.effect = player => {
            scene.GameHandler.players[player].modifiers.push({
                card: scene.children.list.find(card => card.getData('name') === this.name && card.getData('playing')),
                value: 2
            })
        }

    }
}
