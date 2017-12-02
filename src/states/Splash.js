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
    this.load.image('playButton','./assets/images/buttons/playButton.png');
    this.load.image('retryButton', './assets/images/buttons/retryButton.png');
    this.load.image('shopButton', './assets/images/buttons/shopButton.png');
    this.load.image('upgrade1', './assets/images/upgradeIcon/iconUpgrade1.png');
    this.load.image('upgrade2', './assets/images/upgradeIcon/iconUpgrade2.png');
    this.load.image('upgrade3', './assets/images/upgradeIcon/iconUpgrade3.png');
    this.load.image('upgrade4', './assets/images/upgradeIcon/iconUpgrade4.png');
    this.load.image('upgrade5', './assets/images/upgradeIcon/iconUpgrade5.png');
    this.load.image('upgrade6', './assets/images/upgradeIcon/iconUpgrade6.png');
    this.load.image('coin', './assets/images/coin.png');
    this.load.image('harmlessCoin', './assets/images/harmlessCoin.png');

    // tilemap
    this.load.tilemap('tilemap', './assets/images/tilemap/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', './assets/images/tilemap/tileset.png');
  }

  create () {
    this.state.start('MainMenu');
  }
}
