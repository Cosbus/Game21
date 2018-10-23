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
    this._winner = undefined
    this._busted = 'none'
    this.setUpGame()
    this.runGame()
  }

  setUpGame () {
    let i = 1
    while (i <= this._noOfPlayers) {
      this._players.push(new Player('Player #' + i))
      i++
    }
    this._playDeck.createFullSetOfCards()
    this._playDeck.shuffleCards()
  }

  runGame () {
    // Deal one card for each player initially
    for (let element in this._players) {
      this.deal(this._players[element])
    }
    // Play each player in turn
    for (let element in this._players) {
      while ((this._players[element].getPoint() < this._playerStop) && (this._players[element].getNoOfCards() <= 5)) {
        this.deal(this._players[element])
      }
      if (this._players[element].getPoint() === 21 || (this._players[element].getPoint() < 21 && this._players[element].getNoOfCards === 5)) {
        this._winner = this._players[element].getName()
      } else if (this._players[element].getPoint() > 21) {
        this._winner = this._dealer.getName()
        this._busted = 'player'
      } else {
        while (this._dealer.getPoint() < this._dealerStop) {
          this.deal(this._dealer)
        }
        if ((this._dealer.getPoint() === 21) || (this._dealer.getPoint() > this._players[element].getPoint() &&
        this._dealer.getPoint() < 22)) {
          this._winner = this._dealer.getName()
        } else {
          this._winner = this._players[element].getName()
          if (this._dealer.getPoint() > 21) {
            this._busted = 'dealer'
          }
        }
      }
      this.printResult(this._players[element])
      this.throwCards(this._players[element])
      this.throwCards(this._dealer)
      this._busted = 'none'
      this._winner = ''
    }
  }

  throwCards (player) {
    for (let i = 1; i <= player.getNoOfCards(); i++) {
      this._throwDeck.addCard(player.throwCard())
    }
  }

  deal (player) {
    if (this._playDeck.length() < 2) {
      this._throwDeck.addCard(this._playDeck.dealCard())
      for (let i = 1; i <= this._throwDeck.length(); i++) {
        this._playDeck.addCard(this._throwDeck.dealCard())
      }
      this._playDeck.shuffleCards()
    }
    player.aquireCard(this._playDeck.dealCard())
  }

  printResult (player) {
    let playerCards = player.getCards()
    let playerString = player.getName() + ': '
    for (let element in playerCards) { playerString += playerCards[element].toString() + ' ' }
    playerString += '(' + player.getPoint().toString() + ') '
    if (this._busted === 'player') playerString += 'BUSTED!'

    let dealerCards = this._dealer.getCards()
    let dealerString = this._dealer.getName() + ': '
    if (dealerCards.length === 0) {
      dealerString += '- '
    } else {
      for (let element in dealerCards) { dealerString += dealerCards[element].toString() + ' ' }
      dealerString += '(' + this._dealer.getPoint().toString() + ') '
    }
    if (this._busted === 'dealer') dealerString += 'BUSTED!'
    console.log(`${playerString}\n${dealerString}\n${this._winner.toString()} wins!\n`)
  }
}

module.exports = Game
