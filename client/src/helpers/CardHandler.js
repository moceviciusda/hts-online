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
                x: scene.UIHandler.areas[owner].handArea.x + xSpread*scene.GameHandler.players[owner].hand.length,
                y: scene.UIHandler.areas[owner].handArea.y + ySpread*scene.GameHandler.players[owner].hand.length,
                angle: scene.UIHandler.areas[owner].angle,
                duration: 300,
                onComplete: () => {
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToHeroArea = card => new Promise(resolve => {
            let xSpread, ySpread, xPlus, yPlus
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
                x: scene.UIHandler.areas[card.getData('owner')].heroArea.x - scene.UIHandler.areas[card.getData('owner')].heroArea.width/2 + xPlus + xSpread*scene.UIHandler.areas[card.getData('owner')].heroArea.getData('heroes').length,
                y: scene.UIHandler.areas[card.getData('owner')].heroArea.y - scene.UIHandler.areas[card.getData('owner')].heroArea.height/2 + yPlus +  ySpread*scene.UIHandler.areas[card.getData('owner')].heroArea.getData('heroes').length,
                angle: scene.UIHandler.areas[card.getData('owner')].angle,
                duration: 300,
                onComplete: () => {
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
                    duration: 300,
                    onComplete: () => {
                        if (i >= hand.cards.length) {
                            resolve()
                        }
                        tween.remove()
                    }
                })
            }

            // for (let i=0; i<hand.cards.length; i++) {
            //     scene.children.bringToTop(hand[i])
                
            //     let tween = scene.tweens.add({
            //         targets: card,
            //         x: scene.UIHandler.areas[owner].handArea.x + xSpread*scene.GameHandler.players[owner].hand.length,
            //         y: scene.UIHandler.areas[owner].handArea.y + ySpread*scene.GameHandler.players[owner].hand.length,
            //         angle: scene.UIHandler.areas[owner].angle,
            //         duration: 300,
            //         onComplete: () => {
            //             resolve()
            //             tween.remove()
            //         }
            //     })

            //     if (hand === scene.GameHandler.player.hand) {
            //         let tween = scene.tweens.add({
            //             targets: hand[i],
            //             x: 300 + i*120,
            //             y: 1000,
            //             duration: 200,
            //             onComplete: () => {
            //                 hand.forEach(card => {
            //                     if (card.first.texture.key === 'cardBackStorm') {
            //                         this.flipCard(card)
            //                     }
            //                     scene.input.setDraggable(card, true)
            //                 })
            //                 // if (hand[i].first.texture.key === 'cardBackStorm') {
            //                 //     this.flipCard(hand[i])
            //                 // }
            //                 // scene.input.setDraggable(hand[i], true)
            //                 tween.remove()
            //             }
            //         })
            //     } else {
            //         let tween = scene.tweens.add({
            //             targets: hand[i],
            //             x: 1620 - i*120,
            //             y: 80,
            //             duration: 300,
            //             onComplete: () => {
            //                 tween.remove()
            //             }
            //         })
            //     }
            // }
        })
        
        // this.prepareMulligan = hand => {
        //     for (let i=0; i<hand.length; i++) {
        //         scene.children.bringToTop(hand[i])
        //         let tween = scene.tweens.add({
        //             targets: hand[i],
        //             x: 345 + i*410,
        //             y: 540,
        //             scale: 4,

        //             duration: 300,
        //             onComplete: () => {
        //                 this.flipCard(hand[i])
        //                 tween.remove()
        //             }
        //         })
        //     }
        // }
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

        // this.updateBoardText = card => {
        //     card.getAll('type', 'Text').forEach(label => {
        //         // label.setVisible(false)
        //         label.destroy()
        //     })
        //     card.add([scene.add.text(-35, 40, card.getData('power')), scene.add.text(30, 40, card.getData('health'))])
        // }
        // this.summon = (dropZone, card) => {

        //     dropZone.setData('card', scene.GameHandler.player.hand.splice(scene.GameHandler.player.hand.indexOf(card), 1)[0])
        //     card.setData('boardPosition', dropZone)
        //     // console.log(card.onSummon)
        //     if (card.onSummon) {
        //         card.onSummon()
        //     }

        //     card.first.setTexture(card.getData('boardIdleSpritesheet'), 0).play(card.getData('boardIdleSpritesheet'))
        //     card.first.setScale(card.getData('boardScale'))
        //     card.getData('owner') === scene.GameHandler.opponent ? card.first.flipX = true : card.first.flipX = false
        //     card.setScale(1, 1)
        //     card.input.hitArea.setTo(0, 0, 100, 100)

        //     this.updateBoardText(card)
            
        //     console.log(card)
        // }
        
        // // this.returnToDeck = (card, deck) => {
        // //     console.log(`${card.getData('name')} -> Returning to deck`)
        // //     this.removeFromBoard(card)

        // //     // this.moveToDeck(card)
        // //     deck.unshift(card)
        // // }

        // this.removeFromBoard = card => {
        //     card.getData('boardPosition').setData('card', null)
        //     card.setData('boardPosition', null)
        //     console.log(card)
        // }

        // // this.resetCard = card => {
        // //     card.first.setScale(1, 1).stop().setTexture(card.getData('sprite'))
        // //     card.setScale(2, 2)
        // //     card.getAll('type', 'Text').forEach(label => {
        // //         // label.setVisible(false)
        // //         label.destroy()
        // //     })
        // //     card.add([scene.add.text(-40, -55, card.getData('baseCost')),
        // //               scene.add.text(25, -55, card.getData('basePower')),
        // //               scene.add.text(35, -55, card.getData('baseHealth')),
        // //               scene.add.text(30, -45, card.getData('baseMovementPoints'))])

        // // }

        // this.returnToHand = (dropZone, hand) => {
        //     let card = dropZone.getData('card')
        //     dropZone.setData('card', null)
        //     console.log(card)

        //     card.first.setScale(1, 1).stop().setTexture(card.getData('sprite'))
        //     card.setScale(2, 2)
        //     card.getAll('type', 'Text').forEach(label => {
        //         // label.setVisible(false)
        //         label.destroy()
        //     })
        //     card.add([scene.add.text(-40, -55, card.getData('baseCost')),
        //               scene.add.text(25, -55, card.getData('basePower')),
        //               scene.add.text(35, -55, card.getData('baseHealth')),
        //               scene.add.text(30, -45, card.getData('baseMovementPoints'))])

        //     hand.push(card)
        //     this.stackHand(hand)
        // }
    }
}