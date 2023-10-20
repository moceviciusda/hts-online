
import CardHandler from "../helpers/CardHandler"
import DeckHandler from "../helpers/DeckHandler"
import GameHandler from "../helpers/GameHandler"
import InteractivityHandler from "../helpers/InteractivityHandler"
import SocketHandler from "../helpers/SocketHandler"
import UIHandler from "../helpers/UIHandler"


export default class Game extends Phaser.Scene {
    constructor () {
        super({
            key: 'Game'
        })
    }

    preload() {
        this.load.image('htsCardBack', 'src/assets/cardbacks/HtS_CardBack_Scaled.png')
        this.load.image('htsMonsterBack', 'src/assets/cardbacks/HtS_MonsterBack_Scaled.png')

        this.load.image('theCharismaticSong', 'src/assets/party_leaders/The_Charismatic_Song.png')
        this.load.image('theCloakedSage', 'src/assets/party_leaders/The_Cloaked_Sage.png')
        this.load.image('theDivineArrow', 'src/assets/party_leaders/The_Divine_Arrow.png')
        this.load.image('theFistOfReason', 'src/assets/party_leaders/The_Fist_of_Reason.png')
        this.load.image('theProtectingHorn', 'src/assets/party_leaders/The_Protecting_Horn.png')
        this.load.image('theShadowClaw', 'src/assets/party_leaders/The_Shadow_Claw.png')

        this.load.image('abyssQueen', 'src/assets/monsters/Abyss_Queen.png')
        this.load.image('anuranCauldron', 'src/assets/monsters/Anuran_Cauldron.png')
        this.load.image('arcticAries', 'src/assets/monsters/Arctic_Aries.png')
        this.load.image('bloodwing', 'src/assets/monsters/Bloodwing.png')
        this.load.image('corruptedSabretooth', 'src/assets/monsters/Corrupted_Sabretooth.png')
        this.load.image('crownedSerpent', 'src/assets/monsters/Crowned_Serpent.png')
        this.load.image('darkDragonWing', 'src/assets/monsters/Dark_Dragon_Wing.png')
        this.load.image('dracos', 'src/assets/monsters/Dracos.png')
        this.load.image('malamammoth', 'src/assets/monsters/Malamammoth.png')
        this.load.image('megaSlime', 'src/assets/monsters/Mega_Slime.png')
        this.load.image('orthus', 'src/assets/monsters/Orthus.png')
        this.load.image('rexMajor', 'src/assets/monsters/Rex_Major.png')
        this.load.image('terratuga', 'src/assets/monsters/Terratuga.png')
        this.load.image('titanWyvern', 'src/assets/monsters/Titan_Wyvern.png')
        this.load.image('warwornOwlbear', 'src/assets/monsters/Warworn_Owlbear.png')

        this.load.image('bearClaw', 'src/assets/heroes/Bear_Claw.png')
        this.load.image('bullseye', 'src/assets/heroes/Bullseye.png')
        this.load.image('bunBun', 'src/assets/heroes/Bun_Bun.png')
        this.load.image('calmingVoice', 'src/assets/heroes/Calming_Voice.png')
        this.load.image('silentShadow', 'src/assets/heroes/Silent_Shadow.png')
        this.load.image('tipsyTootie', 'src/assets/heroes/Tipsy_Tootie.png')
    }

    create() {

        this.CardHandler = new CardHandler(this)
        this.DeckHandler = new DeckHandler(this)
        this.GameHandler = new GameHandler(this)
        this.SocketHandler = new SocketHandler(this)
        this.UIHandler = new UIHandler(this)
        this.UIHandler.buildUI()
        this.InteractivityHandler = new InteractivityHandler(this)
    }

    update() {

    }

}