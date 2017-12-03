/* globals __DEV__ */
import Phaser from 'phaser'

import Player, { playerProps } from '../sprites/Player'
import Ground, { groundProps } from '../sprites/Ground'
import Wall, { wallProps } from '../sprites/Wall'
import Coin, { coinProps } from '../sprites/Coin'
import HarmlessCoin, { harmlessCoinProps } from '../sprites/HarmlessCoin'

import * as tilemap from '../utils/tilemap'
import { randomRange } from '../utils'


export default class extends Phaser.State  {

  init () {}
  preload () {}

  create () {
    this.oldWBounds = Object.assign({}, this.game.world.bounds);

    this.walls = this.game.add.group();
    this.platforms = this.game.add.group();

    this.coins = this.game.add.group();
    this.harmlessCoins = this.game.add.group();

    this.map = this.game.add.tilemap('tilemap');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tileset', 'tileset');

    //create layer
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.platformsLayer = this.map.createLayer('platformsLayer');
    this.wallsLayer = this.map.createLayer('wallsLayer');
    this.deadLayer = this.map.createLayer('deadLayer');
    this.bumperLayer = this.map.createLayer('bumperLayer');

    this.map.setCollisionBetween(1, 600, true, 'platformsLayer');
    this.map.setCollisionBetween(1, 600, true, 'wallsLayer');
    this.map.setCollisionBetween(1, 600, true, 'deadLayer');
    this.map.setCollisionBetween(1, 600, true, 'bumperLayer');

    //resizes the game world to match the layer dimensions
    //tilemap.moveTilemapToXY(this.map, 250, 0);
    //this.backgroundLayer.resizeWorld();

    this.game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.player = new Player({
      game: this.game,
      x: 10,
      y: 10,
      asset: "player"
    });
    this.game.add.existing(this.player);

    this.createCoins(3);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // add jump press event
    this.cursors.up.onDown.add(this.controlJump, this);

    this.hitPlatforms = false;
    this.hitWalls = false;
  }

  update() {
    // player collisions
    this.hitPlatforms = this.game.physics.arcade.collide(this.player, this.platformsLayer);
    this.hitWalls = this.game.physics.arcade.collide(this.player, this.wallsLayer);
    this.game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.game.physics.arcade.overlap(this.player, this.harmlessCoins, this.collectHarmlessCoin, null, this);
    this.game.physics.arcade.collide(this.player, this.deadLayer, () => this.dead(), null, this);
    this.game.physics.arcade.collide(this.player, this.bumperLayer, () => this.jump(playerProps.bumperJump), null, this);

    if ((this.hitPlatforms && this.player.body.blocked.down) || this.hitWalls) {
      this.player.land();
    } 

    this.controlCamera();
    //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    if (this.player.x + playerProps.width/2 < this.game.camera.x) {
        this.dead();
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 16, 16);
      this.game.debug.bodyInfo(this.player, 16, 100);
      this.game.debug.text(`player coins : ${this.player.state.coins}, player malus : ${this.player.state.malus},  player jumpCount : ${this.player.state.jumpCount},  canJump : ${this.player.canJump()}, oldWBounds : ${this.oldWBounds.width}`, 16, 200);
    }
  }

  controlCamera(cameraSpeed = playerProps.scrollSpeed.x)  {
    this.game.camera.x += cameraSpeed;
  }

  jump(value = playerProps.jump) {
      this.player.body.velocity.y = -value;
      this.player.state.jumpCount++;  
  }

  controlJump() {
    // player jump
    if ((this.player.body.blocked.down && this.hitPlatforms) || this.player.canJump()) {
      this.jump();
    } 

    // player wall jump
    if (this.hitWalls) {
      if (this.player.state.right) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = -playerProps.wallJump.x;
        this.player.state.right = !this.player.state.right;
        this.player.state.left = !this.player.state.left;
      } else if (this.player.state.left) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = playerProps.wallJump.x;
        this.player.state.right = !this.player.state.right;
        this.player.state.left = !this.player.state.left;
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

  collectCoin(player, coin) {
    coin.kill();
    player.updateCoins(1);
    player.updateMalus(1);
  }

  collectHarmlessCoin(player, coin) {
    coin.kill();
    player.updateCoins(1);
  }

  reset() {
    this.game.world.setBounds(this.oldWBounds.x, this.oldWBounds.y, this.oldWBounds.width, this.oldWBounds.height);    
  }

  dead() {
    this.player.kill();
    this.reset();
    this.state.start("GameOver", true, false, this.player);
  }
}


