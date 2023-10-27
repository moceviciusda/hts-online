export default class MonsterCard {
    constructor(scene) {

        this.render = (x, y, owner) => {

            let card = scene.add.image(x, y, this.cardSprite).setScale(0.5, 0.5).setInteractive().setData({
                name: this.name,
                owner: owner,
                sprite: this.cardSprite,
                type: 'monsterCard',
                backSprite: 'htsMonsterBack',
                battleRequirements: this.battleRequirements
            })

            card.checkRequirements = (player) => {
                let playerAreas = scene.UIHandler.areas[player]
                let classCount = 0
                if (playerAreas.heroArea.getData('heroes').length < this.battleRequirements.heroCount) return false
                
                else {
                    for (classRequirement in this.battleRequirements.classRequirements) {
                        classCount = playerAreas.heroArea.getData('heroes').filter(hero => hero.getData('class') === classRequirement).length
                        if (playerAreas.partyLeaderArea.getData('card').getData('class') === classRequirement) classCount++

                        if (classCount < this.battleRequirements.classRequirements[classRequirement]) return false
                    }
                    
                    return true
                }
            }

            return card
        }
    }
}