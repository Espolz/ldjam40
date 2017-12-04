import Phaser from 'phaser'

export default class extends Phaser.State {

  create (){
    this.createButton (game.world.centerX, game.world.centerY + 200, "mainMenu", function(){
      this.state.start('MainMenu');
    });
    this.createTitle(game.world.centerX, game.world.centerY-200, "Developers");
    this.createName(game.world.centerX, game.world.centerY-170, "Romain DELION");
    this.createName(game.world.centerX, game.world.centerY-150, "Lucas DESNOUE");
    this.createName(game.world.centerX, game.world.centerY-130, "Téo HAYS");
    this.createName(game.world.centerX, game.world.centerY-110, "Luc LE GALL");
    this.createTitle(game.world.centerX, game.world.centerY-80, "Game/Level design");
    this.createName(game.world.centerX, game.world.centerY-50, "Nathan ARAGO");
    this.createName(game.world.centerX, game.world.centerY-30, "Romain DELION");
    this.createName(game.world.centerX, game.world.centerY-10, "Lucas DESNOUE");
    this.createName(game.world.centerX, game.world.centerY+10, "Téo HAYS");
    this.createName(game.world.centerX, game.world.centerY+30, "Luc LE GALL");
    this.createTitle(game.world.centerX, game.world.centerY+60, "Graphics");
    this.createName(game.world.centerX, game.world.centerY+90, "Nathan ARAGO");
  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

    var txt = game.add.text(button.x, button.y , name , {font:"26px Arial", fill :"#666", align:"right"});

    txt.anchor.setTo(0.5);
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
