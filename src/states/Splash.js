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
    this.load.image('Punch', './assets/images/upgradeIcon/iconPunch.png');
    this.load.image('Double Jump', './assets/images/upgradeIcon/iconDoubleJump.png');
    this.load.image('Slide', './assets/images/upgradeIcon/iconSlide.png');
    this.load.image('Shield', './assets/images/upgradeIcon/iconShield.png');
    this.load.image('Free Coin', './assets/images/upgradeIcon/iconFreeCoin.png');
    this.load.image('Pills', './assets/images/upgradeIcon/iconPills.png');
    this.load.image('coin', './assets/images/coin.png');
    this.load.image('harmlessCoin', './assets/images/harmlessCoin.png');
    this.load.image('punch', './assets/images/punch.png');
    this.load.image('breakableWall', './assets/images/harmlessCoin.png');
    this.load.image('bumper', './assets/images/bumper.png');
    //////
    this.load.image("List Upgrades",'./assets/images/buttons/upgradeListButton.png');
    /////

    // tilemap
    this.load.tilemap('level1_0', './assets/images/tilemap/level1_0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tilemap', './assets/images/tilemap/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset_test', './assets/images/tilemap/tileset_test.png');
    this.load.image('tileset', './assets/images/tilemap/tileset.png');

    //son
    this.load.audio('music', './assets/sons/musique1.mp3');
  }

  create () {
    this.state.start('MainMenu');
  }
}
