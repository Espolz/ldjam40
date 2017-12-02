import Phaser from 'phaser'

export default class extends Phaser.State{
  create () {
    this.createButton(game.world.centerX, game.world.centerY, "button",
    function(){
      this.state.start('Game');
    });

    this.createControl (game.world.centerX + 300, game.world.centerY);

  }

  update () {

  }

  createButton (x,y,name,callback) {
    var button = game.add.button(x,y,name,callback,this,1,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;



  }

  createControl (x,y) {
    var controls = game.add.text(x,y,"Space : expendable \n Upper arrow : Jump", {font:"26px Arial", fill :"#666", align:"right"});

    controls.anchor.setTo(0.5);
  }


}
