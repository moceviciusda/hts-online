import LeaderCard from "./LeaderCard"

export default class TheDivineArrow extends LeaderCard {
    constructor(scene) {
        super(scene)
        this.name = 'theDivineArrow'
        this.cardSprite = 'theDivineArrow'
        this.class = 'ranger'
    }
}