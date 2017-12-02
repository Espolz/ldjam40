import Phaser from 'phaser'

export default class extends Phaser.State{

  create () {
    this.createButton(game.world.centerX, game.world.centerY, "playButton",
    function(){
      this.state.start('Game');
    });

    this.createButton(game.world.centerX, game.world.centerY + 100, "shopButton",
    function(){
      this.state.start('GameOver');
    });

    this.createControl (game.world.centerX + 300, game.world.centerY);

  }

  update () {

  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

    var txtPlay = game.add.text(button.x, button.y , name , {font:"26px Arial", fill :"#666", align:"right"});

    txtPlay.anchor.setTo(0.5);

  }

  createControl (x,y) {

    var controls = game.add.text(x,y,"CONTROL : \n Space : expendable \n Upper arrow : Jump", {font:"20px Arial", fill :"#666", align:"left"});
    controls.anchor.setTo(0.5);

  }

}
