import CardBack from "./cards/CardBack"
import MonsterCardBack from "./cards/monsters/MonsterCardBack"
import Challenge from "./cards/Challenge"

import TheCharismaticSong from "./cards/party_leaders/TheCharismaticSong"
import TheCloakedSage from "./cards/party_leaders/TheCloakedSage"
import TheDivineArrow from "./cards/party_leaders/TheDivineArrow"
import TheFistOfReason from "./cards/party_leaders/TheFistOfReason"
import TheProtectingHorn from "./cards/party_leaders/TheProtectingHorn"
import TheShadowClaw from "./cards/party_leaders/TheShadowClaw"

import AbyssQueen from "./cards/monsters/AbyssQueen"
import AnuranCauldron from "./cards/monsters/AnuranCauldron"
import ArcticAries from "./cards/monsters/ArcticAries"
import Bloodwing from "./cards/monsters/Bloodwing"
import CorruptedSabretooth from "./cards/monsters/CorruptedSabretooth"
import CrownedSerpent from "./cards/monsters/CrownedSerpent"
import DarkDragonKing from "./cards/monsters/DarkDragonKing"
import Dracos from "./cards/monsters/Dracos"
import Malamammoth from "./cards/monsters/Malamammoth"
import MegaSlime from "./cards/monsters/MegaSlime"
import Orthus from "./cards/monsters/Orthus"
import RexMajor from "./cards/monsters/RexMajor"
import Terratuga from "./cards/monsters/Terratuga"
import TitanWyvern from "./cards/monsters/TitanWyvern"
import WarwornOwlbear from "./cards/monsters/WarwornOwlbear"

import BadAxe from "./cards/heroes/BadAxe"
import BearClaw from "./cards/heroes/BearClaw"
import BearyWise from "./cards/heroes/BearyWise"
import FuryKnuckle from "./cards/heroes/FuryKnuckle"
import HeavyBear from "./cards/heroes/HeavyBear"
import PanChucks from "./cards/heroes/PanChucks"
import QiBear from "./cards/heroes/QiBear"
import ToughTeddy from "./cards/heroes/ToughTeddy"
import DodgyDealer from "./cards/heroes/DodgyDealer"
import FuzzyCheeks from "./cards/heroes/FuzzyCheeks"
import GreedyCheeks from "./cards/heroes/GreedyCheeks"
import LuckyBucky from "./cards/heroes/LuckyBucky"
import MellowDee from "./cards/heroes/MellowDee"
import NappingNibbles from "./cards/heroes/NappingNibbles"
import Peanut from "./cards/heroes/Peanut"
import TipsyTootie from "./cards/heroes/TipsyTootie"
import CalmingVoice from "./cards/heroes/CalmingVoice"
import GuidingLight from "./cards/heroes/GuidingLight"
import HolyCurselifter from "./cards/heroes/HolyCurselifter"
import IronResolve from "./cards/heroes/IronResolve"
import MightyBlade from "./cards/heroes/MightyBlade"
import RadiantHorn from "./cards/heroes/RadiantHorn"
import VibrantGlow from "./cards/heroes/VibrantGlow"
import WiseShield from "./cards/heroes/WiseShield"
import Bullseye from "./cards/heroes/Bullseye"
import Hook from "./cards/heroes/Hook"
import LookieRookie from "./cards/heroes/LookieRookie"
import QuickDraw from "./cards/heroes/QuickDraw"
import SeriousGrey from "./cards/heroes/SeriousGrey"
import SharpFox from "./cards/heroes/SharpFox"
import Wildshot from "./cards/heroes/Wildshot"
import WilyRed from "./cards/heroes/WilyRed"
import KitNapper from "./cards/heroes/KitNapper"
import Meowzio from "./cards/heroes/Meowzio"
import PlunderingPuma from "./cards/heroes/PlunderingPuma"
import Shurikitty from "./cards/heroes/Shurikitty"
import SilentShadow from "./cards/heroes/SilentShadow"
import SlipperyPaws from "./cards/heroes/SlipperyPaws"
import SlyPickings from "./cards/heroes/SlyPickings"
import SmoothMimimeow from "./cards/heroes/SmoothMimimeow"
import BunBun from "./cards/heroes/BunBun"
import Buttons from "./cards/heroes/Buttons"
import Fluffy from "./cards/heroes/Fluffy"
import Hopper from "./cards/heroes/Hopper"
import Snowball from "./cards/heroes/Snowball"
import Spooky from "./cards/heroes/Spooky"
import Whiskers from "./cards/heroes/Whiskers"
import Wiggles from "./cards/heroes/Wiggles"

import BardMask from "./cards/items/BardMask"
import DecoyDoll from "./cards/items/DecoyDoll"
import FighterMask from "./cards/items/FighterMask"
import GuardianMask from "./cards/items/GuardianMask"
import ParticularlyRustyCoin from "./cards/items/ParticularlyRustyCoin"
import RangerMask from "./cards/items/RangerMask"
import ReallyBigRing from "./cards/items/ReallyBigRing"
import ThiefMask from "./cards/items/ThiefMask"
import WizardMask from "./cards/items/WizardMask"

import CurseOfTheSnakesEyes from "./cards/cursed_items/CurseOfTheSnakesEyes"
import SealingKey from "./cards/cursed_items/SealingKey"
import SuspiciouslyShinyCoin from "./cards/cursed_items/SuspiciouslyShinyCoin"


