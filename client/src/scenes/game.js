
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

        this.load.image("dice-albedo", "src/assets/dice/dice-albedo.png");
        this.load.obj("dice-obj", "src/assets/dice/dice.obj");

        this.load.image('htsCardBack', 'src/assets/cardbacks/HtS_CardBack_Scaled.png')
        this.load.image('htsMonsterBack', 'src/assets/cardbacks/HtS_MonsterBack_Scaled.png')
        this.load.image('challenge', 'src/assets/Challenge.png')

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
        this.load.image('darkDragonKing', 'src/assets/monsters/Dark_Dragon_King.png')
        this.load.image('dracos', 'src/assets/monsters/Dracos.png')
        this.load.image('malamammoth', 'src/assets/monsters/Malamammoth.png')
        this.load.image('megaSlime', 'src/assets/monsters/Mega_Slime.png')
        this.load.image('orthus', 'src/assets/monsters/Orthus.png')
        this.load.image('rexMajor', 'src/assets/monsters/Rex_Major.png')
        this.load.image('terratuga', 'src/assets/monsters/Terratuga.png')
        this.load.image('titanWyvern', 'src/assets/monsters/Titan_Wyvern.png')
        this.load.image('warwornOwlbear', 'src/assets/monsters/Warworn_Owlbear.png')

        this.load.image('badAxe', 'src/assets/heroes/Bad_Axe.png')
        this.load.image('bearClaw', 'src/assets/heroes/Bear_Claw.png')
        this.load.image('bearyWise', 'src/assets/heroes/Beary_Wise.png')
        this.load.image('furyKnuckle', 'src/assets/heroes/Fury_Knuckle.png')
        this.load.image('heavyBear', 'src/assets/heroes/Heavy_Bear.png')
        this.load.image('panChucks', 'src/assets/heroes/Pan_Chucks.png')
        this.load.image('qiBear', 'src/assets/heroes/Qi_Bear.png')
        this.load.image('toughTeddy', 'src/assets/heroes/Tough_Teddy.png')
        this.load.image('dodgyDealer', 'src/assets/heroes/Dodgy_Dealer.png')
        this.load.image('fuzzyCheeks', 'src/assets/heroes/Fuzzy_Cheeks.png')
        this.load.image('greedyCheeks', 'src/assets/heroes/Greedy_Cheeks.png')
        this.load.image('luckyBucky', 'src/assets/heroes/Lucky_Bucky.png')
        this.load.image('mellowDee', 'src/assets/heroes/Mellow_Dee.png')
        this.load.image('nappingNibbles', 'src/assets/heroes/Napping_Nibbles.png')
        this.load.image('peanut', 'src/assets/heroes/Peanut.png')
        this.load.image('tipsyTootie', 'src/assets/heroes/Tipsy_Tootie.png')
        this.load.image('calmingVoice', 'src/assets/heroes/Calming_Voice.png')
        this.load.image('guidingLight', 'src/assets/heroes/Guiding_Light.png')
        this.load.image('holyCurselifter', 'src/assets/heroes/Holy_Curselifter.png')
        this.load.image('ironResolve', 'src/assets/heroes/Iron_Resolve.png')
        this.load.image('mightyBlade', 'src/assets/heroes/Mighty_Blade.png')
        this.load.image('radiantHorn', 'src/assets/heroes/Radiant_Horn.png')
        this.load.image('vibrantGlow', 'src/assets/heroes/Vibrant_Glow.png')
        this.load.image('wiseShield', 'src/assets/heroes/Wise_Shield.png')
        this.load.image('bullseye', 'src/assets/heroes/Bullseye.png')
        this.load.image('hook', 'src/assets/heroes/Hook.png')
        this.load.image('lookieRookie', 'src/assets/heroes/Lookie_Rookie.png')
        this.load.image('quickDraw', 'src/assets/heroes/Quick_Draw.png')
        this.load.image('seriousGrey', 'src/assets/heroes/Serious_Grey.png')
        this.load.image('sharpFox', 'src/assets/heroes/Sharp_Fox.png')
        this.load.image('wildshot', 'src/assets/heroes/Wildshot.png')
        this.load.image('wilyRed', 'src/assets/heroes/Wily_Red.png')
        this.load.image('kitNapper', 'src/assets/heroes/Kit_Napper.png')
        this.load.image('meowzio', 'src/assets/heroes/Meowzio.png')
        this.load.image('plunderingPuma', 'src/assets/heroes/Plundering_Puma.png')
        this.load.image('shurikitty', 'src/assets/heroes/Shurikitty.png')
        this.load.image('silentShadow', 'src/assets/heroes/Silent_Shadow.png')
        this.load.image('slipperyPaws', 'src/assets/heroes/Slippery_Paws.png')
        this.load.image('slyPickings', 'src/assets/heroes/Sly_Pickings.png')
        this.load.image('smoothMimimeow', 'src/assets/heroes/Smooth_Mimimeow.png')
        this.load.image('bunBun', 'src/assets/heroes/Bun_Bun.png')
        this.load.image('buttons', 'src/assets/heroes/Buttons.png')
        this.load.image('fluffy', 'src/assets/heroes/Fluffy.png')
        this.load.image('hopper', 'src/assets/heroes/Hopper.png')
        this.load.image('snowball', 'src/assets/heroes/Snowball.png')
        this.load.image('spooky', 'src/assets/heroes/Spooky.png')
        this.load.image('whiskers', 'src/assets/heroes/Whiskers.png')
        this.load.image('wiggles', 'src/assets/heroes/Wiggles.png')

        this.load.image('bardMask', 'src/assets/items/Bard_Mask.png')
        this.load.image('decoyDoll', 'src/assets/items/Decoy_Doll.png')
        this.load.image('fighterMask', 'src/assets/items/Fighter_Mask.png')
        this.load.image('guardianMask', 'src/assets/items/Guardian_Mask.png')
        this.load.image('particularlyRustyCoin', 'src/assets/items/Particularly_Rusty_Coin.png')
        this.load.image('rangerMask', 'src/assets/items/Ranger_Mask.png')
        this.load.image('reallyBigRing', 'src/assets/items/Really_Big_Ring.png')
        this.load.image('thiefMask', 'src/assets/items/Thief_Mask.png')
        this.load.image('wizardMask', 'src/assets/items/Wizard_Mask.png')

        this.load.image('curseOfTheSnakesEyes', 'src/assets/cursed_items/Curse_of_the_Snakes_Eyes.png')
        this.load.image('sealingKey', 'src/assets/cursed_items/Sealing_Key.png')
        this.load.image('suspiciouslyShinyCoin', 'src/assets/cursed_items/Suspiciously_Shiny_Coin.png')

        this.load.image('criticalBoost', 'src/assets/magic/Critical_Boost.png')
        this.load.image('callToTheFallen', 'src/assets/magic/Call_to_the_Fallen.png')
        this.load.image('destructiveSpell', 'src/assets/magic/Destructive_Spell.png')
        this.load.image('enchantedSpell', 'src/assets/magic/Enchanted_Spell.png')
        this.load.image('entanglingTrap', 'src/assets/magic/Entangling_Trap.png')
        this.load.image('forcedExchange', 'src/assets/magic/Forced_Exchange.png')
        this.load.image('forcefulWinds', 'src/assets/magic/Forceful_Winds.png')
        this.load.image('windsOfChange', 'src/assets/magic/Winds_of_Change.png')

        this.load.image('minus4', 'src/assets/modifiers/Minus4.png')
        this.load.image('plus1Minus3', 'src/assets/modifiers/Plus1_Minus3.png')
        this.load.image('plus2Minus2', 'src/assets/modifiers/Plus2_Minus2.png')
        this.load.image('plus3Minus1', 'src/assets/modifiers/Plus3_Minus1.png')
        this.load.image('plus4', 'src/assets/modifiers/Plus4.png')
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