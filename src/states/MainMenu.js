import Phaser from 'phaser'

export default class extends Phaser.State{
  create () {

  }

  update () {

  }

  createButton () {
    var buttonPlay = game.add.button(x,y,'Play',callback,this,1,0);
    var buttonControls = game.add.button(x,y,'Controls',callback,this,2,0);

    button.anchor.setTo(this.world.width/2, this.world.height/4);
    button.width = 370;
    button.height = 50;

  }
}
