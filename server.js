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
let gameTurn = 0
let players = {}
let spectators = []
let partyLeaders = ['theCharismaticSong', 'theCloakedSage', 'theDivineArrow', 'theFistOfReason', 'theProtectingHorn', 'theShadowClaw']
let deck = ['bearClaw', 'bullseye', 'bunBun', 'calmingVoice', 'silentShadow', 'tipsyTootie','bearClaw', 'bullseye', 'bunBun', 'calmingVoice', 'silentShadow', 'tipsyTootie','bearClaw', 'bullseye', 'bunBun', 'calmingVoice', 'silentShadow', 'tipsyTootie','bearClaw', 'bullseye', 'bunBun', 'calmingVoice', 'silentShadow', 'tipsyTootie']
// let readyCheck = 0
let gameState = 'initializing'
let currentTurn

let setGameState = state => {
    gameState = state
    io.emit('setGameState', gameState)
}

let nextTurn = () => {
    gameTurn >= Object.keys(players).length -1 ? gameTurn = 0 : gameTurn++
    currentTurn = Object.keys(players)[gameTurn]
    io.emit('setCurrentTurn', currentTurn)
}

let drawCard = player => {
    let card = deck.shift()
    players[player].hand.push(card)
    io.emit('drawCard', card, player)

    // if (gameState !== 'dealingHands') {
        io.emit('updatePlayers', players)
        io.emit('updateDeck', deck)
    // }
}

let dealHands = () => {
    setGameState('dealingHands')
    for (let i = 0; i < 5; i++) {
        for (let player in players) {
            drawCard(player)
        }
    } 
    console.log(players)
    // io.emit('updatePlayers', players)
    // io.emit('updateDeck', deck)
}

io.on('connection', socket => {
    console.log('User Connected: ' + socket.id)

    if (Object.keys(players).length < numberOfPlayers) {
        
        players[socket.id] = {
            partyLeader: null,
            hand: [],
        }
        
        if (Object.keys(players).length < 2) {
            // players[socket.id].isPlayerA = true
            io.emit('setCurrentTurn', socket.id)
        }

    } else {
        spectators.push(socket.id)
    }

    socket.on('gameTurn', socketId => {
        nextTurn()
        console.log(gameTurn, ': ', currentTurn)
    })

    socket.on('ready', socketId => {
        shuffle(deck)
        io.emit('updateDeck', deck)
        console.log(players)
        if (Object.keys(players).length < numberOfPlayers) return
        io.emit('updatePlayers', players)
        setGameState('partyLeaderSelection')
        console.log('Game state: partyLeaderSelection')
        io.emit('partyLeaders', partyLeaders)
        
        // io.emit('changeGameState', 'readyCheck')
        // console.log('Game state: readyCheck')
        // io.emit('updatePlayers', players)
    })

    socket.on('leaderPicked', (socketId, partyLeader) => {
        // partyLeaders.splice(partyLeaders.indexOf(partyLeader))
        players[socketId].partyLeader = partyLeader
        io.emit('updatePlayers', players)
        for (let player in players) {
            if (!players[player].partyLeader) {
                nextTurn()
                io.emit('partyLeaders', partyLeaders)
                return
            }
        } 

        
        dealHands()
        setGameState('ready')
        // io.emit('ready', socketId, players[socketId].hand)
        // readyCheck++
        // if (readyCheck >= 2) {
        //     gameState = "ready"
        //     io.emit('setGameState', 'ready')
        // }
    })

    // socket.on('ready', socketId => {
    //     console.log('Player Ready: ', socketId)
    //     if (socketId in players) {
    //         for (let i = 0; i < 5; i++) {
    //             players[socketId].hand.push(deck.shift())
    //         }
    //         console.log(players)
    //         io.emit('ready', socketId, players[socketId].hand)
    //         readyCheck++
    //         if (readyCheck >= 2) {
    //             gameState = "ready"
    //             io.emit('setGameState', 'ready')
    //         }
    //     }
    // })

})


http.listen(3000, () => {
    console.log('Server started')
})