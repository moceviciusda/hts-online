import UIHandler from "./UIHandler"

export default class InteractivityHandler {
    constructor(scene) {
        this.UIHandler = new UIHandler(scene)
        
        this.isDragging = false

        this.gameTextInteractivity = () => {
            scene.endTurn.on('pointerover', () => scene.endTurn.setColor('#ff69b4'))
            scene.endTurn.on('pointerout', () => scene.endTurn.setColor('#00ffff'))
            scene.endTurn.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    scene.endTurn.disableInteractive()
                    scene.socket.emit('endTurn', scene.socket.id)
                }
            })

            scene.drawCard.on('pointerover', () => scene.drawCard.setColor('#ff69b4'))
            scene.drawCard.on('pointerout', () => scene.drawCard.setColor('#00ffff'))
            scene.drawCard.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    // scene.drawCard.disableInteractive()
                    scene.socket.emit('drawCard', scene.socket.id)
                }
            })

            scene.rollDice.on('pointerover', () => scene.rollDice.setColor('#ff69b4'))
            scene.rollDice.on('pointerout', () => scene.rollDice.setColor('#00ffff'))
            scene.rollDice.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    // let dice = scene.UIHandler.buildDice(500, 500)
                    
                    // scene.UIHandler.rollDice(dice, 4, 5)
                    // scene.UIHandler.showDice()
                    scene.socket.emit('diceRoll', scene.socket.id)

                    // scene.drawCard.disableInteractive()
                    // scene.socket.emit('drawCard', scene.socket.id)
                }
            })
        }

        this.challengeInteractivity = () => {
            scene.dontChallengeText.on('pointerover', () => scene.dontChallengeText.setColor('#ff69b4'))
            scene.dontChallengeText.on('pointerout', () => scene.dontChallengeText.setColor('#00ffff'))
            scene.dontChallengeText.on('pointerup', () => {
                scene.dontChallengeText.setScale(0).disableInteractive()
                scene.challengeText.setText('Waiting for Challengers')
                scene.socket.emit('dontChallenge', scene.socket.id)
            })
        }

        this.confirmLeaderInteractivity = () => {
            scene.confirmLeader.on('pointerover', () => scene.confirmLeader.setColor('#ff69b4'))
            scene.confirmLeader.on('pointerout', () => scene.confirmLeader.setColor('#00ffff'))
            scene.confirmLeader.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.players[scene.socket.id].partyLeader) {
                    scene.socket.emit('leaderPicked', scene.socket.id, scene.GameHandler.players[scene.socket.id].partyLeader)
                    scene.confirmLeader.disableInteractive()
                }
            })
        }


        scene.input.on('pointerup', (event, gameObjects) => {
            console.log(gameObjects[0])
            scene.UIHandler.destroyCardPreview()

            if (gameObjects.length) {
                if (scene.GameHandler.gameState === 'ready' && gameObjects[0].getData('location') === 'discard') {
                    scene.UIHandler.buildCardSelectionView(scene.discardArea.getData('cards'))
                }
                // Selecting Party Leader
                if (scene.GameHandler.gameState === 'partyLeaderSelection' && gameObjects[0].type === 'Image' && scene.GameHandler.currentTurn == scene.socket.id && gameObjects[0].getData('available')) { //&& scene.GameHandler.turn == scene.socket.id 
                    // Clear glow effect from previously selected leader
                    scene.children.list.forEach(gameObject => {
                        if (gameObject.getData('type') === 'partyLeader') {
                            gameObject.preFX.clear()
                        }
                    });

                    scene.GameHandler.players[scene.socket.id].partyLeader = gameObjects[0].getData('name')
                    scene.CardHandler.highlight(gameObjects[0])

                    scene.confirmLeader.setInteractive()
                }
            }
        })

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.mousePointer
            if (gameObjects[0].type === 'Image' && !['htsCardBack', 'htsMonsterBack'].includes(gameObjects[0].texture.key)) {

                if (scene.GameHandler.gameState === 'partyLeaderSelection' && gameObjects[0].getData('type') === 'partyLeader') {
                    scene.children.bringToTop(gameObjects[0])

                } else if (scene.GameHandler.gameState === 'ready') {

                    if (gameObjects[0].getData('location') === 'hand') scene.children.bringToTop(gameObjects[0])
                    this.previewTimer = scene.time.delayedCall(500, () => {
                        if (!this.isDragging && scene.GameHandler.gameState === 'ready') {
                            scene.fadeBackground.setVisible(true)
                            scene.children.bringToTop(scene.fadeBackground)
                            if (gameObjects[0].getData('type') === 'hero') {
                                scene.children.bringToTop(gameObjects[0])
                            }
                            scene.UIHandler.buildCardPreview(gameObjects[0])
                        }
                    })
                }
                
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                    //     scene.CardHandler.stickOut(gameObjects[0])
                    //     console.log('stickingOut')
                    // }

                if (scene.alertText) scene.children.bringToTop(scene.alertText)
            }
        })

        scene.input.on('pointerout', (event, gameObjects) => {
            if (scene.GameHandler.gameState === 'ready' && gameObjects[0].type === 'Image') {
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                //     console.log('stickingIn')
                //     scene.CardHandler.stickIn(gameObjects[0])
                // }
                scene.UIHandler.destroyCardPreview()
                if (this.previewTimer) this.previewTimer.remove()
                
                if (!this.isDragging) scene.fadeBackground.setVisible(false)
            }
        })

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })

        scene.input.on('dragstart', (pointer, gameObject) => {
            this.isDragging = true
            scene.UIHandler.destroyCardPreview()
            
            if (scene.GameHandler.gameState === 'ready' || 
            (scene.GameHandler.gameState === 'waitingForChallengers' && gameObject.getData('type') === 'challenge')) {
                scene.children.bringToTop(gameObject)
            }

            this.highlightArray = []
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {
                scene.fadeBackground.setVisible(true)
                scene.children.bringToTop(scene.fadeBackground)
                scene.children.bringToTop(gameObject)
                if (gameObject.getData('type') === 'hero' || gameObject.getData('type') === 'magic') {
                    this.highlightArray.push(this.UIHandler.ZoneHandler.renderOutline(scene.playerHeroArea, 0x00ffff))
                } else if (gameObject.getData('type') === 'item') {
                    scene.UIHandler.heroesOnBoard().forEach(hero => {
                        if (!hero.getData('item')) {
                            this.highlightArray.push(this.UIHandler.ZoneHandler.renderOutline(hero, 0x00ffff))
                            scene.children.bringToTop(hero)
                            // scene.CardHandler.highlight(hero)
                            // this.highlightArray.push(hero)
                        }
                    });
                }
            }
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            this.isDragging = false
            if (scene.GameHandler.gameState === 'ready') {
                scene.fadeBackground.setVisible(false)
                if (scene.GameHandler.currentTurn === scene.socket.id && this.highlightArray) {
                    this.highlightArray.forEach(highlight => highlight.destroy())
                    // this.highlightArray.forEach(card => card.preFX.clear())
                }
            }
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })

        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            let dropped = false
            let emit
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {              
                if (gameObject.getData('type') === 'hero' && dropZone === scene.playerHeroArea) {
                    dropped = true
                    emit = () => scene.socket.emit('cardPlayed', gameObject.getData('name'), null, scene.socket.id)
                    // scene.socket.emit('heroSummoned', gameObject.getData('name'), scene.socket.id)

                } else if (gameObject.getData('type') === 'item' && dropZone !== scene.playerHeroArea && !dropZone.getData('item')) {
                    dropped = true
                    emit = () => scene.socket.emit('cardPlayed', gameObject.getData('name'), dropZone.getData('name'), scene.socket.id)
                    // scene.socket.emit('itemEquiped', gameObject.getData('name'), dropZone.getData('name'), scene.socket.id)
                } else if (gameObject.getData('type') === 'magic') {
                    dropped = true
                    emit = () => scene.socket.emit('cardPlayed', gameObject.getData('name'), null, scene.socket.id)
                }
            } else if (scene.GameHandler.gameState === 'waitingForChallengers' && gameObject.getData('type') === 'challenge' && dropZone.getData('playing')) {
                dropped = true
                gameObject.preFX.clear()
                emit = () => scene.socket.emit('challenged', gameObject.getData('name'), scene.socket.id)
            }

            if (dropped) {
                gameObject.setData('playing', true)
                scene.input.setDraggable(gameObject, false)
                emit()
            } else {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
    }
}