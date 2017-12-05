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
    this.load.spritesheet('player', './assets/images/piggy.png', 32, 48);
    this.load.image('ground', './assets/images/ground.png');
    this.load.image('wall', './assets/images/wall.png');
    this.load.image('playButton','./assets/images/buttons/playButton.png');
    this.load.image('nextLevelButton', './assets/images/buttons/nextlevelButton.png');
    this.load.image('shopButton', './assets/images/buttons/shopButton.png');
    this.load.image('creditsButton', './assets/images/buttons/creditsButton.png');
    this.load.image('mainMenuButton', './assets/images/buttons/mainmenuButton.png');
    this.load.image('skipButton', './assets/images/buttons/skipButton.png');
    this.load.image('upgradesInfoButton', './assets/images/buttons/upgradesinfoButton.png');
    this.load.image('Punch', './assets/images/upgradeIcon/iconPunch.png');
    this.load.image('Punch get', './assets/images/upgradeIcon/iconPunchGet.png');
    this.load.image('Double Jump', './assets/images/upgradeIcon/iconDoubleJump.png');
    this.load.image('Double Jump get', './assets/images/upgradeIcon/iconDoubleJumpGet.png');
    this.load.image('Slide', './assets/images/upgradeIcon/iconSlide.png');
    this.load.image('Slide get', './assets/images/upgradeIcon/iconSlideGet.png');
    this.load.image('Shield', './assets/images/upgradeIcon/iconShield.png');
    this.load.image('Free Coin', './assets/images/upgradeIcon/iconFreeCoin.png');
    this.load.image('Pills', './assets/images/upgradeIcon/iconPills.png');
    this.load.image('iconCoin', './assets/images/iconCoin.png');


    this.load.spritesheet('coin', './assets/images/coin.png', 32, 32);
    this.load.spritesheet('harmlessCoin', './assets/images/harmlessCoin.png', 32, 32);
    this.load.spritesheet('punch', './assets/images/punch.png', 32, 32);
    this.load.spritesheet('breakableWall', './assets/images/breakableWall.png', 32, 32);
    this.load.spritesheet('bumper', './assets/images/bumper.png', 32, 32);
    this.load.spritesheet('shield', './assets/images/shield.png', 48, 48);
    this.load.image('creditsButton', './assets/images/buttons/playButton.png');
    //////
    this.load.image("List Upgrades",'./assets/images/buttons/upgradeListButton.png');
    /////

    // tilemap
    this.load.tilemap('level0_0', './assets/images/tilemap/level0_0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level1_0', './assets/images/tilemap/level1_0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2_0', './assets/images/tilemap/level2_0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3_0', './assets/images/tilemap/level3_0.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('tilemap', './assets/images/tilemap/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset_test', './assets/images/tilemap/tileset_test.png');
    this.load.image('tileset', './assets/images/tilemap/tileset.png');

    //son
    this.load.audio('gameMusic', './assets/sons/gameMusic.mp3');
    this.load.audio('saturateGameMusic', './assets/sons/saturateGameMusic.mp3');
    this.load.audio('coinSound', './assets/sons/coinSound.mp3');
    this.load.audio('jumpSound', './assets/sons/jumpSound.mp3');
    this.load.audio('shopMusic', './assets/sons/shopMusic.mp3');
    this.load.audio('screenshake', 'assets/sons/screenshake.mp3');
    this.load.audio('coinBurst', 'assets/sons/coinDecoys.mp3');
    this.load.audio('fireScreen', 'assets/sons/hellFire.mp3');
    this.load.audio('grayScreen', 'assets/sons/grayScreen.mp3');
    this.load.audio('lightBeam', 'assets/sons/lightBeam.mp3');
    this.load.audio('rainbowScreen', 'assets/sons/rainbowVision.mp3');
    this.load.audio('repetitiveFlash', 'assets/sons/whiteFlash.mp3');

    //Scripts JS
    game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Gray.js');
    game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Marble.js');
    game.load.script('lightBeam', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/LightBeam.js');
    game.load.script('fire', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js');
    game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js');
    game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js');

    //Video
    game.load.video('glitch', './assets/video/glitch.mp4')
    this.load.audio('musicIntro', './assets/sons/musicIntro.mp3');
  }

  create () {
    this.state.start('MainMenu');
  }
}
