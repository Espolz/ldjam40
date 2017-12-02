/* globals __DEV__ */
import Phaser from 'phaser'

import Player, { playerProps } from '../sprites/Player'


export default class extends Phaser.State {

  init () {}
  preload () {}

  create () {
    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX, 
      y: this.game.world.centerY, 
      asset: "player"
    });
    this.game.add.existing(this.player);

  }

  update() {

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 16, 16);
      //this.game.debug.body(this.player);
    }
  }
}
