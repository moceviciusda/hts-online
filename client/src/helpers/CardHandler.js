export default class CardHandler {
    constructor(scene) {

        this.moveToLeaderArea = card => new Promise(resolve => {
            let tween = scene.tweens.add({
                targets: card,
                x: scene.UIHandler.areas[card.getData('owner')].leaderArea.x,
                y: scene.UIHandler.areas[card.getData('owner')].leaderArea.y,
                angle: scene.UIHandler.areas[card.getData('owner')].angle,
                scale: 0.5,
                duration: 500,
                onComplete: () => {
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToMonsterArea = card => new Promise(resolve => {
            let tween = scene.tweens.add({
                targets: card,
                x: scene.monsterArea.x-344+85+172*scene.GameHandler.monsters.length,
                y: scene.monsterArea.y,
                duration: 500,
                onComplete: () => {
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToHand = (card, owner) => new Promise(resolve => {
            let xSpread, ySpread
            switch (scene.UIHandler.areas[owner].angle) {
                case 90:
                    xSpread = 0
                    ySpread = 100
                    break
                case 180:
                    xSpread = -100
                    ySpread = 0
                    break
                case -90:
                    xSpread = 0
                    ySpread = -100
                    break
                default:
                    xSpread = 100
                    ySpread = 0
                    break
            }
            let tween = scene.tweens.add({
                targets: card,
                x: scene.UIHandler.areas[owner].handArea.x + xSpread*scene.GameHandler.players[owner].hand.length/2,
                y: scene.UIHandler.areas[owner].handArea.y + ySpread*scene.GameHandler.players[owner].hand.length/2,
                angle: scene.UIHandler.areas[owner].angle,
                duration: 300,
                onComplete: () => {
                    card.setData('location', 'hand')
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToHeroArea = card => new Promise(resolve => {
            let xSpread, ySpread, xPlus, yPlus
            let heroArea = scene.UIHandler.areas[card.getData('owner')].heroArea
            switch (scene.UIHandler.areas[card.getData('owner')].angle) {
                case 90:
                case -90:
                    xSpread = 0
                    ySpread = card.displayWidth
                    xPlus = card.displayHeight/2
                    yPlus = card.displayWidth/2
                    break
                case 180:
                default:
                    xSpread = card.displayWidth
                    ySpread = 0
                    xPlus = card.displayWidth/2
                    yPlus = card.displayHeight/2
                    break
            }
            let tween = scene.tweens.add({
                targets: card,
                x: heroArea.x + xSpread*heroArea.getData('heroes').length/2,
                y: heroArea.y + ySpread*heroArea.getData('heroes').length/2,
                // x: scene.UIHandler.areas[card.getData('owner')].heroArea.x - scene.UIHandler.areas[card.getData('owner')].heroArea.width/2 + xPlus + xSpread*scene.UIHandler.areas[card.getData('owner')].heroArea.getData('heroes').length,
                // y: scene.UIHandler.areas[card.getData('owner')].heroArea.y - scene.UIHandler.areas[card.getData('owner')].heroArea.height/2 + yPlus +  ySpread*scene.UIHandler.areas[card.getData('owner')].heroArea.getData('heroes').length,
                angle: scene.UIHandler.areas[card.getData('owner')].angle,
                duration: 200,
                onComplete: () => {
                    card.setData('location', 'board')
                    card.input.dropZone = true
                    resolve()
                    tween.remove()
                }
            })
        })

        this.equipItem = (item, hero) => new Promise(resolve => {
            let xPlus, yPlus
            switch (hero.angle) {
                case 90:
                    xPlus = -40
                    yPlus = 0
                    break
                case -90:
                    xPlus = 40
                    yPlus = 0
                    break
                case 180:
                    xPlus = 0
                    yPlus = -40
                    break
                default:
                    xPlus = 0
                    yPlus = 40
                    break
            }
            scene.children.bringToTop(hero)
            let tween = scene.tweens.add({
                targets: item,
                x: hero.x + xPlus,
                y: hero.y + yPlus,
                angle: hero.angle,
                duration: 300,
                onComplete: () => {
                    item.setData('location', 'board')
                    hero.setData('item', item)
                    resolve()
                    tween.remove()
                }
            })
        })


        this.stickOut = card => {
            let tween = scene.tweens.add({
                targets: card,
                originY: 1,
                duration: 300,
                onComplete: () => {
                    tween.remove()
                }
            })
        }

        this.stickIn = card => {
            let tween = scene.tweens.add({
                targets: card,
                originY: 0.5,
                duration: 100,
                onComplete: () => {
                    tween.remove()
                }
            })
        }

        this.highlight = card => {
            let glow = card.postFX.addGlow(0xffffff, 0, 0, false, 0.1, 64)
            let tween = scene.tweens.add({
                targets: glow,
                outerStrength: 4,
                duration: 300,
                onComplete: () => {
                    tween.remove()
                }
            })
        }
        
        this.flipCard = card => {
            if (card.getData('sprite') === card.texture.key) {
                card.setTexture(card.getData('backSprite'))
            } else {
                card.setTexture(card.getData('sprite'))
            }
        }
        
        this.stackHand = player => new Promise(resolve => {
            let xSpread, ySpread, x, y
            let hand = scene.UIHandler.areas[player].handArea
            switch (scene.UIHandler.areas[player].angle) {
                case 90:
                    xSpread = 0
                    ySpread = 100
                    x = hand.x
                    y = hand.y - ySpread*hand.cards.length/2
                    break;
                case 180:
                    xSpread = -100
                    ySpread = 0
                    x = hand.x - xSpread*hand.cards.length/2
                    y = hand.y
                    break;
                case -90:
                    xSpread = 0
                    ySpread = -100
                    x = hand.x
                    y = hand.y - ySpread*hand.cards.length/2
                    break;
                default:
                    xSpread = 100
                    ySpread = 0
                    x = hand.x - xSpread*hand.cards.length/2
                    y = hand.y
                    break;
            }
            for (let i=0; i<hand.cards.length; i++) {
                scene.children.bringToTop(hand.cards[i])
                let tween = scene.tweens.add({
                    targets: hand.cards[i],
                    x: x + xSpread*(i+0.5),
                    y: y + ySpread*(i+0.5),
                    // angle: scene.UIHandler.areas[player].angle,
                    duration: 100,
                    onComplete: () => {
                        if (i >= hand.cards.length-1) {
                            resolve()
                        }
                        tween.remove()
                    }
                })
            }
        })
        
        this.stackHeroes = player => new Promise(resolve => {
            let xSpread, ySpread, x, y
            let heroArea = scene.UIHandler.areas[player].heroArea
            switch (scene.UIHandler.areas[player].angle) {
                case 90:
                case -90:
                    xSpread = 0
                    ySpread = heroArea.getData('heroes')[0].displayWidth
                    x = heroArea.x
                    y = heroArea.y - ySpread*heroArea.getData('heroes').length/2
                    break
                case 180:
                default:
                    xSpread = heroArea.getData('heroes')[0].displayWidth
                    ySpread = 0
                    x = heroArea.x - xSpread*heroArea.getData('heroes').length/2
                    y = heroArea.y
                    break
            }
            for (let i=0; i<heroArea.getData('heroes').length; i++) {
                let hero = heroArea.getData('heroes')[i]
                // scene.children.bringToTop(hero)
                let tween = scene.tweens.add({
                    targets: hero,
                    x: x + xSpread*(i+0.5),
                    y: y + ySpread*(i+0.5),
                    // angle: scene.UIHandler.areas[player].angle,
                    duration: 100,
                    onComplete: () => {
                        if (i >= heroArea.getData('heroes').length-1) {
                            resolve()
                        }
                        tween.remove()
                    }
                })
                if (hero.getData('item')) {
                    let item = hero.getData('item')
                    let itemTween = scene.tweens.add({
                        targets: item,
                        x: x + xSpread*(i+0.5),
                        y: y + ySpread*(i+0.5),
                        // angle: scene.UIHandler.areas[player].angle,
                        duration: 100,
                        onComplete: () => {
                            scene.CardHandler.equipItem(item, hero)
                            itemTween.remove()
                        }
                    })
                }
            }
        })
       
        // this.moveToGraveyard = (source, card, graveyard) => {
        //     card.first.play('discard')
        //     card.first.on('animationcomplete', () => {
        //         scene.GraveyardHandler.discard(source, card, graveyard)
        //         card.x = 200
        //         card.y = 700
        //         // card.alpha = 1
        //         scene.input.setDraggable(card, false)
        //         this.flipCard(card)
        //     })
        // }
    }
}