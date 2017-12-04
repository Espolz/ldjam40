import Phaser from 'phaser'

export default class extends Phaser.State {

  create (){
    this.createButton (game.world.centerX, game.world.centerY + 200, "mainMenuButton", function(){
      this.state.start('MainMenu');
    });
    this.createTitle(game.world.centerX, game.world.centerY-220, "Developers");
    this.createName(game.world.centerX, game.world.centerY-190, "Romain DELION");
    this.createName(game.world.centerX, game.world.centerY-170, "Lucas DESNOUE");
    this.createName(game.world.centerX, game.world.centerY-150, "Téo HAYS");
    this.createName(game.world.centerX, game.world.centerY-130, "Luc LE GALL");
    this.createTitle(game.world.centerX, game.world.centerY-100, "Game/Level design");
    this.createName(game.world.centerX, game.world.centerY-70, "Nathan ARAGO");
    this.createName(game.world.centerX, game.world.centerY-50, "Romain DELION");
    this.createName(game.world.centerX, game.world.centerY-30, "Lucas DESNOUE");
    this.createName(game.world.centerX, game.world.centerY-10, "Téo HAYS");
    this.createName(game.world.centerX, game.world.centerY+10, "Luc LE GALL");
    this.createTitle(game.world.centerX, game.world.centerY+40, "Graphics");
    this.createName(game.world.centerX, game.world.centerY+70, "Nathan ARAGO");
    this.createTitle(game.world.centerX, game.world.centerY+100, "Sound");
    this.createName(game.world.centerX, game.world.centerY+130, "Romain DELION");
  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;
  }

  createName (x,y, txtCredits) {
    var txt = game.add.text(x, y , txtCredits , {font:"17px Arial", fill :"#666", align:"center"});
    txt.anchor.setTo(0.5);
  }

  createTitle (x,y, txtCredits) {
    var txt = game.add.text(x, y , txtCredits , {font:"26px Arial", fill :"#666", align:"center"});
    txt.anchor.setTo(0.5);
  }
}
