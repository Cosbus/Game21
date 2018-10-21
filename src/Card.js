'use strict'

function Card (suit, value) {
  this._suit = suit
  this._value = value
}

Card.prototype.getSuit = function () {
  return this._suit
}

Card.prototype.getValue = function () {
  return this._value
}

Card.prototype.setSuit = function (suit) {
  this._suit = suit
}

Card.prototype.setValue = function (value) {
  this._value = value
}

Card.prototype.toString = function () {
  if (this._value === 1) {
    return 'A' + this._suit
  } else if (this._value < 11) {
    return this._value + this._suit
  } else if (this._value === 11) {
    return 'J' + this._suit
  } else if (this._value === 12) {
    return 'Q' + this._suit
  } else {
    return 'K' + this._suit
  }
}

module.exports = Card
