/**
 * Module for Deck.
 *
 * @module src/Deck
 * @author Claes Weyde
 * @version 1.0.0
 */
'use strict'

const Card = require('./Card')

/**
 * Represents a Deck
 *
 * @class Deck
 */
class Deck {
  /**
   *Creates an instance of Deck.
   *
   * @memberof Deck
   * @constructor
   */
  constructor () {
    this.cards = []
  }

  /**
   * Creates a full set of 52 cards in the deck.
   *
   * @memberof Deck
   */
  createFullSetOfCards () {
    let i = 0
    while (i < 52) {
      if (i < 13) {
        this.cards[i] = new Card('\u2764', i + 1)
      } else if (i < 26) {
        this.cards[i] = new Card('\u2663', i - 12)
      } else if (i < 39) {
        this.cards[i] = new Card('\u2660', i - 25)
      } else {
        this.cards[i] = new Card('\u2666', i - 38)
      }
      i++
    }
  }

  /**
   * Shuffles the cards in the deck according to Fisher-Yates shuffle algorithm, the inspiration
   * for which was gotten from stackoverflow.com
   */
  shuffleCards () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  /**
   * Removes and returns a card from the deck, i.e. deals a card from the deck
   *
   * @returns {Card} card - an instance of Card
   * @memberof Deck
   */
  dealCard () {
    return this.cards.pop()
  }

  /**
   * Adds a card to the deck.
   *
   * @param {Card} card - an instance of a card object
   * @memberof Deck
   */
  addCard (card) {
    this.cards.push(card)
  }

  /**
   * Returns the number of cards currently in the deck.
   *
   * @returns {number} cards.length - the number of cards in the deck
   * @memberof Deck
   */
  length () {
    return this.cards.length
  }
}

module.exports = Deck
