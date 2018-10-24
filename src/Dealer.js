'use strict'

const Player = require('./Player')

class Dealer extends Player {
  constructor (name = 'Dealer', stop = 18) {
    super(name, stop)
  }
}

module.exports = Dealer
