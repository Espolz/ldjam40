import Phaser from 'phaser'

export default class extends Phaser.State{

  create () {
    this.createButton(game.world.centerX, game.world.centerY+200, "playButton",
    function(){
      this.game.score.last = 0;
      if(this.game.canIntro){
        this.state.start('Intro');
      } else {
        this.state.start('Game');
      }
    });

    this.createButtonCredits(game.world.centerX+300, game.world.centerY+225, "creditsButton",
    function(){
      this.state.start('Credits');
    })



    this.createTitle(game.world.centerX, game.world.centerY-100);

    this.createScore(game.world.centerX-325, game.world.centerY-200, "High score : " + this.game.score.max );
    this.createScore(game.world.centerX+300, game.world.centerY-200, "Score : " + this.game.score.last);
  }

  update () {

  }

  createButton (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 370;
    button.height = 50;

  }

  createButtonCredits (x,y,name,callback) {

    var button = game.add.button(x,y,name,callback,this,2,0);

    button.anchor.setTo(0.5);
    button.width = 140;
    button.height = 50;

  }

  createTitle (x,y) {
    var controls = game.add.text(x,y,"Greedy Piggy Bank", {font:"100px Arial", fill :"#666", align:"left"});
    controls.anchor.setTo(0.5);
  }

  createScore (x,y,score) {
    var controls = game.add.text(x,y,score, {font:"25px Arial", fill :"#666", align:"left"});
    controls.anchor.setTo(0.5);
  }
}
