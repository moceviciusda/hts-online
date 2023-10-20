import ZoneHandler from "./ZoneHandler"

export default class UIHandler {
    constructor(scene) {
        this.zoneHandler = new ZoneHandler(scene)

        this.areas = {}
        this.partyLeadersDealt = false

        this.buildCommonAreas = () => {
            scene.monsterArea = scene.add.rectangle(960 - 110, 540, 688, 300).setStrokeStyle(4, 0xff69b4)
            scene.deckArea = scene.add.rectangle(1304, 540+79, 220, 158).setStrokeStyle(4, 0xff69b4)
            scene.discardArea = scene.add.rectangle(1304, 540-79, 220, 158).setStrokeStyle(4, 0xff69b4)
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = {x: 150, y: 1080, cards: []}
            scene.playerHeroArea = this.zoneHandler.renderZone(960, 800, 790, 220).setData('heroes', [])
            this.zoneHandler.renderOutline(scene.playerHeroArea, 0xff69b4)
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
            scene.topOpponentHandArea = {x: 1770, y: 0, cards: []}
            scene.topOpponentHeroArea = scene.add.rectangle(960, 280, 790, 220).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.topOpponentLeaderArea = scene.add.rectangle(1218, 80, 172, 300).setStrokeStyle(4, 0xff69b4)
            scene.topOpponentSlayArea = scene.add.rectangle(874, 80, 516, 300).setStrokeStyle(4, 0xff69b4)

            scene.leftOpponentHandArea = {x: 0, y: 150, cards: []}
            scene.leftOpponentHeroArea = scene.add.rectangle(280, 540, 220, 790).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.leftOpponentLeaderArea = scene.add.rectangle(80, 282, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.leftOpponentSlayArea = scene.add.rectangle(80, 540 + 86, 300, 516).setStrokeStyle(4, 0xff69b4)

            scene.rightOpponentHandArea = {x: 1920, y: 930, cards: []}
            scene.rightOpponentHeroArea = scene.add.rectangle(1640, 540, 220, 790).setStrokeStyle(4, 0xff69b4).setData('heroes', [])
            scene.rightOpponentLeaderArea = scene.add.rectangle(1840, 798, 300, 172).setStrokeStyle(4, 0xff69b4)
            scene.rightOpponentSlayArea = scene.add.rectangle(1840, 540 - 86, 300, 516).setStrokeStyle(4, 0xff69b4)

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
                    angle: 270
                }
            ]
        }

        this.buildGameText = () => {
            // scene.ready = scene.add.text(1560, 540, 'Ready!')
            // console.log('building text')
            // scene.ready.setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5).setInteractive() //.setInteractive()
        }
        
        this.dealPartyLeaders = (partyLeaders) => {
            if (!scene.GameHandler.partyLeaders.length) {
                partyLeaders.forEach((partyLeader, i) => {
                    let card = scene.DeckHandler.dealCard(410 + (i * 220), 540, partyLeader, null)
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
            scene.leaderSelectionText.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            scene.confirmLeader = scene.add.text(960, 900, 'Confirm Leader')
            scene.confirmLeader.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)

            if (scene.GameHandler.currentTurn === scene.socket.id) {
                scene.leaderSelectionText.setText('Choose your party leader')
                scene.InteractivityHandler.confirmLeaderInteractivity()
            }
        }

        this.buildUI = () => {
            this.buildCommonAreas()
            this.buildPlayerAreas()
            this.buildOpponentAreas()
            scene.fadeBackground = scene.add.graphics()
            scene.fadeBackground.fillStyle(0x000000, 0.9).fillRect(0, 0, 1920, 1080)
            this.buildGameText()
        }
    }
}