'use strict'

// const Card = require('./src/Card')
const Deck = require('./src/Deck')

let deck = new Deck()
deck.createCards()
console.log(deck.toString())
