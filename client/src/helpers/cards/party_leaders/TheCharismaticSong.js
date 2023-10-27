import LeaderCard from "./LeaderCard"

export default class TheCharismaticSong extends LeaderCard {
    constructor(scene) {
        super(scene)
        this.name = 'theCharismaticSong'
        this.cardSprite = 'theCharismaticSong'
        this.class = 'bard'
    }
}