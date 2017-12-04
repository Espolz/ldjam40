/* globals __DEV__ */
import Phaser from 'phaser'

import Player, { playerProps } from '../sprites/Player'
import Ground, { groundProps } from '../sprites/Ground'
import Wall, { wallProps } from '../sprites/Wall'
import Coin, { coinProps } from '../sprites/Coin'
import HarmlessCoin, { harmlessCoinProps } from '../sprites/HarmlessCoin'
import BreakableWall, { breakableWallProps } from '../sprites/BreakableWall'
import Bumper, { bumperProps } from '../sprites/Bumper'

import * as tilemap from '../utils/tilemap'
import { randomRange } from '../utils'


export default class extends Phaser.State  {

  init () {}
  preload () {}

  create () {
    this.malusCpt = 0;
    this.oldWBounds = Object.assign({}, this.game.world.bounds);

    this.walls = this.game.add.group();
    this.platforms = this.game.add.group();

    this.coins = this.game.add.group();
    this.harmlessCoins = this.game.add.group();

    this.breakableWalls = this.game.add.group();
    this.bumpers = this.game.add.group();

    this.map = this.game.add.tilemap('tilemap');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tileset', 'tileset');

    //create layer
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.platformsLayer = this.map.createLayer('platformsLayer');
    this.wallsLayer = this.map.createLayer('wallsLayer');
    this.deadLayer = this.map.createLayer('deadLayer');
    //this.bumperLayer = this.map.createLayer('bumperLayer');
    //this.breakableWallsLayer = this.map.createLayer('breakableWallsLayer');

    this.map.setCollisionBetween(1, 600, true, 'platformsLayer');
    this.map.setCollisionBetween(1, 600, true, 'wallsLayer');
    this.map.setCollisionBetween(1, 600, true, 'deadLayer');
    //this.map.setCollisionBetween(1, 600, true, 'bumperLayer');
    //this.map.setCollisionBetween(1, 600, true, 'breakableWallsLayer');

    //resizes the game world to match the layer dimensions
    //tilemap.moveTilemapToXY(this.map, 250, 0);
    //this.backgroundLayer.resizeWorld();

    this.game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = new Player({
      game: this.game,
      x: 128,
      y: this.game.world.height-100,
      asset: "player"
    });
    this.game.add.existing(this.player);

    this.createCoins(3);
    this.createBreakableWalls();
    this.createBumpers();

    this.cursors = this.game.input.keyboard.createCursorKeys();

    // add jump press event
    this.cursors.up.onDown.add(this.controlJump, this);

    this.hitPlatforms = false;
    this.hitWalls = false;
    this.hitBreakableWalls = false;
    // this.punch = this.game.add.sprite(50, 0, "punch");
    // this.game.physics.arcade.enableBody(this.punch);
    // this.player.addChild(this.punch);



    this.musicJeu = game.add.audio('music', 0.3);

    this.musicJeu.play();
  }

