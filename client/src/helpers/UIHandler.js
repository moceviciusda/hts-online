import ZoneHandler from "./ZoneHandler"

export default class UIHandler {
    constructor(scene) {

        this.zoneHandler = new ZoneHandler(scene)

        this.areas = {}
        this.partyLeadersDealt = false

        this.buildCommonAreas = () => {
            scene.monsterZone = this.zoneHandler.renderZone(960 - 110, 540, 688, 300)
            this.zoneHandler.renderOutline(scene.monsterZone, 0xff69b4)

            scene.deckArea = scene.add.rectangle(1304, 540+79, 220, 158)
            scene.deckArea.setStrokeStyle(4, 0xff69b4)

            scene.discardArea = scene.add.rectangle(1304, 540-79, 220, 158)
            scene.discardArea.setStrokeStyle(4, 0xff69b4)
        }

        this.buildPlayerAreas = () => {
            scene.playerHandArea = {x: 150, y: 1080}

            scene.playerHeroArea = this.zoneHandler.renderZone(960, 800, 790, 220) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.playerHeroArea, 0xff69b4)

            scene.playerLeaderArea = this.zoneHandler.renderZone(702, 1000, 172, 300) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.playerLeaderArea, 0xff69b4)

            // scene.playerSlayZone1 = this.zoneHandler.renderZone(874, 1000, 172, 300) // 86 mid of card 172 width
            // this.zoneHandler.renderOutline(scene.playerSlayZone1, 0xff69b4)
            scene.playerSlayArea = this.zoneHandler.renderZone(1046, 1000, 516, 300) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.playerSlayArea, 0xff69b4)
            // scene.playerSlayZone3 = this.zoneHandler.renderZone(1218, 1000, 172, 300) // 86 mid of card 172 width
            // this.zoneHandler.renderOutline(scene.playerSlayZone3, 0xff69b4)
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
            scene.topOpponentHandArea = {x: 1770, y: 0}
            scene.topOpponentHeroArea = this.zoneHandler.renderZone(960, 280, 790, 220) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.topOpponentHeroArea, 0xff69b4)
            scene.topOpponentLeaderArea = this.zoneHandler.renderZone(1218, 80, 172, 300) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.topOpponentLeaderArea, 0xff69b4)
            scene.topOpponentSlayArea = this.zoneHandler.renderZone(874, 80, 516, 300) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.topOpponentSlayArea, 0xff69b4)

            scene.leftOpponentHandArea = {x: 0, y: 150}
            scene.leftOpponentHeroArea = this.zoneHandler.renderZone(280, 540, 220, 790) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.leftOpponentHeroArea, 0xff69b4)
            scene.leftOpponentLeaderArea = this.zoneHandler.renderZone(80, 282, 300, 172) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.leftOpponentLeaderArea, 0xff69b4)
            scene.leftOpponentSlayArea = this.zoneHandler.renderZone(80, 540 + 86, 300, 516) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.leftOpponentSlayArea, 0xff69b4)

            scene.rightOpponentHandArea = {x: 1920, y: 930}
            scene.rightOpponentHeroArea = this.zoneHandler.renderZone(1640, 540, 220, 790) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.rightOpponentHeroArea, 0xff69b4)
            scene.rightOpponentLeaderArea = this.zoneHandler.renderZone(1840, 798, 300, 172) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.rightOpponentLeaderArea, 0xff69b4)
            scene.rightOpponentSlayArea = this.zoneHandler.renderZone(1840, 540 - 86, 300, 516) // 86 mid of card 172 width
            this.zoneHandler.renderOutline(scene.rightOpponentSlayArea, 0xff69b4)

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
        
        scene.fadeBackground = scene.add.graphics()
        scene.fadeBackground.fillStyle(0x000000, 0.9).fillRect(0, 0, 1920, 1080)
        
        this.dealPartyLeaders = (partyLeaders) => {
            // console.log('pls work: ', Object.values(scene.GameHandler.players))
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
            
            // if (scene.UIHandler.partyLeadersDealt) {
            //     scene.children.list.forEach(gameObject => {
            //         if (gameObject.getData('type') === 'partyLeaderCard' && !gameObject.getData('owner')) {
            //             gameObject.destroy()
            //         }
            //     });
            // }
        }

        this.buildLeaderSelectText = () => {
            if (scene.leaderSelectionText) {
                scene.leaderSelectionText.destroy()
                scene.confirmLeader.destroy()
            }
            // scene.leaderSelectionText.destroy()
            // scene.confirmLeader.destroy()
            scene.leaderSelectionText = scene.add.text(960, 150, 'Another Player is choosing party leader')
            scene.leaderSelectionText.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            scene.confirmLeader = scene.add.text(960, 900, 'Confirm Leader')
            scene.confirmLeader.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)

            if (scene.GameHandler.currentTurn === scene.socket.id) {
                scene.leaderSelectionText.setText('Choose your party leader')
                scene.InteractivityHandler.confirmLeaderInteractivity()
            }
            // scene.leaderSelectionText.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)
            // scene.confirmLeader = scene.add.text(960, 900, 'Confirm Leader')
            // scene.confirmLeader.setFontSize(32).setFontFamily('Trebuchet MS').setColor('#00ffff').setOrigin(0.5, 0.5)//.setInteractive()
        }

        // this.selectLeader = () => {
        //     scene.leaderSelectionText.setText('Choose your party leader')
        //     scene.confirmLeader.setInteractive()
        // }

        this.buildUI = () => {
            // this.buildBoard()
            
            this.buildCommonAreas()
            this.buildPlayerAreas()
            this.buildOpponentAreas()
            this.buildGameText()
            // this.buildLeaderSelectText()
            console.log('YOOOOOOOOOO', scene.UIHandler.areas)
        }
    }
}