import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image('player', './assets/images/pig.png');
    this.load.image('ground', './assets/images/ground.png');
    this.load.image('wall', './assets/images/wall.png');
    this.load.image('button','./assets/images/buttonVtest2.png');
    this.load.image('buttonRetry', './assets/images/buttonRetryVtest2.png');
    this.load.image('upgrade', './assets/images/iconUpgradeVtest.png');
    this.load.image('coins', './assets/images/piece');
  }

  create () {
    this.state.start('MainMenu');
  }
}
