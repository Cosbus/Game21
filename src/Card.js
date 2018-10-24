'use strict'

function Card (suit, value) {
  this._suit = suit
  this._value = value
  this._setName()
}

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
  return this._name + this._suit
}

module.exports = Card
