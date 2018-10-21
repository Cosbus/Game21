'use strict'

const Card = require('./Card')

class Deck {
  constructor () {
    this.cards = []
  }

  createCards () {
    let i = 0
    while (i < 52) {
      if (i < 13) {
        this.cards[i] = new Card('\u2764', i + 1)
      } else if (i < 26) {
        this.cards[i] = new Card('\u2663', i - 12)
      } else if (i < 39) {
        this.cards[i] = new Card('\u2660', i - 25)
      } else {
        this.cards[i] = new Card('\u2666', i - 38)
      }
      i++
    }
  }

  toString () {
    let str = ''
    for (let element in this.cards) {
      str += ` ${element}`
    }
    return str
  }
}

module.exports = Deck
