import UIHandler from "./UIHandler"
// import CardHandler from "./CardHandler"

export default class InteractivityHandler {
    constructor(scene) {
        this.UIHandler = new UIHandler(scene)
        
        this.gameTextInteractivity = () => {
            scene.endTurn.on('pointerover', () => {
                scene.endTurn.setColor('#ff69b4')
            })
            scene.endTurn.on('pointerout', () => {
                scene.endTurn.setColor('#00ffff')
            })
            scene.endTurn.on('pointerup', () => {
                if (scene.GameHandler.currentTurn === scene.socket.id) {
                    scene.socket.emit('endTurn', scene.socket.id)
                    scene.endTurn.disableInteractive()
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
        
        // scene.cardPreview = null
        // scene.fadeBackground = null
        
        // scene.checkHand.on('pointerdown', () => {
        //     console.log(scene.GameHandler.player.hand)
        // })

        // scene.drawOne.on('pointerdown', () => {
        //     scene.DeckHandler.drawCards(scene.GameHandler.player, scene.GameHandler.player, 1)
        //     this.CardHandler.stackHand(scene.GameHandler.player.hand)
        // })

        // scene.drawTen.on('pointerdown', () => {
        //     scene.DeckHandler.drawCards(scene.GameHandler.player, scene.GameHandler.player, 10)
        //     this.CardHandler.stackHand(scene.GameHandler.player.hand)
        // })

        // scene.endTurn.on('pointerup', () => {
        //     if (scene.GameHandler.isMyTurn) {
        //         scene.CombatHandler.resolveTurn()
        //     }
        // })

        // scene.endTurn.on('pointerover', () => {
        //     if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'ready') {
        //         scene.endTurn.setColor('#ff69b4')
        //     }
        // })

        // scene.endTurn.on('pointerout', () => {
        //     if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'ready') {
        //         scene.endTurn.setColor('#00ffff')
        //     }
        // })

        
        // scene.confirmLeader.on('pointerover', () => {
        //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
        //         scene.endTurn.setColor('#ff69b4')
        //     }
        // })
        // scene.confirmLeader.on('pointerout', () => {
        //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
        //         scene.endTurn.setColor('#00ffff')
        //     }
        // })
        // scene.confirmLeader.on('pointerup', () => {
        //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
        //         console.log('Picked :', scene.GameHandler.players[scene.socket.id].partyLeader, players)
        //         scene.socket.emit('leaderPicked', scene.socket.id, scene.GameHandler.players[scene.socket.id].partyLeader)
        //     }
        // })


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

                    // scene.confirmLeader.on('pointerover', () => {
                    //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
                    //         scene.endTurn.setColor('#ff69b4')
                    //     }
                    // })
                    // scene.confirmLeader.on('pointerout', () => {
                    //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
                    //         scene.endTurn.setColor('#00ffff')
                    //     }
                    // })
                    // scene.confirmLeader.on('pointerup', () => {
                    //     if (scene.GameHandler.currentTurn === scene.socket.io && scene.GameHandler.players[scene.socket.id].partyLeader) {
                    //         console.log('Picked :', scene.GameHandler.players[scene.socket.id].partyLeader, players)
                    //         scene.socket.emit('leaderPicked', scene.socket.id, scene.GameHandler.players[scene.socket.id].partyLeader)
                    //     }
                    // })

                }
            }
        })



    

        scene.input.on('pointerover', (event, gameObjects) => {
            let pointer = scene.input.mousePointer
            // console.log(pointer)
            if (gameObjects[0].type === 'Image' && scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].getData('type') !== 'partyLeaderCard') {
                scene.children.bringToTop(gameObjects[0])
            }

            if (gameObjects[0].type === 'Image' && scene.GameHandler.gameState === 'partyLeaderSelection') {
                scene.children.bringToTop(gameObjects[0])
            }
            
            if (scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].type === 'Image') {
                // console.log(gameObjects[0])
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                //     scene.CardHandler.stickOut(gameObjects[0])
                //     console.log('stickingOut')
                // }
                scene.fadeBackground.setVisible(true)
                scene.children.bringToTop(scene.fadeBackground)
                // scene.children.bringToTop(gameObjects[0])
                scene.cardPreview = scene.add.image(960, 540, gameObjects[0].getData('sprite')) //.setScale(1, 1)
                
            }
        })

        scene.input.on('pointerout', (event, gameObjects) => {
            // let pointer = scene.input.activePointconsole
            if (scene.GameHandler.gameState !== 'partyLeaderSelection' && gameObjects[0].type === 'Image') {
                // if (gameObjects[0].getData('location') === 'hand' && gameObjects[0].getData('owner') === scene.socket.id) {
                //     console.log('stickingIn')
                //     scene.CardHandler.stickIn(gameObjects[0])
                // }
                scene.cardPreview.setVisible(false)
                scene.fadeBackground.setVisible(false)
            }
        })

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            console.log('dragging')
            gameObject.x = dragX
            gameObject.y = dragY
        })


        scene.input.on('dragstart', (pointer, gameObject) => {
            scene.cardPreview.setVisible(false)
            scene.fadeBackground.setVisible(false)
            // gameObject.setTint(0xff69b4)
            scene.children.bringToTop(gameObject)
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {
                this.highlight = this.UIHandler.zoneHandler.renderOutline(scene.playerHeroArea, 0x00ffff)
            }
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {
                this.highlight.clear()
            }
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })

        
        scene.input.on('drop', (pointer, gameObject, dropZone) => {
            if (scene.GameHandler.currentTurn === scene.socket.id && scene.GameHandler.gameState === 'ready') {

                scene.UIHandler.areas[scene.socket.id].handArea.cards.splice(scene.UIHandler.areas[scene.socket.id].handArea.cards.indexOf(gameObject), 1)
                scene.CardHandler.moveToHeroArea(gameObject)
                .then(() => scene.CardHandler.stackHand(scene.socket.id))
                dropZone.data.list.heroes.push(gameObject)

                scene.input.setDraggable(gameObject, false)
                scene.socket.emit('heroPlayed', gameObject.data.values.name, scene.socket.id)

            } else {
                gameObject.x = gameObject.input.dragStartX
                gameObject.y = gameObject.input.dragStartY
            }
        })
    }
}