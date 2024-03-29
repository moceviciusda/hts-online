import Card from "../Card";

export default class CriticalBoost extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'criticalBoost'
        this.cardSprite = 'criticalBoost'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                let drawCounter = 0
                let listener = () => {
                    drawCounter++
                    if (drawCounter >= 3) {
                        scene.socket.off('drawCard', listener)
                        scene.UIHandler.buildDiscardView(1)
                        .then(() => scene.socket.emit('setGameState', 'ready'))
                        
                    }
                }

                scene.socket.emit('drawCard', player)
                scene.socket.emit('drawCard', player)
                scene.socket.emit('drawCard', player)
                scene.socket.on('drawCard', listener)
            }    
        }
    }
}