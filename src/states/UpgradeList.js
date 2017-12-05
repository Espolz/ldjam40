import Phaser from 'phaser'

export default class extends Phaser.State{

  create () {
    this.createButton(game.world.centerX, game.world.centerY+200, "shopButton",
  function(){
    this.state.start('GameOver');
  });
    this.createImage(game.world.centerX-400, game.world.centerY-200, "Punch", "PUNCH : You can hit a breakable wall to break it , cooldown : 1s");
    this.createImage(game.world.centerX-400, game.world.centerY-125, "Slide", "SLIDE : You can slide to reach hidden areas, cooldown : 5s");
    this.createImage(game.world.centerX-400, game.world.centerY-50, "Shield", "SHIELD : Grants you a non-reusable shield against spikes");
    this.createImage(game.world.centerX-400, game.world.centerY+25, "DoubleJump", "DOUBLE JUMP : Jump a second time when you're in the air !" );
    this.createImage(game.world.centerX-400, game.world.centerY+100, "Pills","PILLS : Negates the effects of the first two coins you'll collect.");
  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;
  }

  createImage (x,y,name,txt){

    var image = game.add.image(x,y,name);
    image.anchor.setTo(0.5);

    var txt = game.add.text(image.x + 50, image.y , txt , {font:"18px Arial", fill :"#666", align:"left"});
    txt.anchor.setTo(0.5);


  }

}
