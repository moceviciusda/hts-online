const server = require('express')()
const http = require('http').createServer(server)
const cors = require('cors')
const { constants } = require('os')
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
})

const shuffle = require('shuffle-array')
let numberOfPlayers = 2
let reactCount = 0
let gameTurn = 1
let players = {}
let spectators = []
let partyLeaders = ['theCharismaticSong', 'theCloakedSage', 'theDivineArrow', 'theFistOfReason', 'theProtectingHorn', 'theShadowClaw']
let monsterDeck = ['abyssQueen', 'anuranCauldron', 'arcticAries', 'bloodwing', 'corruptedSabretooth', 'crownedSerpent', 'darkDragonKing', 'dracos', 'malamammoth', 'megaSlime', 'orthus', 'rexMajor', 'terratuga', 'titanWyvern', 'warwornOwlbear']
let monsters = []
let baseHeroes = ['badAxe', 'bearClaw', 'bearyWise', 'furyKnuckle', 'heavyBear', 'panChucks', 'qiBear', 'toughTeddy', 'dodgyDealer', 'fuzzyCheeks', 'greedyCheeks', 'luckyBucky', 'mellowDee', 'nappingNibbles', 'peanut', 'tipsyTootie', 'calmingVoice', 'guidingLight', 'holyCurselifter', 'ironResolve', 'mightyBlade', 'radiantHorn', 'vibrantGlow', 'wiseShield', 'bullseye', 'hook', 'lookieRookie', 'quickDraw', 'seriousGrey', 'sharpFox', 'wildshot', 'wilyRed', 'kitNapper', 'meowzio', 'plunderingPuma', 'shurikitty', 'silentShadow', 'slipperyPaws', 'slyPickings', 'smoothMimimeow', 'bunBun', 'buttons', 'fluffy', 'hopper', 'snowball', 'spooky', 'whiskers', 'wiggles']
let baseItems = ['bardMask', 'decoyDoll', 'fighterMask', 'guardianMask', 'particularlyRustyCoin', 'particularlyRustyCoin', 'rangerMask', 'reallyBigRing', 'reallyBigRing', 'thiefMask', 'wizardMask', 'curseOfTheSnakesEyes', 'curseOfTheSnakesEyes', 'sealingKey', 'suspiciouslyShinyCoin']
let baseChallenges = ['challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge']
let baseMagic = ['criticalBoost', 'criticalBoost']
let deck = [].concat(baseHeroes, baseItems, baseChallenges, baseMagic)
// deck = ['challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge', 'challenge']
let discard = []
let gameState = 'initializing'
let currentTurn
let leaderMovedCount = 0

let randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

let alert = alert => {
    io.emit('alert', alert)
}

let setGameState = state => {
    gameState = state
    console.log('Game state:', gameState)
    io.emit('setGameState', gameState)
}

let nextTurn = () => {
    gameTurn >= Object.keys(players).length ? gameTurn = 1 : gameTurn++
    currentTurn = Object.keys(players)[gameTurn-1]
    console.log('Current turn:', currentTurn)
    io.emit('setCurrentTurn', currentTurn)
    if (gameState === 'ready') alert(`Player ${gameTurn}'s Turn`)
}

let drawCard = player => {
    let card = deck.shift()
    players[player].hand.push(card)
    console.log(player, 'drawn:', card)
    io.emit('drawCard', card, player)
    io.emit('updatePlayers', players)
    io.emit('updateDeck', deck)
}

let dealMonster = () => {
    let monster = monsterDeck.shift()
    monsters.push(monster)
    // io.emit('updateMonsters')
    io.emit('dealMonster', monster)
}

let dealHands = () => {
    for (let i = 0; i < 5; i++) {
        for (let player in players) {
            drawCard(player)
        }
    } 
    console.log(players)
}