export default class DeckHandler {
    constructor(scene){

        // this.CardHandler = new CardHandler(scene)

        this.dealCard = (x, y, name, owner) => {
            let cards = {
                cardBack: new CardBack(scene),
                monsterCardBack: new MonsterCardBack(scene),
                challenge: new Challenge(scene),

                theCharismaticSong: new TheCharismaticSong(scene),
                theCloakedSage: new TheCloakedSage(scene),
                theDivineArrow: new TheDivineArrow(scene),
                theFistOfReason: new TheFistOfReason(scene),
                theProtectingHorn: new TheProtectingHorn(scene),
                theShadowClaw: new TheShadowClaw(scene),

                abyssQueen: new AbyssQueen(scene),
                anuranCauldron: new AnuranCauldron(scene),
                arcticAries: new ArcticAries(scene),
                bloodwing: new Bloodwing(scene),
                corruptedSabretooth: new CorruptedSabretooth(scene),
                crownedSerpent: new CrownedSerpent(scene),
                darkDragonKing: new DarkDragonKing(scene),
                dracos: new Dracos(scene),
                malamammoth: new Malamammoth(scene),
                megaSlime: new MegaSlime(scene),
                orthus: new Orthus(scene),
                rexMajor: new RexMajor(scene),
                terratuga: new Terratuga(scene),
                titanWyvern: new TitanWyvern(scene),
                warwornOwlbear: new WarwornOwlbear(scene),

                badAxe: new BadAxe(scene),
                bearClaw: new BearClaw(scene),
                bearyWise: new BearyWise(scene),
                furyKnuckle: new FuryKnuckle(scene),
                heavyBear: new HeavyBear(scene),
                panChucks: new PanChucks(scene),
                qiBear: new QiBear(scene),
                toughTeddy: new ToughTeddy(scene),
                dodgyDealer: new DodgyDealer(scene),
                fuzzyCheeks: new FuzzyCheeks(scene),
                greedyCheeks: new GreedyCheeks(scene),
                luckyBucky: new LuckyBucky(scene),
                mellowDee: new MellowDee(scene),
                nappingNibbles: new NappingNibbles(scene),
                peanut: new Peanut(scene),
                tipsyTootie: new TipsyTootie(scene),
                calmingVoice: new CalmingVoice(scene),
                guidingLight: new GuidingLight(scene),
                holyCurselifter: new HolyCurselifter(scene),
                ironResolve: new IronResolve(scene),
                mightyBlade: new MightyBlade(scene),
                radiantHorn: new RadiantHorn(scene),
                vibrantGlow: new VibrantGlow(scene),
                wiseShield: new WiseShield(scene),
                bullseye: new Bullseye(scene),
                hook: new Hook(scene),
                lookieRookie: new LookieRookie(scene),
                quickDraw: new QuickDraw(scene),
                seriousGrey: new SeriousGrey(scene),
                sharpFox: new SharpFox(scene),
                wildshot: new Wildshot(scene),
                wilyRed: new WilyRed(scene),
                kitNapper: new KitNapper(scene),
                meowzio: new Meowzio(scene),
                plunderingPuma: new PlunderingPuma(scene),
                shurikitty: new Shurikitty(scene),
                silentShadow: new SilentShadow(scene),
                slipperyPaws: new SlipperyPaws(scene),
                slyPickings: new SlyPickings(scene),
                smoothMimimeow: new SmoothMimimeow(scene),
                bunBun: new BunBun(scene),
                buttons: new Buttons(scene),
                fluffy: new Fluffy(scene),
                hopper: new Hopper(scene),
                snowball: new Snowball(scene),
                spooky: new Spooky(scene),
                whiskers: new Whiskers(scene),
                wiggles: new Wiggles(scene),

                bardMask: new BardMask(scene),
                decoyDoll: new DecoyDoll(scene),
                fighterMask: new FighterMask(scene),
                guardianMask: new GuardianMask(scene),
                particularlyRustyCoin: new ParticularlyRustyCoin(scene),
                rangerMask: new RangerMask(scene),
                reallyBigRing: new ReallyBigRing(scene),
                thiefMask: new ThiefMask(scene),
                wizardMask: new WizardMask(scene),

                curseOfTheSnakesEyes: new CurseOfTheSnakesEyes(scene),
                sealingKey: new SealingKey(scene),
                suspiciouslyShinyCoin: new SuspiciouslyShinyCoin(scene), 
            }
            let newCard = cards[name]

            return newCard.render(x, y, owner)
        }
        
        this.drawCard = (name, owner) => {
            let card = scene.DeckHandler.dealCard(scene.deckArea.x, scene.deckArea.y, name, owner)
            .setData('location', 'hand').setAngle(scene.deckArea.angle)
            scene.UIHandler.areas[owner].handArea.cards.push(card)
            scene.CardHandler.moveToHand(card, owner)
            .then(() => scene.CardHandler.stackHand(owner))
        }

        this.dealMonster = name => {
            let monster = scene.DeckHandler.dealCard(scene.monsterArea.x+344-85, scene.monsterArea.y, name, null)
            scene.CardHandler.moveToMonsterArea(monster)
            scene.monsterArea.data.list.cards.push(monster)
        }        
        
        // this.discard = ()
    }
}