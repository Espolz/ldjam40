import Phaser from 'phaser'
import Upgrade from '../model/Upgrade'
import Player from '../sprites/Player'
import Game from './Game'

export default class extends Phaser.State {

  init () {
  }

  preload () {

  }
  create () {
    this.increaseGameLevel();
    this.player = this.game.state.states["Game"].player;
    this.game.upgrade5.isBuy = false;
    this.i = 0;
    this.createTextShop(game.world.centerX, game.world.centerY - 200);
    this.createTextUpgrade(game.world.centerX, game.world.centerY - 50);
    this.tabVarUpgrade = [this.game.upgrade1,this.game.upgrade2,this.game.upgrade3,this.game.upgrade4,this.game.upgrade5];
    this.nbCoinsTxt = this.createNbCoins(game.world.centerX + 300 , game.world.centerY - 200, "coin", this.game.nbCoinsPlayer);
    this.btn1 = this.createUpgradeButton(game.world.centerX-144, game.world.centerY, "Punch", () => this.buyUpgrade(this.game.upgrade1),this.i);
    this.btn2 = this.createUpgradeButton(game.world.centerX-72, game.world.centerY, "Slide", () => this.buyUpgrade(this.game.upgrade2),this.i);
    this.btn3 = this.createUpgradeButton(game.world.centerX, game.world.centerY, "Shield", () => this.buyUpgrade(this.game.upgrade3),this.i);
    this.btn4 = this.createUpgradeButton(game.world.centerX+72, game.world.centerY, "Double Jump", () => this.buyUpgrade(this.game.upgrade4),this.i);
    this.createUpgradeButton(game.world.centerX+144, game.world.centerY, "Pills", () => this.buyUpgrade(this.game.upgrade5),this.i);
    this.createButton(game.world.centerX, game.world.centerY + 200, "retryButton",
    function(){
      this.state.start('Game');
    });
    this.createButton(game.world.centerX, game.world.centerY + 127, "List Upgrades",
    function(){
      this.state.start('UpgradeList');
    });

    this.createScore(game.world.centerX-300, game.world.centerY-200, 420);
  }

  update () {
    for(var index = 0; index < game.tabUpgrade.length;  index++){
      if(this.tabVarUpgrade[index].isBuy == false){
        game.tabUpgrade[index].setText(this.game.costGlobal.toString() + " Coins");
      }else{
        game.tabUpgrade[index].setText("Sold Out");
      }
    }
  }

  createTextShop(x,y){
    var txtShop = game.add.text(x,y,"SHOP", {font:"40px Arial", fill :"#666", align:"center"});

    txtShop.anchor.setTo(0.5);
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

  createButton (x,y,name,callback) {

    var buttonRetry = game.add.button(x,y,name,callback,this,3,0);

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
        this.player.addBonus("have"+upgrade.name);
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
    this.game.debug.text("PlayerCoins :" + this.player.state.coins, 16,64);
    this.game.debug.text("costGlobal : " + this.game.costGlobal, 16, 32);
    this.game.debug.text("i : " + this.i, 16, 48);
    this.game.debug.text(`player djump: ${this.player.state.bonus.haveDoubleJump}`, 16, 100);
    this.game.debug.text(`upgrade4: ${this.game.upgrade4.name}`, 16, 130);
  }

  increaseGameLevel() {
    if (this.game.level < tilemap.mapsProps.length-1) {
      this.game.level++;
    }
  }
}
