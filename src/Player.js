/**
 * Module for Player.
 *
 * @module src/Player
 * @author Claes Weyde
 * @version 1.0.0
 */
'use strict'

/**
 * Represents a card player
 *
 * @class Player
 */
class Player {
  /**
   * Creates an instance of Player.
   *
   * @param {string} [name='Player'] - the name of the player
   * @param {number} [playerStop=17] - the value at which the player stops aquiring cards
   * @memberof Player
   * @constructor
   */
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
   * @param {Card} Card - the card the player is dealt
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

  /**
   * Returns the name of the player
   *
   * @returns {string} name - the name of the player
   * @memberof Player
   */
  getName () {
    return this._name
  }

  /**
   * Returns an array containing the cards the player has in his/her/its hand
   *
   * @returns {[Card]} cards - an array containing the player's cards
   * @memberof Player
   */
  getCards () {
    return this._cards
  }

  /**
   * Throws a card from the players hand (the top card of the array
   * containing the cards)
   *
   * @returns {Card} card - the card that is thrown from the hand
   * @memberof Player
   */
  throwCard () {
    let value = this._cards[this._cards.length - 1].getValue()
    this._points -= value
    this._highPoints -= value
    if (value === 1) {
      this._highPoints -= 13
    }
    return this._cards.pop()
  }

  /**
   * Returns the summed points of the card in the players hand
   *
   * @returns {number} _points - the summed points of the cards in the player's hand
   * @memberof Player
   */
  getPoints () {
    return this._points
  }

  /**
   * Returns the soft high value of the sum of the cards in the player's hand, where one (1) ace
   * is counted as 14 points.
   *
   * @returns {number} _highPoints - the summed points of the hand where one ace is counted as 14
   * @memberof Player
   */
  getHighPoints () {
    return this._highPoints
  }

  /**
   * Returns the number of cards in the player's hand
   *
   * @returns {number} _cards.length - the number of cards in the player's hand
   * @memberof Player
   */
  getNoOfCards () {
    return this._cards.length
  }

  /**
   * Sets the value at which the player is happy with its/his/hers hand and stops requesting
   * more cards
   *
   * @param {number} stop - the value at which the player stops aquiring more cards
   * @memberof Player
   */
  setPlayerStop (stop) {
    this._playerStop = stop
  }

  /**
   * Returns the value at which the player does not want more cards
   *
   * @returns {number} _playerStop - value at which the player does not request more cards
   * @memberof Player
   */
  getPlayerStop () {
    return this._playerStop
  }
}

module.exports = Player
