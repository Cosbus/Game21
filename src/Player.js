'use strict'

const Card = require('./Card')

class Player {
  constructor (name = 'Player') {
    this._name = name
    this._cards = []
    this._points = 0
    this._isWinner = undefined
  }

  /**
   * The player aquires a card
   *
   * @param {*} Card the card the player is dealt
   * @memberof Player
   */
  aquireCard (Card) {
    this._cards.push(Card)
  }

  getCards () {
    return this._cards
  }

  countPoints () {
    for (let element in this._cards) {
      this._points += this._cards[element].getValue()
    }
  }

  getPoint () {
    return this._points
  }

  getNoOfCards () {
    return this._cards.length
  }

  won (winner) {
    this._isWinner = winner
  }

  isWinner () {
    return this._isWinner
  }
}

module.exports = Player
