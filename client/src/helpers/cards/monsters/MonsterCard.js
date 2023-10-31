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

            card.checkRequirements = player => {
                let playerAreas = scene.UIHandler.areas[player]
                let classCount = 0
                if (playerAreas.heroArea.getData('heroes').length < this.battleRequirements.heroCount) return false
                
                else {
                    for (let classRequirement in this.battleRequirements.classRequirements) {
                        classCount = playerAreas.heroArea.getData('heroes').filter(hero => hero.getData('class') === classRequirement).length
                        if (playerAreas.leaderArea.getData('card').getData('class') === classRequirement) classCount++

                        if (classCount < this.battleRequirements.classRequirements[classRequirement]) return false
                    }
                    
                    return true
                }
            }

            card.checkSlay = this.checkSlay

            this.slay ? card.slay = this.slay : card.slay = player => {
                console.log(player, 'has slain', this.name)
            }

            this.defeat? card.defeat = this.defeat : card.defeat = player => {
                if (scene.socket.id === player && scene.UIHandler.areas[player].heroArea.getData('heroes').length > 0) {
                    scene.UIHandler.buildSacrificeHeroView(1)
                }
            }

            card.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id && !card.getData('owner') 
                && card.checkRequirements(scene.socket.id) && scene.GameHandler.gameState === 'ready') {
                    scene.socket.emit('attacking', card.getData('name'), scene.socket.id)
                }
            })

            return card
        }
        
    }
}