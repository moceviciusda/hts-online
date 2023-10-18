export default class MonsterCard {
    constructor(scene) {

        this.render = (x, y, owner) => {
            console.log('rendering monster card')

            let card = scene.add.image(x, y, this.cardSprite).setScale(0.5, 0.5).setInteractive().setData({
                'name': this.name,
                'owner': owner,
                'sprite': this.cardSprite,
                'type': 'monsterCard',
                'backSprite': 'htsMonsterBack'
            })

            return card
        }
    }
}