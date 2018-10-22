'use strict'

const Card = require('./Card')
const Player = require('./Player')
const Deck = require('./Deck')
const Dealer = require('./Dealer')

class Game {
  constructor (noOfPlayers = 1, playerStop = 17, dealerStop = 18) {
    this._noOfPlayers = noOfPlayers
    this._players = []
    this._dealer = new Dealer()
    this._playDeck = new Deck()
    this._throwDeck = new Deck()
    this._playerStop = playerStop
    this._dealerStop = dealerStop
    this.setUpGame()
    this.runGame()
  }

  setUpGame () {
    let i = 1
    while (i <= this._noOfPlayers) {
      this._players.push(new Player('Player' + i))
      i++
    }
    this._playDeck.createFullSetOfCards()
    this._playDeck.shuffleCards()
  }

  runGame () {
    // Deal one card for each player initially
    this._players.forEach(function (player) {
      this.deal(player)
    })
    // Play each player
    for (let player in this._players) {
      while ((player.getPoint() < this._playerStop) && (player.getNoOfCards() <= 5)) {
        this.deal(player)
      }
      if (player.getPoint() === 21 || (player.getPoint() < 21 && player.getNoOfCards === 5)) {
        player.won = true
      } else if (player.getPoint() > 21) {
        player.won = false
      } else {
        while (this._dealer.getPoint() < this._dealerStop) {
          this.deal(this._dealer)
        }
        if ((this._dealer.getPoint() === 21) || (this._dealer.getPoint() > player.getPoint() &&
        this._dealer.getPoint() < 22)) {
          player.won = false
        } else {
          player.won = true
        }
      }
    }
  }

  deal (player) {
    player.aquireCard(this._playDeck.dealCard())
  }

  printResult () {
  }
}
