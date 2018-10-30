/**
 * Module for app. Starting point of the application.
 *
 * @module app
 * @author Claes Weyde
 * @version 1.0.0
 */
'use strict'

const Game = require('./src/Game')

let game = new Game(40, 17, 18)

try {
  game.runGame()
} catch (e) {
  console.error(e.message)
}
