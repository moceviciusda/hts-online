export default class LeaderCard {
    constructor(scene) {

        this.render = (x, y, owner) => {
            console.log('rendering leader card')

            let card = scene.add.image(x, y, this.cardSprite).setInteractive().setData({
                'name': this.name,
                'owner': owner,
                'sprite': this.cardSprite,
                'type': 'partyLeaderCard',
                'available': true
                // 'backSprite': 'htsCardBack'
            })

            return card
        }
    }
}