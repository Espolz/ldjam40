import Phaser from 'phaser'

export default class extends Phaser.State{

  create () {
    this.createButton(game.world.centerX, game.world.centerY+200, "shopButton",
  function(){
    this.state.start('GameOver');
  });
    this.createImage(game.world.centerX-400, game.world.centerY-200, "Punch", "PUNCH : You can hit a wall or any decor element to break it , cooldown : 5s");
    this.createImage(game.world.centerX-400, game.world.centerY-125, "Slide", "SLIDE : You can slide below decor element, cooldown : 5s");
    this.createImage(game.world.centerX-400, game.world.centerY-50, "Shield", "SHIELD : You have a shield, who protect you versus spikes, after a hit, you lost him");
    this.createImage(game.world.centerX-400, game.world.centerY+25, "Double Jump", "DOUBLE JUMP : You can make a another an anther jump after yo make it" );
    this.createImage(game.world.centerX-400, game.world.centerY+100, "Pills","PILLS : You can take 2 coins without malus");
  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

    var txt = game.add.text(button.x, button.y , name , {font:"26px Arial", fill :"#666", align:"right"});

    txt.anchor.setTo(0.5);
  }

  createImage (x,y,name,txt){

    var image = game.add.image(x,y,name);
    image.anchor.setTo(0.5);

    var txt = game.add.text(image.x + 50, image.y , txt , {font:"18px Arial", fill :"#666", align:"right"});
    txt.anchor.setTo(0.5);


  }

}
