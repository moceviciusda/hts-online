import CardBack from "./cards/CardBack"
import MonsterCardBack from "./cards/monsters/MonsterCardBack"

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
import DarkDragonWing from "./cards/monsters/darkDragonWing"
import Dracos from "./cards/monsters/Dracos"
import Malamammoth from "./cards/monsters/Malamammoth"
import MegaSlime from "./cards/monsters/MegaSlime"
import Orthus from "./cards/monsters/Orthus"
import RexMajor from "./cards/monsters/RexMajor"
import Terratuga from "./cards/monsters/Terratuga"
import TitanWyvern from "./cards/monsters/TitanWyvern"
import WarwornOwlbear from "./cards/monsters/WarwornOwlbear"

import BearClaw from "./cards/heroes/BearClaw"
import Bullseye from "./cards/heroes/Bullseye"
import BunBun from "./cards/heroes/BunBun"
import CalmingVoice from "./cards/heroes/CalmingVoice"
import SilentShadow from "./cards/heroes/SilentShadow"
import TipsyTootie from "./cards/heroes/TipsyTootie"

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



// import DarkArcher from "./cards/DarkArcher";
// import DarkRogue from "./cards/DarkRogue";
// import CardHandler from "./CardHandler";



export default class DeckHandler {
    constructor(scene){

        // this.CardHandler = new CardHandler(scene)

        this.dealCard = (x, y, name, owner) => {
            let cards = {
                cardBack: new CardBack(scene),
                monsterCardBack: new MonsterCardBack(scene),

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
                darkDragonWing: new DarkDragonWing(scene),
                dracos: new Dracos(scene),
                malamammoth: new Malamammoth(scene),
                megaSlime: new MegaSlime(scene),
                orthus: new Orthus(scene),
                rexMajor: new RexMajor(scene),
                terratuga: new Terratuga(scene),
                titanWyvern: new TitanWyvern(scene),
                warwornOwlbear: new WarwornOwlbear(scene),

                bearClaw: new BearClaw(scene),
                bullseye: new Bullseye(scene),
                bunBun: new BunBun(scene),
                calmingVoice: new CalmingVoice(scene),
                silentShadow: new SilentShadow(scene),
                tipsyTootie: new TipsyTootie(scene),

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
            console.log(newCard)
            
            return newCard.render(x, y, owner)
        }

        // this.dealDeck = (deckList, owner) => {
        //     Phaser.Utils.Array.Shuffle(deckList)
        //     deckList.forEach(name => {
        //         let card = scene.DeckHandler.dealCard(name, owner)
        //         owner.deck.push(card)
        //         console.log(card)
        //         this.CardHandler.flipCard(card)
        //         scene.input.setDraggable(card, false)
        //     })
        // }

        // this.returnToDeck = (card, owner) => {
        //     console.log(`${card.getData('name')} -> Returning to deck`)
        //     this.CardHandler.removeFromBoard(card)
        //     let newCard = this.dealCard(card.getData('name'), owner)
        //     card.destroy()
        //     owner.deck.unshift(newCard)
        //     this.CardHandler.flipCard(newCard)
        //     scene.input.setDraggable(newCard, false)
        // }
        
        this.drawCard = (name, owner) => {
            let card = scene.DeckHandler.dealCard(scene.deckArea.x, scene.deckArea.y, name, owner).setData('location', 'hand')
            scene.UIHandler.areas[owner].handArea.cards.push(card)
            scene.CardHandler.moveToHand(card, owner)
            .then(() => scene.CardHandler.stackHand(owner))
        }

        this.dealMonster = name => {
            let monster = scene.DeckHandler.dealCard(scene.monsterArea.x+344-85, scene.monsterArea.y, name, null)
            scene.CardHandler.moveToMonsterArea(monster)
            scene.GameHandler.monsters.push(monster)
        }        // this.drawCards = (deckOwner, handOwner, amount) => {
        //     for (let i = 0; i < amount; i++) {
        //         if (deckOwner.deck.length > 0) {
        //             let card = deckOwner.deck.pop()
        //             handOwner.hand.push(card)
        //             console.log(handOwner + 'card draw')
        //             if (handOwner.hand.length > 10) {
        //                 // this.CardHandler.stackHand(hand)
        //                 this.CardHandler.moveToGraveyard(handOwner.hand, card, handOwner.graveyard)
        //             }
        //         } else {
        //             // stuff that happens when out of cards
        //         }
        //     } 
        // }

        // this.confirmMulligan = (owner) => {
        //     let mullIndexArray = []
        //     for (let i = 0; i < owner.hand.length; i++) {
        //         owner.hand[i].setScale(2, 2)
        //         if (owner.hand[i].data.list.mull) {
        //             owner.hand[i].getFirst().setTint()
        //             // this.CardHandler.flipCard(hand[i])
        //             this.CardHandler.moveToDeck(owner.hand[i])
        //             mullIndexArray.push(i)
        //         }
        //     }
            
        //     this.drawCards(owner, owner, mullIndexArray.length)

        //     while(mullIndexArray.length) {
        //         owner.deck.unshift(owner.hand.splice(mullIndexArray.pop(), 1))
        //     }
        //     this.CardHandler.stackHand(owner.hand)
        // }

    }
}