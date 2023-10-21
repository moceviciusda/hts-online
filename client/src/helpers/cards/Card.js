import CardHandler from "../CardHandler";

export default class Card {
    constructor(scene) {

        this.CardHandler = new CardHandler(scene)

        this.render = (x, y, owner) => {
            console.log('rendering card')
            // let sprite;
            // // if (owner === scene.GameHandler.player) {
            //     sprite = this.playerCardSprite
            // } else {
            //     sprite = this.opponentCardSprite
            // }
            // console.log(owner)
            let card = scene.add.image(x, y, this.cardSprite).setScale(0.5, 0.5).setInteractive().setData({
                'name': this.name,
                'owner': owner,
                'sprite': this.cardSprite,
                'type': this.type,
                'backSprite': 'htsCardBack',
                'location': 'deck'
            })
            if (this.type === 'hero') {
                card.setData('item', null)
            }

            if (owner === scene.socket.id) {
                scene.input.setDraggable(card)
            } else {
                card.setTexture(card.getData('backSprite'))
            }

            return card


            // this.cardContainer = scene.add.container(x, y, [card]).setSize(card.width, card.height).setScale(2, 2).setInteractive().setData({
            //     'name': this.name,
            //     'owner': owner,
            //     'sprite': sprite,
            //     'type': this.type
            // })

            // if (this.type === 'crystal') {
            //     this.cardContainer.add(scene.add.text(0, -45, `5 / 5`).setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5))
            //     this.cardContainer.setData({
            //         'health': this.health,
            //         'baseHealth': this.baseHealth,
            //         'boardScale': this.boardScale
            //     })
            // }
            // if (this.type === 'unit') {
            //     this.cardContainer.add([
            //         scene.add.text(-40, -55, this.cost), 
            //         scene.add.text(25, -55, this.power), 
            //         scene.add.text(35, -55, this.health),
            //         scene.add.text(30, -45, this.movementPoints)
            //     ])
            //     this.cardContainer.setData({
            //         'boardIdleSpritesheet': this.boardIdleSpritesheet,
            //         'damagedSpritesheet': this.damagedSpritesheet,
            //         'moveSpritesheet': this.moveSpritesheet,
            //         'attackSpritesheet': this.attackSpritesheet,
            //         'attackR2Spritesheet': this.attackR2Spritesheet ? this.attackR2Spritesheet : this.attackSpritesheet,
            //         'boardScale': this.boardScale,
            //         'mull': false,
                    
            //         'summonSick': true,
            //         'canMove': true,
            //         'canAttack': true,

            //         'baseMovementPoints': this.movementPoints,
            //         'baseRange': this.range,
            //         'basePower': this.power,
            //         'baseHealth': this.health,
            //         'baseCost': this.cost,


            //         'movementPoints': this.movementPoints,
            //         'range': this.range,
            //         'power': this.power,
            //         'health': this.health,
            //         'cost': this.cost,
 
            //         'armor': this.armor ? this.armor : 0,
            //         'quickAttack': this.quickAttack ? this.quickAttack : false
            //     })

            //     this.attack ? this.cardContainer.attack = this.attack : this.cardContainer.attack = target => new Promise ((resolve) => {
            //         if (target.getData('power') > 0) { // if target can fight back
            //             if (this.cardContainer.getData('quickAttack') && !target.getData('quickAttack')) {
            //                 // combatantX attacks first
            //                 this.cardContainer.first.play(this.cardContainer.getData('attackSpritesheet'))
            
            //             } else if (!this.cardContainer.getData('quickAttack') && target.getData('quickAttack')) {
            //                 // combatantY attacks first
            //                 target.first.play(target.getData('attackSpritesheet'))
            
            //             } else {
            //                 // standard resolution
            //                 this.cardContainer.first.play(this.cardContainer.getData('attackSpritesheet'))
            //                 target.first.play(target.getData('attackSpritesheet'))
            
                            
            //                 if (this.cardContainer.getData('boardPosition')) {  // placeholder. If X survives
            //                     this.cardContainer.first.once('animationcomplete-' + this.cardContainer.getData('attackSpritesheet'), () => {
            //                         this.cardContainer.first.play(this.cardContainer.getData('boardIdleSpritesheet'))
            //                         resolve()
            //                     })
            //                 } else {
            //                     this.cardContainer.first.once('animationcomplete-' + this.cardContainer.getData('attackSpritesheet'), () => {
            //                         this.cardContainer.first.play(this.cardContainer.getData('deathSpritesheet'))
            //                         resolve()
            //                     })
            //                 }
            
            //                 if (target.getData('boardPosition')) {  // placeholder. If Y survives
            //                     target.first.once('animationcomplete-' + target.getData('attackSpritesheet'), () => {
            //                         target.first.play(target.getData('boardIdleSpritesheet'))
                                    
            //                     })
            //                 } else {
            //                     target.first.once('animationcomplete-' + target.getData('attackSpritesheet'), () => {
            //                         target.first.play(target.getData('deathSpritesheet'))
            //                     })
            //                 }
            
            //                 console.log('melee hit ')
            //             }
            //         } else {
            //             this.cardContainer.first.play(this.cardContainer.getData('attackSpritesheet'))
            //             this.cardContainer.first.once('animationcomplete-' + this.cardContainer.getData('attackSpritesheet'), () => {
            //                 this.cardContainer.first.play(this.cardContainer.getData('boardIdleSpritesheet'))
            //                 target.takeDamage(this.cardContainer.getData('power')).then(() => {
            //                     resolve()
            //                 })
            //             })
            //         }
            //     })

            //     this.rangedAttack ? this.cardContainer.rangedAttack = this.rangedAttack : this.cardContainer.rangedAttack = target => new Promise ((resolve) =>  {
            //         console.log(`${this.cardContainer.getData('name')} ranged attack on ${target.getData('name')} for ${this.cardContainer.getData('power')} damage`)
                    
            //         let distance = Math.abs(this.cardContainer.getData('boardPosition').zone - target.getData('boardPosition').zone)
        
            //         this.cardContainer.first.play(this.cardContainer.getData(`attackR${distance}Spritesheet`))
            //         this.cardContainer.first.once('animationcomplete-' + this.cardContainer.getData(`attackR${distance}Spritesheet`), () => {
            //             this.cardContainer.first.play(this.cardContainer.getData('boardIdleSpritesheet'))
            //             target.takeDamage(this.cardContainer.getData('power')).then(() => {
            //                 resolve()
            //             })
                        
            //         })        
            //         console.log('ranged hit ')
            //     })
            // } 
            // if (this.type === 'spell') {
            //     this.cardContainer.add(scene.add.text(-40, -55, this.cost))
            //     this.cardContainer.setData({
            //         'baseCost': this.cost,
            //         'cost': this.cost,
            //     })
            // } 
            
            // this.cardContainer.onSummon = this.onSummon

            // this.takeDamage ? this.cardContainer.takeDamage = this.takeDamage : this.cardContainer.takeDamage = damage => new Promise ((resolve) => {
            //     this.cardContainer.first.play(this.damagedSpritesheet)
            //     // placeholder while no take damage animation
            //     this.cardContainer.setData('health', this.cardContainer.getData('health') - damage)
            //     this.CardHandler.updateBoardText(this.cardContainer)
            //     resolve()
            //     // this.cardContainer.first.once('animationcomplete-' + this.damagedSpritesheet, () => {
            //     //     this.cardContainer.setData('health', this.cardContainer.getData('health') - damage)
            //     //     this.CardHandler.updateBoardText(this.cardContainer)
            //     //     resolve()
            //     // })
            // })
            // this.die ? this.cardContainer.die = this.die : this.cardContainer.die = () => new Promise ((resolve) => {
            //     this.cardContainer.first.play(this.deathSpritesheet)
            //     this.cardContainer.first.once('animationcomplete-' + this.deathSpritesheet, () => {
            //         this.cardContainer.onDeath()
            //         resolve()
            //     })
            // })
            // this.onDeath ? this.cardContainer.onDeath = this.onDeath : this.cardContainer.onDeath = () => {
            //     // some default go to graveyard function
            //     console.log(this.cardContainer + 'default onDeath')
            // }
            
            // if (owner === scene.GameHandler.player && this.type !== 'crystal') {
            //     scene.input.setDraggable(this.cardContainer)
            // }

            // this.banish ? this.cardContainer.banish = this.banish : this.cardContainer.banish = () => new Promise ((resolve) => {
            //     this.CardHandler.removeFromBoard(this.cardContainer)
            //     this.cardContainer.destroy()
            //     resolve()
            // })

            // return this.cardContainer
        }
        
        // scene.anims.create({
        //     key: 'discard',
        //     frames: scene.anims.generateFrameNumbers('discard'),
        //     frameRate: 16,
        //     repeat: 0
        // })
    }
}