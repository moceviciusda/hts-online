import Card from "../Card";

export default class CallToTheFallen extends Card {
    constructor(scene) {
        super(scene)
        this.name = 'callToTheFallen'
        this.cardSprite = 'callToTheFallen'
        this.type = 'magic'

        this.effect = player => {
            if (scene.socket.id === player) {
                
            }    
        }
    }
}