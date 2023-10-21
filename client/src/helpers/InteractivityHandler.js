import UIHandler from "./UIHandler"

export default class InteractivityHandler {
    constructor(scene) {
        this.UIHandler = new UIHandler(scene)
        
        this.isDragging = false

        this.gameTextInteractivity = () => {
            scene.endTurn.on('pointerover', () => {
                scene.endTurn.setColor('#ff69b4')
            })
            scene.endTurn.on('pointerout', () => {
                scene.endTurn.setColor('#00ffff')
            })
            scene.endTurn.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    scene.endTurn.disableInteractive()
                    scene.socket.emit('endTurn', scene.socket.id)
                }
            })
        }

        this.confirmLeaderInteractivity = () => {
            scene.confirmLeader.on('pointerover', () => {
                scene.confirmLeader.setColor('#ff69b4')
            })
            scene.confirmLeader.on('pointerout', () => {
                scene.confirmLeader.setColor('#00ffff')
            })
            scene.confirmLeader.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.players[scene.socket.id].partyLeader) {
                    scene.socket.emit('leaderPicked', scene.socket.id, scene.GameHandler.players[scene.socket.id].partyLeader)
                    scene.confirmLeader.disableInteractive()
                }
            })
        }

        scene.input.on('pointerup', (event, gameObjects) => {
            console.log(scene.GameHandler.currentTurn, scene.socket.id)
            console.log(gameObjects[0])
            // Selecting Party Leader
            if (gameObjects.length) {
                if (scene.GameHandler.gameState === 'partyLeaderSelection' && gameObjects[0].type === 'Image' && scene.GameHandler.currentTurn == scene.socket.id && gameObjects[0].getData('available')) { //&& scene.GameHandler.turn == scene.socket.id 
                    // Clear glow effect from previously selected leader
                    scene.children.list.forEach(gameObject => {
                        if (gameObject.getData('type') === 'partyLeaderCard') {
                            gameObject.postFX.clear()
                        }
                    });

                    scene.GameHandler.players[scene.socket.id].partyLeader = gameObjects[0].getData('name')
                    console.log(scene.GameHandler.players[scene.socket.id].partyLeader)
                    scene.CardHandler.highlight(gameObjects[0])

                    scene.confirmLeader.setInteractive()
                }
            }
        })

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.mousePointer
            if (gameObjects[0].type === 'Image' && scene.GameHandler.gameState === 'partyLeaderSelection') {
                scene.children.bringToTop(gameObjects[0])
            }
            if (gameObjects[0].type === 'Image' && scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].getData('location') === 'hand') {
                scene.children.bringToTop(gameObjects[0])
            }
            
            if (scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].type === 'Image') {
                // console.log(gameObjects[0])
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                //     scene.CardHandler.stickOut(gameObjects[0])
                //     console.log('stickingOut')
                // }
                this.previewTimer = scene.time.delayedCall(500, () => {
                    if (!this.isDragging){
                        scene.fadeBackground.setVisible(true)
                        scene.children.bringToTop(scene.fadeBackground)
                        if (gameObjects[0].getData('type') === 'hero') {
                            scene.children.bringToTop(gameObjects[0])
                        }
                        scene.UIHandler.buildCardPreview(gameObjects[0])
                    }
                })
            }
        })

        scene.input.on('pointerout', (event, gameObjects) => {
            if (scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].type === 'Image') {
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                //     console.log('stickingIn')
                //     scene.CardHandler.stickIn(gameObjects[0])
                // }
                scene.UIHandler.destroyCardPreview()
                if (this.previewTimer) {
                    this.previewTimer.remove()
                }
                
                if (!this.isDragging) {
                    scene.fadeBackground.setVisible(false)
                }
            }
        })

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })


        scene.input.on('dragstart', (pointer, gameObject) => {
            this.isDragging = true
            scene.UIHandler.destroyCardPreview()
            
            // scene.fadeBackground.setVisible(false)
            scene.children.bringToTop(gameObject)
            this.highlightArray = []
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {
                scene.fadeBackground.setVisible(true)
                if (gameObject.getData('type') === 'hero') {
                    this.highlightArray.push(this.UIHandler.zoneHandler.renderOutline(scene.playerHeroArea, 0x00ffff))
                } else if (gameObject.getData('type') === 'item') {
                    scene.UIHandler.heroesOnBoard().forEach(hero => {
                        if (!hero.getData('item')) {
                            this.highlightArray.push(this.UIHandler.zoneHandler.renderOutline(hero, 0x00ffff))
                            scene.children.bringToTop(hero)
                            // scene.CardHandler.highlight(hero)
                        }
                    });
                }
            }
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            this.isDragging = false
            scene.fadeBackground.setVisible(false)
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {
                this.highlightArray.forEach(highlight => {
                    highlight.destroy()
                })
            }
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })

        
        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            let dropped = false
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {              
                if (gameObject.getData('type') === 'hero' && dropZone === scene.playerHeroArea) {
                    dropped = true
                    scene.CardHandler.moveToHeroArea(gameObject)
                    .then(() => scene.CardHandler.stackHand(scene.socket.id))
                    dropZone.data.list.heroes.push(gameObject)
                    scene.socket.emit('heroPlayed', gameObject.getData('name'), scene.socket.id)

                } else if (gameObject.getData('type') === 'item' && dropZone !== scene.playerHeroArea && !dropZone.getData('item')) {
                    dropped = true
                    dropZone.setData('item', gameObject)
                    scene.CardHandler.equipItem(gameObject, dropZone)
                    .then(() => scene.CardHandler.stackHand(scene.socket.id))
                    scene.socket.emit('itemEquiped', gameObject.getData('name'), dropZone.getData('name'), scene.socket.id)
                }
            } 

            if (dropped) {
                scene.UIHandler.areas[scene.socket.id].handArea.cards.splice(scene.UIHandler.areas[scene.socket.id].handArea.cards.indexOf(gameObject), 1)
                scene.input.setDraggable(gameObject, false)
            } else {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
    }
}