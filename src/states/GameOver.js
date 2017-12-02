import Phaser from 'phaser'

export default class extends Phaser.State{

  create () {
    this.createTextGameOver(game.world.centerX, game.world.centerY - 200);
    this.createTextUpgrade(game.world.centerX, game.world.centerY - 50);
    this.createUpgradeButton(game.world.centerX-128, game.world.centerY, "upgrade");
    this.createUpgradeButton(game.world.centerX-64, game.world.centerY, "upgrade");
    this.createUpgradeButton(game.world.centerX, game.world.centerY, "upgrade");
    this.createUpgradeButton(game.world.centerX+64, game.world.centerY, "upgrade");
    this.createUpgradeButton(game.world.centerX+128, game.world.centerY, "upgrade");
    this.createButtonRetry(game.world.centerX, game.world.centerY + 200, "buttonRetry",
    function(){
      this.state.start('Game');
    });
    this.createNbCoins (game.world.centerX - 200 , game.world.centerY - 200, "coins", 50);
  }


  update () {

  }

  createTextGameOver(x,y){
    var txtGameOver = game.add.text(x,y,"GAME OVER", {font:"40px Arial", fill :"#666", align:"center"});

    txtGameOver.anchor.setTo(0.5);
  }

  createTextUpgrade(x,y){
    var txtTitleUpgrade = game.add.text(x,y,"UPGRADES", {font:"25px Arial", fill :"#666", align:"center"});

    txtTitleUpgrade.anchor.setTo(0.5);
  }

  createUpgradeButton (x,y,name) {
    var buttonUpgrade = game.add.button(x,y,name,null,this,1,0);

    buttonUpgrade.anchor.setTo(0.5);
    buttonUpgrade.width = 32;
    buttonUpgrade.height = 32;

    var txtUpgrade = game.add.text(buttonUpgrade.x,buttonUpgrade.y + 30, name, {font:"12px Arial", fill :"#666", align:"center"});

    txtUpgrade.anchor.setTo(0.5);

  }

  createButtonRetry (x,y,name,callback) {

    var buttonRetry = game.add.button(x,y,name,callback,this,2,0);

    buttonRetry.anchor.setTo(0.5);
    buttonRetry.width = 370;
    buttonRetry.height = 50;

    var txtRetry = game.add.text(buttonRetry.x, buttonRetry.y ,"Retry", {font:"20px Arial", fill :"#666", align:"right"});

    txtRetry.anchor.setTo(0.5);

  }

  createNbCoins (x,y,name, nbCoins){

    var spriteCoins = game.add.sprite(x,y,name);
    spriteCoins.width = 32;
    spriteCoins.height = 32;

    var txtCoins = game.add.text(spriteCoins.x,spriteCoins.y+100, nbCoins.toString(), {font:"12px Arial", fill :"#666", align:"right"});

    spriteCoins.anchor.setTo(0.5);
    txtCoins.anchor.setTo(0,5);
  }

}
