import LeaderCard from "./LeaderCard"

export default class TheProtectingHorn extends LeaderCard {
    constructor(scene) {
        super(scene)
        this.name = 'theProtectingHorn'
        this.cardSprite = 'theProtectingHorn'
        this.class = 'guardian'
    }
}