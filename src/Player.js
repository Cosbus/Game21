'use strict'

const Card = require('./Card')

class Player {
  constructor (name = 'Player', playerStop = 17) {
    this._name = name
    this._cards = []
    this._points = 0
    this._playerStop = playerStop
    // Keep a flag for ace and a soft value
    this._hasAce = false
    this._highPoints = 0
  }

  /**
   * The player aquires a card
   *
   * @param {*} Card the card the player is dealt
   * @memberof Player
   */
  aquireCard (Card) {
    if (Card.getValue() === undefined) throw new Error('No card to aquire')
    this._cards.push(Card)
    this._points += Card.getValue()
    this._highPoints += Card.getValue()
    if (Card.getValue() === 1 && !this._hasAce) {
      this._hasAce = true
      this._highPoints += 13
    }
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
    let value = this._cards[this._cards.length - 1].getValue()
    this._points -= value
    this._highPoints -= value
    if (value === 1) {
      this._highPoints -= 13
    }
    return this._cards.pop()
  }

  getPoints () {
    return this._points
  }

  getHighPoints () {
    return this._highPoints
  }

  setPoints (value) {
    this._points = value
  }

  getNoOfCards () {
    return this._cards.length
  }

  setPlayerStop (stop) {
    this._playerStop = stop
  }

  getPlayerStop () {
    return this._playerStop
  }

  hasAce () {
    return this._hasAce
  }
}

module.exports = Player