  update() {
    // player collisions
    this.hitPlatforms = this.game.physics.arcade.collide(this.player, this.platformsLayer);

    this.hitWalls = this.game.physics.arcade.collide(this.player, this.wallsLayer);
    this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.game.physics.arcade.overlap(this.player, this.harmlessCoins, this.collectHarmlessCoin, null, this);
    this.game.physics.arcade.collide(this.player, this.deadLayer, () => this.dead(), null, this);
    this.game.physics.arcade.overlap(this.player, this.bumpers, () => this.player.bump(), null, this);
    this.hitBreakableWalls = this.game.physics.arcade.collide(this.player, this.breakableWalls, this.playerBreakWall, null, this);

    if (this.player.state.punch != null && this.player.state.punch.state.isAlive) {
      //this.game.physics.arcade.collide(this.player.state.punch, this.breakableWallsLayer, this.breakWall, null, this);
      this.game.physics.arcade.collide(this.player.state.punch, this.wallsLayer, () => this.player.state.punch.dead(), null, this);
      this.game.physics.arcade.collide(this.player.state.punch, this.platformsLayer, () => this.player.state.punch.dead(), null, this);
      this.game.physics.arcade.overlap(this.player.state.punch, this.breakableWalls, this.breakWall, null, this);

    }

    if ((this.hitPlatforms && this.player.body.blocked.down && this.player.state.canBump) || this.hitWalls || this.hitBreakableWalls) {
      this.player.land();
    }

    // this.punch.body.velocity.x = 0.1;
    // this.game.physics.arcade.collide(this.punch, this.breakableWallsLayer, this.breakWall, null, this);


    //this.controlCamera();
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    if (this.player.x + playerProps.width/2 < this.game.camera.x || this.player.y > this.game.world.height) {
      this.dead();
    }
    //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);



    if (this.cursors.right.isDown && !this.hitWalls) {
      if (this.player.state.right) {
        this.player.punch("right");
      } else if (this.player.state.left) {
        this.player.punch("left");
      }
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 16, 16);
      this.game.debug.bodyInfo(this.player, 16, 100);
      this.game.debug.text(`player coins : ${this.player.state.coins}, player malus : ${this.player.state.malus},  player jumpCount : ${this.player.state.jumpCount},  canJump : ${this.player.canJump()}, oldWBounds : ${this.oldWBounds.width}`, 16, 200);
      // if (this.player.state.punch != null && this.player.state.punch.state.isAlive) {
      //   this.game.debug.bodyInfo(this.player.state.punch, 16, 250);
      //   this.game.debug.body(this.player.state.punch);
      // }
      // this.game.debug.body(this.punch);
      // this.game.debug.bodyInfo(this.punch, 16, 250);
    }
  }

  controlCamera(cameraSpeed = playerProps.scrollSpeed.x)  {
    this.game.camera.x += cameraSpeed;
  }

  controlJump() {

    if (this.player.canJump()) {
      // player jump

      if ((this.hitWalls || this.hitBreakableWalls) && (this.player.body.touching.right || this.player.body.blocked.right || this.player.body.touching.left || this.player.body.blocked.left) ) { // player wall jump
        if (this.player.state.right) {
          this.player.jump(playerProps.wallJump.y);
          this.player.body.velocity.x = -playerProps.wallJump.x;
          this.player.state.right = !this.player.state.right;
          this.player.state.left = !this.player.state.left;
        } else if (this.player.state.left) {
          this.player.jump(playerProps.wallJump.y);
          this.player.body.velocity.x = playerProps.wallJump.x;
          this.player.state.right = !this.player.state.right;
          this.player.state.left = !this.player.state.left;
        }
      } else {
        this.player.jump();
      }
    }

  }

  createCoins(number) {
    if (number > 3) {
      number = 3;
    }

    let result = tilemap.findObjectsByType('coinSpawner', this.map, 'objectsLayer');
    let coin, rand, oldRands = [];


    for (let i = 0; i < number && i < result.length; i++) {
      do {
        rand = randomRange(0, result.length - 1);
      } while (oldRands.includes(rand));

      if (result[rand].properties.sprite == "coin") {
        coin = new Coin({
          game: this.game,
          x: result[rand].x,
          y: result[rand].y,
          asset: result[rand].properties.sprite
        });
        this.coins.add(coin);
      } else if (result[rand].properties.sprite == "harmlessCoin") {
        if (randomRange(1, 100) <= harmlessCoinProps.spawnLuck) {
          coin = new HarmlessCoin({
            game: this.game,
            x: result[rand].x,
            y: result[rand].y,
            asset: result[rand].properties.sprite
          });
          this.harmlessCoins.add(coin);
        } else if (number == 1) {
          number++;
        }
      }

      oldRands.push(rand);
    }
  }

  createBreakableWalls() {
    let result = tilemap.findObjectsByType('breakableWallSpawner', this.map, 'objectsLayer');
    result.forEach(wallElement => {
      this.createBreakableWallsFromTiledObject(wallElement, this.breakableWalls);
    });
  }

  createBumpers() {
    let result = tilemap.findObjectsByType('bumperSpawner', this.map, 'objectsLayer');
    result.forEach(bumperElement => {
      this.createBumperFromTiledObject(bumperElement, this.bumpers);
    });
  }



  createBreakableWallsFromTiledObject(element, group) {
    let bwall = new BreakableWall({
      game: this.game,
      x: element.x,
      y: element.y,
      asset: element.properties.sprite
    });

    group.add(bwall);
  }

  createBumperFromTiledObject(element, group) {
    let bumper = new Bumper({
      game: this.game,
      x: element.x,
      y: element.y,
      asset: element.properties.sprite
    });

    group.add(bumper);
  }

  collectCoin(player, coin) {
    coin.kill();
    player.updateCoins(1);
    if(player.state.marge > 0){
      player.state.marge--;
    }else{
      this.effectAdder();
      player.updateMalus(1);
    }
  }

  collectHarmlessCoin(player, coin) {
    coin.kill();
    player.updateCoins(1);
  }

  eatPill(player) {
    player.updateMarge(-2);
  }

  setFilter(min, max, index){
    if(this.malusCpt < this.player.state.effectList.length){
    if(this.player.state.effectList[index].isActivated == true){
      var temp_eff_found = false;
      for(var i = min; (temp_eff_found == false) && (i <= max); i++){
        if(this.player.state.effectList[i].isActivated == false){
          temp_eff_found = true;
          this.player.state.effectList[i].isActivated = true;
          this.player.state.effectList[i].effect();
        }
      }
    }else{
      this.player.state.effectList[index].isActivated = true;
      this.player.state.effectList[index].effect();
    }
    this.malusCpt++;
  }
  }

  effectAdder(){
      this.selector = randomRange(0, this.player.state.effectList.length-1);
      this.setFilter(0, this.player.state.effectList.length-1, this.selector);
  }

  reset() {
    this.game.world.setBounds(this.oldWBounds.x, this.oldWBounds.y, this.oldWBounds.width, this.oldWBounds.height);
  }

  dead() {
    this.reset();
    this.musicJeu.stop();
    this.state.start("GameOver");
  }

  breakWall(punch, breakableWall) {
    //this.map.removeTile(tile.x, tile.y, this.breakableWallsLayer).destroy();
    breakableWall.kill();
    this.player.knockBack(10);
  }

  playerBreakWall(player, tile) {
    if (this.player.state.punch !== null && this.player.state.punch.state.isAlive) {
      this.breakWall(null, tile);
    }
  }

  render(){
    this.game.debug.text("Test :" + this.selector, 16,16);
  }
}
