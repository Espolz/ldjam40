import Phaser from 'phaser'
import Upgrade from '../model/Upgrade'
import Player from '../sprites/Player'

export default class extends Phaser.State {

  init () {

  }

  preload () {

  }
  create () {
    this.i = 0;
    //this.player = game.state.states['Game'].player;
    var tabUpgrade = [];
    var upgrade1 = new Upgrade(this.game.costGlobal,"Punch");
    var upgrade2 = new Upgrade(this.game.costGlobal,"Slide");
    var upgrade3 = new Upgrade(this.game.costGlobal,"Shield");
    var upgrade4 = new Upgrade(this.game.costGlobal,"DoubleJump");
    var upgrade6 = new Upgrade(2,"Pills");
    this.createTextGameOver(game.world.centerX, game.world.centerY - 200);
    this.createTextUpgrade(game.world.centerX, game.world.centerY - 50);
    this.nbCoinsTxt = this.createNbCoins(game.world.centerX + 300 , game.world.centerY - 200, "coin", this.game.nbCoinsPlayer);
    this.createUpgradeButton(game.world.centerX-144, game.world.centerY, "Punch", () => this.buyUpgrade(upgrade1),this.i);
    this.createUpgradeButton(game.world.centerX-72, game.world.centerY, "Slide", () => this.buyUpgrade(upgrade2),this.i);
    this.createUpgradeButton(game.world.centerX, game.world.centerY, "Shield", () => this.buyUpgrade(upgrade3),this.i);
    this.createUpgradeButton(game.world.centerX+72, game.world.centerY, "Double Jump", () => this.buyUpgrade(upgrade4),this.i);
    this.createUpgradeButton(game.world.centerX+144, game.world.centerY, "Pills", () => this.buyUpgrade(upgrade6),this.i);
    this.createButtonRetry(game.world.centerX, game.world.centerY + 200, "retryButton",
    function(){
      this.state.start('Game');
    });
    this.createScore(game.world.centerX-300, game.world.centerY-200, 420);
  }

  update () {
    for(var index = 0; index < game.tabUpgrade.length;  index++){
      game.tabUpgrade[index].setText(this.game.costGlobal.toString() + " Coins");
    }
  }

  createTextGameOver(x,y){
    var txtGameOver = game.add.text(x,y,"GAME OVER", {font:"40px Arial", fill :"#666", align:"center"});

    txtGameOver.anchor.setTo(0.5);
  }

  createTextUpgrade(x,y){
    var txtTitleUpgrade = game.add.text(x,y,"UPGRADES", {font:"25px Arial", fill :"#666", align:"center"});

    txtTitleUpgrade.anchor.setTo(0.5);
  }

  createUpgradeButton (x,y,name, callback, i) {

    if (name != "Pills"){
    var buttonUpgrade = game.add.button(x,y,name,callback,this,1,0);

    buttonUpgrade.anchor.setTo(0.5);
    buttonUpgrade.width = 32;
    buttonUpgrade.height = 32;

    var txtUpgrade = game.add.text(buttonUpgrade.x,buttonUpgrade.y + 40, name, {font:"12px Arial", fill :"#666", align:"center"});
    game.tabUpgrade[i] = game.add.text(buttonUpgrade.x,buttonUpgrade.y + 60, this.game.costGlobal + " Coins", {font:"12px Arial", fill :"#666", align:"center"});
    txtUpgrade.anchor.setTo(0.5);
    game.tabUpgrade[i].anchor.setTo(0.5);
    this.i++
  }else{
    var buttonUpgrade = game.add.button(x,y,name,callback,this,1,0);

    buttonUpgrade.anchor.setTo(0.5);
    buttonUpgrade.width = 32;
    buttonUpgrade.height = 32;

    var txtUpgrade = game.add.text(buttonUpgrade.x,buttonUpgrade.y + 40, name, {font:"12px Arial", fill :"#666", align:"center"});
    var txtUpgradePills = game.add.text(buttonUpgrade.x,buttonUpgrade.y + 60, 2 + " Coins", {font:"12px Arial", fill :"#666", align:"center"});
    txtUpgrade.anchor.setTo(0.5);
    txtUpgradePills.anchor.setTo(0.5);
  }
  }

  createButtonRetry (x,y,name,callback) {

    var buttonRetry = game.add.button(x,y,name,callback,this,2,0);

    buttonRetry.anchor.setTo(0.5);
    buttonRetry.width = 370;
    buttonRetry.height = 50;

    var txtRetry = game.add.text(buttonRetry.x, buttonRetry.y , name, {font:"20px Arial", fill :"#666", align:"right"});

    txtRetry.anchor.setTo(0.5);

  }

  createNbCoins (x,y,name, nbCoins){

    var spriteCoins = game.add.sprite(x,y,name);
    spriteCoins.width = 32;
    spriteCoins.height = 32;

    var txtCoins = game.add.text(spriteCoins.x+50,spriteCoins.y, nbCoins + " Coins", {font:"20px Arial", fill :"#666", align:"right"});

    spriteCoins.anchor.setTo(0.5);
    txtCoins.anchor.setTo(0.5);
    return txtCoins;
  }

  buyUpgrade(upgrade){
    if(!upgrade.isBuy){
    if (((this.game.nbCoinsPlayer - this.game.costGlobal) >= 0) && (upgrade.name != "Pills")){
    this.game.nbCoinsPlayer -= this.game.costGlobal;
    this.nbCoinsTxt.setText(this.game.nbCoinsPlayer + " Coins");
    //this.player.addBonus("have"+upgrade.nom);
    this.game.costGlobal += 5;
    upgrade.isBuy = true;
  } else {
    this.game.nbCoinsPlayer -= upgrade.cost;
    this.nbCoinsTxt.setText(this.game.nbCoinsPlayer + " Coins");
    upgrade.isBuy = true;
  }
  }
  }

  createScore (x,y, nbScore){

    var txtScore = game.add.text(x,y,"Score : " + nbScore,  {font:"20px Arial", fill :"#666", align:"right"})

    txtScore.anchor.setTo(0.5);
  }

  addNbCoins(nbCoins){
    this.game.nbCoinsPlayer += nbCoins;
  }

  render () {
    this.game.debug.text("Test :" + this.game.nbCoinsPlayer, 16,16);
    //this.game.debug.text("PlayerCoins :" + this.player.state.coins, 16,64);
    this.game.debug.text("costGlobal : " + this.game.costGlobal, 16, 32);
    this.game.debug.text("i : " + this.i, 16, 48);
  }
}
