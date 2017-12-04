import Phaser from 'phaser'

export default class extends Phaser.State {

  create () {
    this.musicIntro = game.add.audio('musicIntro');
    this.musicIntro.play();
    this.createButton(game.world.centerX, game.world.centerY + 200, "skipButton",
    function(){
      this.game.canIntro=false;
      this.musicIntro.stop();
      this.state.start('Game');
    });
    this.createTextIntro(game.world.centerX, game.world.centerY -100);

  }

  createTextIntro (x,y) {
    var txt = game.add.text(x, y , "Once upon a time, a pig loves money,\n is greediness make him to become a piggy bank and \n start to him, a kind of hallucination" , {font:"30px Arial", fill :"#666", align:"center"});
    txt.anchor.setTo(0.5);
  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

    var txt = game.add.text(button.x, button.y , name , {font:"26px Arial", fill :"#666", align:"right"});

    txt.anchor.setTo(0.5);
  }
}
