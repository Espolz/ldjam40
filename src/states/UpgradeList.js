import Phaser from 'phaser'

export default class extends Phaser.State{

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

    var txtPlay = game.add.text(button.x, button.y , name , {font:"26px Arial", fill :"#666", align:"right"});

    txtPlay.anchor.setTo(0.5);

  }
}
