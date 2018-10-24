/**
 * Module for Card.
 *
 * @module src/Card
 * @author Claes Weyde
 * @version 1.0.0
 */

'use strict'

/**
 * Creates a Card instance that represents a card
 *
 * @param {string} suit - The suit of the card provided in unicode
 * @param {number} value - The value of the card
 */
function Card (suit, value) {
  this._suit = suit
  this._value = value
  this._setName()
}

/**
 * Sets the name of the card object based on the value of the card
 */
Card.prototype._setName = function () {
  if (this._value > 1 && this._value < 11) {
    this._name = this._value
  } else if (this._value === 1 || this._value === 14) {
    this._name = 'A'
  } else if (this._value === 11) {
    this._name = 'J'
  } else if (this._value === 12) {
    this._name = 'Q'
  } else if (this._value === 13) {
    this._name = 'K'
  }
}

/**
 * Returns a string that represents the suit of the current card.
 *
 * @returns {string} - A string representing the suit of the current card.
 */
Card.prototype.getSuit = function () {
  return this._suit
}

/**
 * Returns the number value of the current card value.
 *
 * @returns {number} - A number value representing the value of the current card.
 */
Card.prototype.getValue = function () {
  return this._value
}

/**
 * Sets the suit of the current card
 *
 * @param {string} suit - The suit in unicode to give the card
 */
Card.prototype.setSuit = function (suit) {
  this._suit = suit
}

/**
 * Sets the value of the current card
 *
 * @param {number} value - The value to give the card
 */

Card.prototype.setValue = function (value) {
  this._value = value
}

/**
 * Returns a string representing the current object
 *
 * @return {string} - A string representing the current object
 */
Card.prototype.toString = function () {
  return this._name + this._suit
}

module.exports = Card
