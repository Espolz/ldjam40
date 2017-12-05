import Phaser from 'phaser'
import Upgrade from '../model/Upgrade'
//import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {

    this.game.canIntro = true;
    this.stage.backgroundColor = '#B3E5FC';
    this.game.nbCoinsPlayer = 900;
    this.game.costGlobal = 10;
    this.game.txtUpgradePrice = 0;
    this.game.tabUpgrade = [];
    this.game.level = 0;
    this.game.score = {
      last: 0,
      max: 0
    };
    this.game.upgrade1 = new Upgrade(this.game.costGlobal,"Punch");
    this.game.upgrade2 = new Upgrade(this.game.costGlobal,"Slide");
    this.game.upgrade4 = new Upgrade(2,"Shield");
    this.game.upgrade3 = new Upgrade(this.game.costGlobal,"DoubleJump");
    this.game.upgrade5 = new Upgrade(2,"Pills");

    this.game.tabUpgradeImg = [];
    this.game.PillsEffect = 0;
    // this.fontsReady = false
    // this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    // WebFont.load({
    //   google: {
    //     families: ['Bangers']
    //   },
    //   active: this.fontsLoaded
    // })

    // let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    // text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  render () {
    //if (this.fontsReady) {
      this.state.start('Splash');
    //}

  }

  // fontsLoaded () {
  //   this.fontsReady = true
  // }
}
