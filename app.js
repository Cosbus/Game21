'use strict'

// const Card = require('./src/Card')
const Deck = require('./src/Deck')
const Player = require('./src/Player')

let deck = new Deck()
deck.createFullSetOfCards()
deck.shuffleCards()
let player = new Player()
player.aquireCard(deck.dealCard())

player.aquireCard(deck.dealCard())

player.aquireCard(deck.dealCard())
player.countPoints()
console.log(player.getPoint())
let cards = player.getCards()

console.log(deck.toString())
