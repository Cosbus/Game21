'use strict'

const Card = require('./Card')
const Player = require('./Player')
const Deck = require('./Deck')
const Dealer = require('./Dealer')

class Game {
  constructor (noOfPlayers = 1, playerStop = 17, dealerStop = 18) {
    this._noOfPlayers = noOfPlayers
    this._players = []
    this._dealer = new Dealer('Dealer', 18)
    this._playDeck = new Deck()
    this._throwDeck = new Deck()
    this._playerStop = playerStop
    this._dealerStop = dealerStop
    this._winner = undefined
    this._busted = 'none'
    this._noOfDealerWins = 0
    this._noOfPlayerWins = 0
    this.setUpGame()
    this.runGame()
  }

  setUpGame () {
    let i = 1
    while (i <= this._noOfPlayers) {
      this._players.push(new Player('Player #' + i, this._playerStop))
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
      this.playHand(this._players[element], this._dealer)
      this.printResult(this._players[element], this._dealer)
      this.throwCards(this._players[element])
      this.throwCards(this._dealer)
      this._busted = 'none'
      this._winner = ''
    }
    this.printStatistics()
  }

  playHand (player, dealer) {
    while ((player.getPoints() < player.getPlayerStop()) && (player.getNoOfCards() < 5)) {
      this.deal(player)
      if (player.getHighPoints() === 21) {
        this._winner = player.getName()
        this._noOfPlayerWins++
        break
      }
    }

    if (this._winner !== player.getName()) {
      if (player.getPoints() === 21 || (player.getPoints() < 21 && player.getNoOfCards() === 5)) {
        this._winner = player.getName()
        this._noOfPlayerWins++
      } else if (player.getPoints() > 21) {
        this._winner = dealer.getName()
        this._busted = 'player'
        this._noOfDealerWins++
      } else {
        while (dealer.getPoints() < dealer.getPlayerStop()) {
          this.deal(dealer)
          if (dealer.getHighPoints() === 21) {
            this._winner = dealer.getName()
            this._noOfDealerWins++
            break
          }
        }
        if ((dealer.getPoints() === 21) || (dealer.getPoints() > player.getPoints() &&
        dealer.getPoints() < 22)) {
          this._winner = dealer.getName()
          this._noOfDealerWins++
        } else if (dealer.getPoints() === player.getPoints()) {
          this._winner = 'Draw! No one'
        } else {
          this._winner = player.getName()
          this._noOfPlayerWins++
          if (dealer.getPoints() > 21) {
            this._busted = 'dealer'
          }
        }
      }
    }
  }

  throwCards (player) {
    while (player.getNoOfCards() > 0) {
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
    try {
      player.aquireCard(this._playDeck.dealCard())
    } catch (error) { console.log(error.message) }
  }

  printResult (player, dealer) {
    let playerCards = player.getCards()
    let playerString = player.getName() + ': '
    for (let element in playerCards) { playerString += playerCards[element].toString() + ' ' }
    if (player.getHighPoints() === 21) {
      playerString += '(' + player.getHighPoints().toString() + ') '
    } else playerString += '(' + player.getPoints().toString() + ') '
    if (this._busted === 'player') playerString += 'BUSTED!'

    let dealerCards = dealer.getCards()
    let dealerString = dealer.getName() + '   : '
    if (dealerCards.length === 0) {
      dealerString += '- '
    } else {
      for (let element in dealerCards) { dealerString += dealerCards[element].toString() + ' ' }
      dealerString += '(' + dealer.getPoints().toString() + ') '
    }
    if (this._busted === 'dealer') dealerString += 'BUSTED!'
    console.log(`${playerString}\n${dealerString}\n${this._winner.toString()} wins!\n`)
  }

  printStatistics () {
    console.log(`-------------------------------\nHere, using ${this._players.length} players, ${this._playerStop} as limit for the players and ${this._dealerStop}
as limit for the dealer the players won ${Math.round((this._noOfPlayerWins / this._players.length) * 100)} % of the time.`)
  }
}

module.exports = Game
