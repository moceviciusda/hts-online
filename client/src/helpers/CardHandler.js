export default class CardHandler {
    constructor(scene) {

        this.moveToLeaderArea = card => new Promise(resolve => {
            let ownerAreas = scene.UIHandler.areas[card.getData('owner')]
            ownerAreas.leaderArea.setData('card', card)
            let tween = scene.tweens.add({
                targets: card,
                x: ownerAreas.leaderArea.x,
                y: ownerAreas.leaderArea.y,
                angle: ownerAreas.angle,
                scale: 0.5,
                duration: 500,
                onComplete: () => {
                    scene.children.sendToBack(card)
                    resolve()
                    tween.remove()
                }
            })
        })

        // this.moveToMonsterArea = card => new Promise(resolve => {
        //     let tween = scene.tweens.add({
        //         targets: card,
        //         x: scene.monsterArea.x-344+85+172*scene.monsterArea.getData('cards').length,
        //         y: scene.monsterArea.y,
        //         scale: 0.5,
        //         duration: 500,
        //         onComplete: () => {
        //             resolve()
        //             tween.remove()
        //         }
        //     })
        // })

        this.stackMonsters = () => new Promise(resolve => {
            for (let i=0; i<scene.monsterArea.getData('cards').length; i++) {
                let tween = scene.tweens.add({
                    targets: scene.monsterArea.getData('cards')[i],
                    x: scene.monsterArea.x-344+85+172*i,
                    y: scene.monsterArea.y,
                    scale: 0.5,
                    duration: 300,
                    onComplete: () => {
                        if (i >= scene.monsterArea.getData('cards').length-1) resolve()
                        tween.remove()
                    }
                })
            }
        })

        this.moveToSlayArea = card => new Promise(resolve => {
            let xSpread, ySpread, xPlus, yPlus
            let slayArea = scene.UIHandler.areas[card.getData('owner')].slayArea
            switch (scene.UIHandler.areas[card.getData('owner')].angle) {
                case 90:
                case -90:
                    xSpread = 0
                    ySpread = card.displayWidth
                    xPlus = 0
                    yPlus = -slayArea.height/2 + ySpread/4
                    break
                case 180:
                default:
                    xSpread = card.displayWidth
                    ySpread = 0
                    xPlus = -slayArea.width/2 + xSpread/4
                    yPlus = 0
                    break
            }
            let tween = scene.tweens.add({
                targets: card,
                x: slayArea.x + xPlus + xSpread*slayArea.getData('monsters').length/2,
                y: slayArea.y + yPlus + ySpread*slayArea.getData('monsters').length/2,
                angle: scene.UIHandler.areas[card.getData('owner')].angle,
                scale: 0.5,
                duration: 500,
                onComplete: () => {
                    scene.children.sendToBack(card)
                    card.setData('location', 'board')
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToHand = (card, owner) => new Promise(resolve => {
            let xSpread, ySpread
            card.input.dropZone = false
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
                x: scene.UIHandler.areas[owner].handArea.x + xSpread*scene.UIHandler.areas[owner].handArea.cards.length/2,
                y: scene.UIHandler.areas[owner].handArea.y + ySpread*scene.UIHandler.areas[owner].handArea.cards.length/2,
                angle: scene.UIHandler.areas[owner].angle,
                scale: 0.5,
                duration: 300,
                onComplete: () => {
                    card.setData({
                        location: 'hand',
                        owner: owner
                    })
                    if (owner === scene.socket.id) {
                        scene.input.setDraggable(card, true)
                        if (card.getData('backSprite') === card.texture.key) this.flipCard(card)
                    } else {
                        scene.input.setDraggable(card, false)
                        if (card.getData('sprite') === card.texture.key) this.flipCard(card)
                    }
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToHeroArea = card => new Promise(resolve => {
            let xSpread, ySpread
            let heroArea = scene.UIHandler.areas[card.getData('owner')].heroArea
            switch (scene.UIHandler.areas[card.getData('owner')].angle) {
                case 90:
                case -90:
                    xSpread = 0
                    ySpread = card.displayWidth
                    break
                case 180:
                default:
                    xSpread = card.displayWidth
                    ySpread = 0
                    break
            }
            let tween = scene.tweens.add({
                targets: card,
                x: heroArea.x + xSpread*heroArea.getData('heroes').length/2,
                y: heroArea.y + ySpread*heroArea.getData('heroes').length/2,
                angle: scene.UIHandler.areas[card.getData('owner')].angle,
                scale: 0.5,
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
            
            let tween = scene.tweens.add({
                targets: item,
                x: hero.x + xPlus,
                y: hero.y + yPlus,
                angle: hero.angle,
                scale: 0.5,
                duration: 300,
                onComplete: () => {
                    item.setData({location: 'board', hero: hero, owner: hero.getData('owner')})
                    hero.setData('item', item)
                    if (item.getData('class')) hero.setData('class', item.getData('class'))
                    scene.children.bringToTop(hero)
                    resolve()
                    tween.remove()
                }
            })
        })

        this.moveToChallenge = (challengeCard, challengeTarget) => new Promise(resolve => {
            scene.children.bringToTop(challengeCard)
            let challengeTween = scene.tweens.add({
                targets: challengeCard,
                x: scene.scale.width/2 + challengeTarget.displayWidth,
                y: scene.scale.height/2,
                angle: challengeTarget.angle,
                scale: 1,
                duration: 500,
                onComplete: () => {
                    challengeCard.setData('location', 'board')
                    resolve()
                    challengeTween.remove()
                }
            })
            let targetTween = scene.tweens.add({
                targets: challengeTarget,
                x: scene.scale.width/2 - challengeTarget.displayWidth,
                y: scene.scale.height/2,
                duration: 200,
                onComplete: () => {
                    challengeTarget.setData('location', 'board')
                    targetTween.remove()
                }
            })
        })

        this.moveToDiscard = card => new Promise(resolve => {
            scene.children.bringToTop(card)
            card.input.dropZone = false
            // scene.discardArea.data.list.cards.push(card)
            let tween = scene.tweens.add({
                targets: card,
                x: scene.discardArea.x,
                y: scene.discardArea.y,
                angle: scene.discardArea.angle,
                scale: 0.5,
                duration: 500,
                onComplete: () => {
                    card.setData({
                        location: 'discard',
                        owner: null
                    })
                    scene.input.setDraggable(card, false)
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

        this.highlight = (card, color = 0xffffff) => new Promise(resolve => {
            let glow0 = card.preFX.addGlow(color, 0, 0, false)//, 0.01, 64)
            let tween0 = scene.tweens.add({
                targets: glow0,
                outerStrength: 2,
                duration: 200,
                onComplete: () => {
                    
                    let glow1 = card.preFX.addGlow(color, 0, 0, false)
                    let tween1 = scene.tweens.add({
                        targets: glow1,
                        outerStrength: 2,
                        duration: 400,
                        onComplete: () => {

                            let glow2 = card.preFX.addGlow(color, 0, 0, false)
                            let tween2 = scene.tweens.add({
                                targets: glow2,
                                outerStrength: 2,
                                duration: 600,
                                onComplete: () => {
                                    resolve()
                                    tween2.remove()
                                }
                            })
                            tween1.remove()
                        }
                    })
                    tween0.remove()
                }
            })
        })
        
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
                // scene.children.bringToTop(hand.cards[i])
                let tween = scene.tweens.add({
                    targets: hand.cards[i],
                    x: x + xSpread*(i+0.5),
                    y: y + ySpread*(i+0.5),
                    // angle: scene.UIHandler.areas[player].angle,
                    duration: 100,
                    onComplete: () => {
                        if (i >= hand.cards.length-1) resolve()
                        tween.remove()
                    }
                })
            }
        })
        
        this.stackHeroes = player => new Promise(resolve => {
            let xSpread, ySpread, x, y
            let heroArea = scene.UIHandler.areas[player].heroArea
            if (heroArea.getData('heroes').length) {
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
            } else resolve()
        })
       
        this.sacrificeHero = card => new Promise(resolve => {
            let heroArea = scene.UIHandler.areas[card.getData('owner')].heroArea

            if (card.getData('item') && card.getData('item').getData('name') === 'decoyDoll') {
                scene.children.bringToTop(card.getData('item'))
                this.highlight(card.getData('item'))
                .then(() => {
                    scene.discardArea.data.list.cards.push(card.getData('item'))
                    this.moveToDiscard(card.getData('item'))
                })
                .then(() => {
                    card.getData('item').preFX.clear()
                    card.setData('item', null)
                    resolve()
                })

            } else {
                heroArea.data.list.heroes.splice(heroArea.data.list.heroes.indexOf(card), 1)
                if (heroArea.getData('heroes').length) this.stackHeroes(card.getData('owner'))
                if (card.getData('item')) {
                    card.setData('class', card.getData('originalClass'))
                    scene.discardArea.data.list.cards.push(card.getData('item'))
                    this.moveToDiscard(card.getData('item'))
                    card.getData('item').setData('hero', null)
                    card.setData('item', null)
                }
                scene.discardArea.data.list.cards.push(card)
                this.moveToDiscard(card)
                .then(() => resolve())
            }
        })

        this.discard = card => new Promise(resolve => {
            let handArea = scene.UIHandler.areas[card.getData('owner')].handArea

            handArea.cards.splice(handArea.cards.indexOf(card), 1)
            if (handArea.cards.length) this.stackHand(card.getData('owner'))
            scene.discardArea.data.list.cards.push(card)
            this.moveToDiscard(card)
            .then(() => {
                if (card.texture.key === card.getData('backSprite')) this.flipCard(card)
                resolve()
            })
        })

        this.pullFromDiscard = (card, player) => new Promise(resolve => {
            scene.discardArea.data.list.cards.splice(scene.discardArea.data.list.cards.indexOf(card), 1)
            scene.UIHandler.areas[player].handArea.cards.push(card)
            scene.CardHandler.moveToHand(card, player)
            .then(() => {
                this.stackHand(player)
                resolve()
            })
        })

        this.modifyRoll = (dice, card, value) => new Promise(resolve => {
            let initialX = card.x
            let initialY = card.y
            let initialAngle = card.angle
            let initialScale = card.scale

            scene.children.bringToTop(card)

            let toDiceTween = scene.tweens.add({
                targets: card,
                x: dice.x,
                y: dice.y,
                angle: 0,
                scale: 1,
                duration: 500,
                onComplete: () => {
                    let shrinkTween = scene.tweens.add({
                        targets: card,
                        angle: 720,
                        scale: 0,
                        duration: 1000,
                        onComplete: () => {
                            card.x = initialX
                            card.y = initialY
                            card.setAngle(initialAngle).setScale(initialScale)
                            if (scene.GameHandler.gameState !== 'attacking') scene.children.sendToBack(card)

                            scene.UIHandler.DiceHandler.changeValue(dice, value)
                            .then(value => resolve(value))

                            shrinkTween.remove()
                        }
                    })
                    
                    toDiceTween.remove()
                }
            })

        })

    }
}