io.on('connection', socket => {
    console.log('User Connected:' + socket.id)
    if (Object.keys(players).length < numberOfPlayers) {
        players[socket.id] = {
            partyLeader: null,
            hand: [],
            monsters: [],
            heroes: []
        }
    } else {
        spectators.push(socket.id)
    }

    socket.on('endTurn', socketId => {
        nextTurn()
        console.log(gameTurn, ':', currentTurn)
    })

    socket.on('setGameState', state => {
        setGameState(state)
    })

    socket.on('ready', socketId => {
        shuffle(deck)
        shuffle(monsterDeck)
        io.emit('updateDeck', deck)
        console.log(players)
        if (Object.keys(players).length < numberOfPlayers) return
        gameTurn = randomInt(1, numberOfPlayers)
        nextTurn()
        io.emit('updatePlayers', players)
        setGameState('partyLeaderSelection')
        io.emit('partyLeaders', partyLeaders)
    })

    socket.on('leaderPicked', (socketId, partyLeader) => {
        players[socketId].partyLeader = partyLeader
        io.emit('updatePlayers', players)
        for (let player in players) {
            if (!players[player].partyLeader) {
                nextTurn()
                io.emit('partyLeaders', partyLeaders)
                return
            }
        }
        setGameState('dealingHands')
    })

    socket.on('leaderMoved', () => {
        leaderMovedCount++
        if (leaderMovedCount >= numberOfPlayers) {
            dealHands()
            for (let i = 0; i < 3; i++) {
                dealMonster()
            }
            setGameState('ready')
        }
    })

    socket.on('drawCard', socketId => {
        drawCard(socketId)
    })

    socket.on('cardPlayed', (name, target, socketId) => {
        console.log(socketId, 'attempting to play:', name, 'on', target)
        players[socketId].hand.splice(players[socketId].hand.indexOf(name), 1)
        // players[socketId].heroes.push(name)
        setGameState('waitingForChallengers')
        io.emit('cardPlayed', name, target, socketId)
    })

    socket.on('attacking', (monsterName, socketId) => {
        setGameState('attacking')
        let roll1 = randomInt(1, 6)
        let roll2 = randomInt(1, 6)
        io.emit('diceRoll', roll1, roll2, socketId)
        console.log(socketId, 'Rolled:', roll1+roll2, '(', roll1, '+', roll2, ')')
        io.emit('attacking', monsterName, socketId)
        console.log(socketId, 'attacking', monsterName)
    })

    socket.on('monsterSlayed', (monsterName, socketId) => {
        monsters.splice(monsters.indexOf(monsterName), 1)
        players[socketId].monsters.push(monsterName)
        dealMonster()
        setGameState('ready')
        console.log(socketId, 'has slain', monsterName)
    })

    socket.on('monsterSurvived', (monsterName, socketId) => {
        setGameState('ready')
        console.log(socketId, 'failed to slay', monsterName)
    })

    socket.on('challenged', (name, socketId) => {
        reactCount = 0
        console.log(socketId, 'challenged', currentTurn)
        players[socketId].hand.splice(players[socketId].hand.indexOf(name), 1)
        setGameState('challenge')

        let roll1 = randomInt(1, 6)
        let roll2 = randomInt(1, 6)
        io.emit('diceRoll', roll1, roll2, socketId)
        console.log(socketId, 'Rolled:', roll1+roll2, '(', roll1, '+', roll2, ')')
        
        roll1 = randomInt(1, 6)
        roll2 = randomInt(1, 6)
        io.emit('diceRoll', roll1, roll2, currentTurn)
        console.log(currentTurn, 'Rolled:', roll1+roll2, '(', roll1, '+', roll2, ')')

        io.emit('challenged', name, socketId)
        
    })

    socket.on('dontChallenge', socketId => {
        console.log()
        reactCount++
        if (reactCount >= numberOfPlayers) {
            io.emit('notChallenged')
            setGameState('ready')
            reactCount = 0
        }
    })

    socket.on('challengeFailed', challengeName => {
        discard.push(challengeName)
        io.emit('notChallenged')
        // setGameState('ready')
    })

    socket.on('challengeSuccessful', (challengeName, cardName) => {
        discard.push(challengeName)
        discard.push(cardName)
        // io.emit('notChallenged')
        setGameState('ready')
    })

    socket.on('heroSummoned', (name, socketId) => {
        console.log(socketId, 'played:', name)
        // players[socketId].hand.splice(players[socketId].hand.indexOf(name), 1)
        players[socketId].heroes.push(name)
        io.emit('heroSummoned', name, socketId)
        setGameState('ready')
    })

    socket.on('itemEquiped', (name, hero, socketId) => {
        console.log(socketId, 'equiped:', name, 'on', hero)
        // players[socketId].hand.splice(players[socketId].hand.indexOf(name), 1)
        // players[socketId].heroes.push(name)
        io.emit('itemEquiped', name, hero, socketId)
        setGameState('ready')
    })

    socket.on('magicCast', (name, socketId) => {
        console.log(socketId, 'played:', name)
        // players[socketId].hand.splice(players[socketId].hand.indexOf(name), 1)
        discard.push(name)
        setGameState('ready')
        io.emit('magicCast', name, socketId)
    })

    socket.on('heroSacrificed', (heroName, socketId) => {
        players[socketId].heroes.splice(players[socketId].heroes.indexOf(heroName), 1)
        discard.push(heroName)
        io.emit('heroSacrificed', heroName, socketId)
        console.log(socketId, 'sacrificed', heroName)
    })

    socket.on('discard', (cardName, socketId) => {
        players[socketId].hand.splice(players[socketId].hand.indexOf(cardName), 1)
        discard.push(cardName)
        io.emit('discard', cardName, socketId)
        console.log(socketId, 'discarded', cardName)
    })

    socket.on('diceRoll', socketId => {
        let result1 = randomInt(1, 6)
        let result2 = randomInt(1, 6)
        console.log(socketId, 'Rolled:', result1+result2, '(', result1, '+', result2, ')')
        io.emit('diceRoll', result1, result2, socketId)
    })
})


http.listen(3000, () => {
    console.log('Server started')
})