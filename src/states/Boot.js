import Phaser from 'phaser'
//import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.game.nbCoinsPlayer = 900
    this.game.costGlobal = 10
    this.game.txtUpgradePrice = 0
    this.game.tabUpgrade = []
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
