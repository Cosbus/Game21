'use strict'

const Card = require('./Card')

class Player {
  constructor (name = 'Player') {
    this._name = name
    this._cards = []
    this._points = 0
    // Keep a flag for ace and a highPoints "soft" variable
    this._hasAce = false
    this._highPoints = 13
  }

  /**
   * The player aquires a card
   *
   * @param {*} Card the card the player is dealt
   * @memberof Player
   */
  aquireCard (Card) {
    this._cards.push(Card)
    this._points += Card.getValue()
    this._highPoints += Card.getValue()
    if (Card.getValue === 1) this._hasAce = true
  }

  getName () {
    return this._name
  }

  getCards () {
    return this._cards
  }

  // nedan kanske inte behövs
  countPoints () {
    for (let element in this._cards) {
      this._points += this._cards[element].getValue()
    }
  }

  throwCard () {
    this._points -= this._cards[this._cards.length - 1].getValue()
    this._highPoints -= this._cards[this._cards.length - 1].getValue()
    return this._cards.pop()
  }

  getPoint () {
    return this._points
  }

  getHighPoint () {
    return this._highPoints
  }

  getNoOfCards () {
    return this._cards.length
  }

  hasAce () {
    return this._hasAce
  }
}

module.exports = Player
