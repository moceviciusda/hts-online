import DiceHandler from "./DiceHandler"
import ZoneHandler from "./ZoneHandler"

export default class UIHandler {
    constructor(scene) {
        this.ZoneHandler = new ZoneHandler(scene)
        this.DiceHandler = new DiceHandler(scene)

        this.areas = {}

        this.buildCommonAreas = () => {
            scene.monsterArea = scene.add.rectangle(scene.scale.width/2 - 110, scene.scale.height/2, 688, 300).setStrokeStyle(4, 0xff69b4).setData('cards', [])
            scene.deckArea = scene.add.rectangle(1304, scene.scale.height/2+79, 158, 220).setAngle(-90).setStrokeStyle(4, 0xff69b4)
            scene.discardArea = scene.add.rectangle(1304, scene.scale.height/2-79, 158, 220).setAngle(-90).setStrokeStyle(4, 0xff69b4).setData('cards', [])
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = {x: scene.scale.width/2, y: scene.scale.height, cards: []}
            // scene.playerHandArea = scene.add.container(scene.scale.width/2, scene.scale.height, 0, 0).setData('cards', [])
            scene.playerHeroArea = this.ZoneHandler.renderZone(scene.scale.width/2, 800, 1078, 216).setData('heroes', [])
            this.ZoneHandler.renderOutline(scene.playerHeroArea, 0xff69b4)
            scene.playerLeaderArea = scene.add.rectangle(702, 1000, 172, 300).setStrokeStyle(4, 0xff69b4)
            scene.playerSlayArea = scene.add.rectangle(1046, 1000, 516, 300).setStrokeStyle(4, 0xff69b4).setData('monsters', [])
        }
        
        this.assignPlayerAreas = () => {
            this.areas[scene.socket.id] = {
                handArea: scene.playerHandArea,
                heroArea: scene.playerHeroArea,
                leaderArea: scene.playerLeaderArea,
                slayArea: scene.playerSlayArea,
                angle: 0
            }
        }

        this.buildOpponentAreas = () => {
            scene.topOpponentHandArea = {x: scene.scale.width/2, y: 0, cards: []}
            scene.topOpponentHeroArea = scene.add.rectangle(scene.scale.width/2, 280, 1078, 216).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.topOpponentLeaderArea = scene.add.rectangle(1218, 80, 172, 300).setStrokeStyle(4, 0xff69b4)
            scene.topOpponentSlayArea = scene.add.rectangle(874, 80, 516, 300).setStrokeStyle(4, 0xff69b4).setData('monsters', [])

            scene.leftOpponentHandArea = {x: 0, y: scene.scale.height/2, cards: []}
            scene.leftOpponentHeroArea = scene.add.rectangle(280, scene.scale.height/2, 216, 1078).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.leftOpponentLeaderArea = scene.add.rectangle(80, 282, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.leftOpponentSlayArea = scene.add.rectangle(80, scene.scale.height/2 + 86, 300, 516).setStrokeStyle(4, 0xff69b4).setData('monsters', [])

            scene.rightOpponentHandArea = {x: scene.scale.width, y: scene.scale.height/2, cards: []}
            scene.rightOpponentHeroArea = scene.add.rectangle(1640, scene.scale.height/2, 216, 1078).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.rightOpponentLeaderArea = scene.add.rectangle(1840, 798, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.rightOpponentSlayArea = scene.add.rectangle(1840, scene.scale.height/2 - 86, 300, 516).setStrokeStyle(4, 0xff69b4).setData('monsters', [])

            this.availableAreas = [
                {
                    handArea: scene.topOpponentHandArea,
                    heroArea: scene.topOpponentHeroArea,
                    leaderArea: scene.topOpponentLeaderArea,
                    slayArea: scene.topOpponentSlayArea,
                    angle: 180
                },
                {
                    handArea: scene.leftOpponentHandArea,
                    heroArea: scene.leftOpponentHeroArea,
                    leaderArea: scene.leftOpponentLeaderArea,
                    slayArea: scene.leftOpponentSlayArea,
                    angle: 90
                },
                {
                    handArea: scene.rightOpponentHandArea,
                    heroArea: scene.rightOpponentHeroArea,
                    leaderArea: scene.rightOpponentLeaderArea,
                    slayArea: scene.rightOpponentSlayArea,
                    angle: -90
                }
            ]
        }

        this.heroesOnBoard = () => {
            return scene.playerHeroArea.getData('heroes').concat(scene.topOpponentHeroArea.getData('heroes'), scene.leftOpponentHeroArea.getData('heroes'), scene.rightOpponentHeroArea.getData('heroes'))
        }

        this.buildGameText = () => {
            scene.endTurn = scene.add.text(1420, 950, 'End Turn')
            scene.endTurn.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            
            scene.drawCard = scene.add.text(1420, 1000, 'Draw')
            scene.drawCard.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setInteractive()

            scene.rollDice = scene.add.text(1420, 1050, 'Roll Dice')
            scene.rollDice.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setInteractive()

            scene.InteractivityHandler.gameTextInteractivity()
        }
        
        this.dealPartyLeaders = (partyLeaders) => {
            if (!scene.GameHandler.partyLeaders.length) {
                partyLeaders.forEach((partyLeader, i) => {
                    let card = scene.DeckHandler.dealCard(scene.scale.width/2 - partyLeaders.length*220/2 + 110 + (i * 220), scene.scale.height/2, partyLeader, null)
                    scene.GameHandler.partyLeaders.push(card)
                })
            } else {
                scene.GameHandler.partyLeaders.forEach(partyLeader => {
                    for (let player in scene.GameHandler.players) {
                        if (scene.GameHandler.players[player].partyLeader === partyLeader.getData('name')) {
                            partyLeader.setTint(0x333333).setData('available', false)
                        }
                    }
                })
            }
        }

        this.buildLeaderSelectText = () => {
            if (scene.leaderSelectionText) scene.leaderSelectionText.destroy()
            if (scene.confirmLeader) scene.confirmLeader.destroy()
            
            scene.leaderSelectionText = scene.add.text(scene.scale.width/2, 150, `${scene.GameHandler.currentTurn} is choosing party leader`)
            scene.leaderSelectionText.setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            
            if (scene.GameHandler.currentTurn === scene.socket.id) {
                scene.leaderSelectionText.setText('Choose your party leader')

                scene.confirmLeader = scene.add.text(scene.scale.width/2, 900, 'Confirm')
                scene.confirmLeader.setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
                scene.InteractivityHandler.confirmLeaderInteractivity()
            }
        }

        this.alert = message => {
            scene.alertText = scene.add.text(scene.scale.width/2, scene.scale.height/2, message)
            scene.alertText.setDepth(10).setFontSize(64).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setAlpha(0)
            
            let appear = scene.tweens.add({
                targets: scene.alertText,
                alpha: 1,
                duration: 800,
                onComplete: () => {
                    let disappear = scene.tweens.add({
                        targets: scene.alertText,
                        alpha: 0,
                        delay: 2500,
                        duration: 600,
                        onComplete: () => {
                            scene.alertText.destroy()
                            disappear.remove()
                        }
                    })
                    appear.remove()
                }
            })
        }

        this.buildCardPreview = card => {
            if (card.getData('item')) {
                scene.itemPreview = scene.add.image(scene.scale.width/2, scene.scale.height/2+120, card.getData('item').getData('sprite')).setScale(1.5)
            }
            scene.cardPreview = scene.add.image(scene.scale.width/2, scene.scale.height/2, card.getData('sprite')).setScale(1.5)
        }

        this.destroyCardPreview = () => {
            if (scene.cardPreview) scene.cardPreview.destroy()
            if (scene.itemPreview) scene.itemPreview.destroy()
        }

        this.buildChallengeView = (playedCard, player) => {
            scene.fadeBackground.setVisible(true)
            scene.children.bringToTop(scene.fadeBackground)
            scene.children.bringToTop(playedCard)
            playedCard.input.dropZone = true
            if (player !== scene.socket.id) scene.CardHandler.flipCard(playedCard)
            let tween = scene.tweens.add({
                targets: playedCard,
                x: scene.scale.width/2,
                y: scene.scale.height/2,
                angle: 0,
                scale: 1,
                duration: 500,
                onComplete: () => {
                    tween.remove()
                }
            })

            scene.challengeText = scene.add.text(scene.scale.width/2, 220, '')
            .setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            scene.dontChallengeText = scene.add.text(scene.scale.width/2, 860, '')
            .setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setScale(0)
            if (player !== scene.socket.id && scene.UIHandler.areas[scene.socket.id].handArea.cards.find((card) => card.getData('type') === 'challenge')) {
                scene.challengeText.setText(`${player} is Playing ${playedCard.getData('name')}`)
                scene.dontChallengeText.setText("Don't Challenge").setScale(1).setInteractive()
                scene.InteractivityHandler.challengeInteractivity()

                scene.UIHandler.areas[scene.socket.id].handArea.cards.forEach(card => {
                    if (card.getData('type') === 'challenge') {
                        scene.children.bringToTop(card)
                        scene.CardHandler.highlight(card)
                    }
                })
            } else {
                scene.challengeText.setText('Waiting for Challengers')
                setTimeout(() => {scene.socket.emit('dontChallenge')}, Phaser.Math.Between(2000, 5000))
            }
        }

        this.challenged = (player, challenger) => {
            scene.challengeText.setText(`${player} Challenged by ${challenger}`)
            scene.dontChallengeText.setScale(0)
        }

        this.destroyChallengeView = () => {
            scene.UIHandler.areas[scene.socket.id].handArea.cards.forEach(card => {
                if (card.getData('type') === 'challenge') {
                    card.preFX.clear()
                }
            })
            scene.fadeBackground.setVisible(false)
            scene.challengeText.destroy()
            scene.dontChallengeText.destroy()
            this.destroyDice()
        }

        this.buildDice = (x, y) => {
            let valueText = scene.add.text(x, y, '0', { fontFamily: 'Arial Black', fontSize: 98, color: '#c51b7d' })
            valueText.setStroke('#de77ae', 16).setScale(0).setOrigin(0.5).setData('diceValueText', true);
            return {
                x: x,
                y: y,
                valueText: valueText,
                dice1: this.DiceHandler.createDice(x - 65, y),
                dice2: this.DiceHandler.createDice(x + 65, y)
                }
        }
        
        this.destroyDice = () => {
            let destroyList = []
            scene.children.list.forEach(gameObject => {
                if (gameObject.type === 'Mesh' || gameObject.getData('diceValueText')) {
                    destroyList.push(gameObject)
                }
            })
            destroyList.forEach(dice => dice.destroy())
        }


        this.rollDice = (dice, result1, result2) => new Promise(resolve => {
            dice.dice1(result1)
            .then(() => dice.dice2(result2))
            .then(() => {
                dice.valueText.text = result1+result2;
                scene.children.bringToTop(dice.valueText)
                let tween = scene.add.tween({
                    targets: dice.valueText,
                    scale: 1,
                    duration: 1000,
                    ease: Phaser.Math.Easing.Bounce.Out,
                    onComplete: () => {
                        resolve(result1 + result2)
                        // scene.add.tween({
                        //     targets: textDiceValue,
                        //     scale: 0,
                        //     delay: 1000,
                        //     duration: 1000,
                        //     ease: Phaser.Math.Easing.Bounce.Out,
                        //     onComplete: () => resolve()
                        // });
                        tween.destroy()
                    }
                });
            })
        })

        this.buildAttackView = (monsterCard, player) => new Promise(resolve => {
            let partyLeaderCard = this.areas[player].leaderArea.getData('card')

            scene.fadeBackground.setVisible(true)
            scene.children.bringToTop(scene.fadeBackground)
            scene.children.bringToTop(monsterCard)
            scene.children.bringToTop(partyLeaderCard)

            scene.attackingText = scene.add.text(scene.scale.width/2, 180, `${player} is Attacking ${monsterCard.getData('name')}`)
            .setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)

            let monsterTween = scene.tweens.add({
                targets: monsterCard,
                x: scene.scale.width/2 + monsterCard.displayWidth*2,
                y: scene.scale.height/2,
                angle: 0,
                scale: 1,
                duration: 500,
                onComplete: () => {
                    monsterTween.remove()
                }
            })

            let playerTween = scene.tweens.add({
                targets: partyLeaderCard,
                x: scene.scale.width/2 - partyLeaderCard.displayWidth*2,
                y: scene.scale.height/2,
                angle: 0,
                scale: 1,
                duration: 500,
                onComplete: () => {
                    resolve()
                    playerTween.remove()
                }
            })
        })

        this.destroyAttackView = () => {
            if (scene.attackingText) scene.attackingText.destroy()
            scene.fadeBackground.setVisible(false)
        }

        this.buildSacrificeHeroView = count => {
            let heroes = scene.UIHandler.areas[scene.socket.id].heroArea.getData('heroes')
            let sacrificeCounter = 0
            if (count > heroes.length) sacrificeCounter += count - heroes.length
            if (heroes.length > 0) {
                scene.socket.emit('setGameState', 'sacrificing')

                scene.fadeBackground.setVisible(true)
                scene.children.bringToTop(scene.fadeBackground)

                scene.sacrificeText = scene.add.text(scene.scale.width/2, 220, `Sacrifice ${count} Hero(es)`)
                .setFontSize(72).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
         
                heroes.forEach(hero => {
                    if (hero.getData('item')) scene.children.bringToTop(hero.getData('item'))
                    scene.children.bringToTop(hero)

                    hero.on('pointerover', () => this.buildCardPreview(hero))
                    hero.on('pointerout', () => this.destroyCardPreview())
                    hero.once('pointerup', () => {
                        scene.socket.emit('heroSacrificed', hero.getData('name'), scene.socket.id)
                        sacrificeCounter++
                        if (sacrificeCounter >= count || heroes.length <= 0) {
                            heroes.forEach(h => h.removeAllListeners())
                            this.destroySacrificeHeroView()
                            scene.socket.emit('setGameState', 'ready')
                        }
                    })
                })
            } else {
                scene.socket.emit('setGameState', 'ready')
            }
        }

        this.destroySacrificeHeroView = () => {
            if (scene.sacrificeText) scene.sacrificeText.destroy()
            scene.fadeBackground.setVisible(false)
        }

        this.buildDiscardView = count => {
            let hand = scene.UIHandler.areas[scene.socket.id].handArea.cards
            let discardCounter = 0
            if (count > hand.length) discardCounter += count - hand.length
            if (hand.length > 0) {
                scene.socket.emit('setGameState', 'discarding')
                
                scene.fadeBackground.setVisible(true)
                scene.children.bringToTop(scene.fadeBackground)

                scene.discardText = scene.add.text(scene.scale.width/2, 220, `Discard ${count} Card(s)`)
                .setFontSize(72).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)

                hand.forEach(card => {
                    scene.children.bringToTop(card)

                    card.on('pointerover', () => this.buildCardPreview(card))
                    card.on('pointerout', () => this.destroyCardPreview())
                    card.once('pointerup', () => {
                        scene.socket.emit('discard', card.getData('name'), scene.socket.id)
                        discardCounter++
                        if (discardCounter >= count) {
                            hand.forEach(h => h.removeAllListeners())
                            this.destroyDiscardView()
                            scene.socket.emit('setGameState', 'ready')
                        }
                    })
                })
            } else {
                scene.socket.emit('setGameState', 'ready')
            }
        }

        this.destroyDiscardView = () => {
            if (scene.discardText) scene.discardText.destroy()
            scene.fadeBackground.setVisible(false)
        }

        this.buildCardSelectionView = (
                cards,
                count = 0,
                text = '',
                callback = null,
            ) => {
            let selectedCounter = 0
            let cardsPerRow = 10
            let rows = Math.ceil(cards.length / cardsPerRow)
            
            if (text.length) scene.UIHandler.alert(text)
            scene.GameHandler.setGameState('viewingCards')
            // scene.cardSelectionText = scene.add.text(scene.scale.width/2, 220, text)
            // .setFontSize(72).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            scene.fadeBackground.setVisible(true)
            scene.children.bringToTop(scene.fadeBackground)

            if (count === 0 || !cards.length) {
                // scene.GameHandler.setGameState('viewingCards')
                scene.input.once('pointerup', () => {
                    cards.forEach(card => card.removeAllListeners())
                    this.destroyCardPreview()
                    cards.forEach(card => scene.CardHandler.moveToDiscard(card))
                    // scene.cardSelectionText.destroy()
                    scene.fadeBackground.setVisible(false)
                    scene.GameHandler.setGameState('ready')
                })
            }

            for (let row = 0; row <= rows; row++) {
                for (let column = 0; column < cardsPerRow; column++) {
                    if (cards[row*cardsPerRow + column]) {
                        let card = cards[row*cardsPerRow + column]

                        console.log(card)
                        let tween = scene.tweens.add({
                            targets: card,
                            x: scene.scale.width/2-card.displayWidth*5 + (card.displayWidth+16) * column,
                            y: scene.scale.height/2-(rows-1)*(card.displayHeight/2+8) + (card.displayHeight+16) * row,
                            angle: 0,
                            scale: 0.5,
                            duration: 500,
                            onComplete: () => {
                                tween.remove()
                            }
                        })

                        scene.children.bringToTop(card)

                        card.on('pointerover', () => this.buildCardPreview(card))
                        card.on('pointerout', () => this.destroyCardPreview())
                        if (count > 0) {
                            card.once('pointerup', () => {
                                // scene.socket.emit('discard', card.getData('name'), scene.socket.id)
                                // this.destroyCardPreview()
                                this.destroyCardPreview()
                                
                                selectedCounter++
                                callback(card)
                                .then(() => {
                                    if (selectedCounter >= count) {
                                        cards.forEach(h => h.removeAllListeners())
                                        scene.fadeBackground.setVisible(false)
                                        scene.GameHandler.setGameState('ready')
                                    }
                                })
                            })
                        }
                    }
                }
            }
            
        }

        this.buildUI = () => {
            this.buildCommonAreas()
            this.buildPlayerAreas()
            this.buildOpponentAreas()
            scene.fadeBackground = scene.add.graphics()
            scene.fadeBackground.fillStyle(0x000000, 0.9).fillRect(0, 0, 1920, 1080)
            // this.buildDice()
            // this.hideDice()
            // this.buildGameText()
        }
    }
}