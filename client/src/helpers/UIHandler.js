import DiceHandler from "./DiceHandler"
import ZoneHandler from "./ZoneHandler"

export default class UIHandler {
    constructor(scene) {
        this.ZoneHandler = new ZoneHandler(scene)
        this.DiceHandler = new DiceHandler(scene)

        this.areas = {}
        this.partyLeadersDealt = false

        this.buildCommonAreas = () => {
            scene.monsterArea = scene.add.rectangle(scene.scale.width/2 - 110, scene.scale.height/2, 688, 300).setStrokeStyle(4, 0xff69b4)
            scene.deckArea = scene.add.rectangle(1304, scene.scale.height/2+79, 220, 158).setStrokeStyle(4, 0xff69b4)
            scene.discardArea = scene.add.rectangle(1304, scene.scale.height/2-79, 220, 158).setStrokeStyle(4, 0xff69b4)
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = {x: scene.scale.width/2, y: scene.scale.height, cards: []}
            scene.playerHeroArea = this.ZoneHandler.renderZone(scene.scale.width/2, 800, 1078, 216).setData('heroes', [])
            this.ZoneHandler.renderOutline(scene.playerHeroArea, 0xff69b4)
            scene.playerLeaderArea = scene.add.rectangle(702, 1000, 172, 300).setStrokeStyle(4, 0xff69b4)
            scene.playerSlayArea = scene.add.rectangle(1046, 1000, 516, 300).setStrokeStyle(4, 0xff69b4)
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
            scene.topOpponentSlayArea = scene.add.rectangle(874, 80, 516, 300).setStrokeStyle(4, 0xff69b4)

            scene.leftOpponentHandArea = {x: 0, y: scene.scale.height/2, cards: []}
            scene.leftOpponentHeroArea = scene.add.rectangle(280, scene.scale.height/2, 216, 1078).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.leftOpponentLeaderArea = scene.add.rectangle(80, 282, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.leftOpponentSlayArea = scene.add.rectangle(80, scene.scale.height/2 + 86, 300, 516).setStrokeStyle(4, 0xff69b4)

            scene.rightOpponentHandArea = {x: scene.scale.width, y: scene.scale.height/2, cards: []}
            scene.rightOpponentHeroArea = scene.add.rectangle(1640, scene.scale.height/2, 216, 1078).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.rightOpponentLeaderArea = scene.add.rectangle(1840, 798, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.rightOpponentSlayArea = scene.add.rectangle(1840, scene.scale.height/2 - 86, 300, 516).setStrokeStyle(4, 0xff69b4)

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
            if (scene.leaderSelectionText) {
                scene.leaderSelectionText.destroy()
                scene.confirmLeader.destroy()
            }
            scene.leaderSelectionText = scene.add.text(960, 150, 'Another Player is choosing party leader')
            scene.leaderSelectionText.setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            scene.confirmLeader = scene.add.text(960, 900, 'Confirm Leader')
            scene.confirmLeader.setFontSize(48).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)

            if (scene.GameHandler.currentTurn === scene.socket.id) {
                scene.leaderSelectionText.setText('Choose your party leader')
                scene.InteractivityHandler.confirmLeaderInteractivity()
            }
        }

        this.alert = message => {
            scene.alertText = scene.add.text(960, 540, message)
            scene.alertText.setFontSize(64).setFontFamily('Trebuchet MS').setColor('#00ffff').setDepth(10).setOrigin(0.5, 0.5).setAlpha(0)
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
                scene.itemPreview = scene.add.image(scene.scale.width/2, scene.scale.height/2+80, card.getData('item').getData('sprite'))
            }
            scene.cardPreview = scene.add.image(scene.scale.width/2, scene.scale.height/2, card.getData('sprite'))
        }

        this.destroyCardPreview = () => {
            if (scene.cardPreview) {
                scene.cardPreview.destroy()
            }
            if (scene.itemPreview) {
                scene.itemPreview.destroy()
            }
        }

        this.buildDice = () => {
            scene.dice1 = this.DiceHandler.createDice(scene.scale.width/2 - 100, scene.scale.height/2 + 250)
            scene.dice2 = this.DiceHandler.createDice(scene.scale.width/2 + 100, scene.scale.height/2 + 250)
            // this.hideDice()
        }
        
        this.hideDice = () => {
            scene.dice1.setVisible(false)
            scene.dice2.setVisible(false)
        }

        this.showDice = () => {
            scene.dice1.setVisible(true)
            scene.dice2.setVisible(true)
            scene.children.bringToTop(scene.dice1)
            scene.children.bringToTop(scene.dice2)
        }

        this.rollDice = (result1, result2) => new Promise(resolve => {
            scene.dice1(result1)
            .then(() => scene.dice2(result2))
            .then(() => resolve(result1 + result2))
        })

        this.buildUI = () => {
            this.buildCommonAreas()
            this.buildPlayerAreas()
            this.buildOpponentAreas()
            scene.fadeBackground = scene.add.graphics()
            scene.fadeBackground.fillStyle(0x000000, 0.9).fillRect(0, 0, 1920, 1080)
            this.buildDice()
            // this.hideDice()
            // this.buildGameText()
        }
    }
}