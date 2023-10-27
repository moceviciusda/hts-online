export default class LeaderCard {
    constructor(scene) {

        this.render = (x, y, owner) => {

            let card = scene.add.image(x, y, this.cardSprite).setInteractive().setData({
                name: this.name,
                owner: owner,
                sprite: this.cardSprite,
                type: 'partyLeader',
                available: true,
                class: this.class
                // 'backSprite': 'htsCardBack'
            })

            return card
        }
    }
}