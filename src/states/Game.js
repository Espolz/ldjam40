/* globals __DEV__ */
import Phaser from 'phaser'

import Player, { playerProps } from '../sprites/Player'
import Ground, { groundProps } from '../sprites/Ground'
import Wall, { wallProps } from '../sprites/Wall'
import Coin, { coinProps } from '../sprites/Coin'

import * as tilemap from '../utils/tilemap'
import { randomRange } from '../utils'

export default class extends Phaser.State  {

  init () {}
  preload () {}

  create () {

    this.walls = this.game.add.group();
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();

    this.map = this.game.add.tilemap('tilemap');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tileset', 'tileset');

    //create layer
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.platformsLayer = this.map.createLayer('platformsLayer');
    this.wallsLayer = this.map.createLayer('wallsLayer');

    this.map.setCollisionBetween(1, 600, true, 'platformsLayer');
    this.map.setCollisionBetween(1, 600, true, 'wallsLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundLayer.resizeWorld();


    // let ground = new Ground({
    //   game: this.game,
    //   x: 0,
    //   y: this.game.world.height-groundProps.height,
    //   asset: "ground"
    // });

    // this.platforms.add(ground);


    // let wall = new Wall({
    //   game: this.game,
    //   x: 0,
    //   y: 0,
    //   asset: "wall"
    // });
    // this.walls.add(wall);

    // wall = new Wall({
    //   game: this.game,
    //   x: this.game.world.width-wallProps.width,
    //   y :128,
    //   asset: "wall"
    // });
    // this.walls.add(wall);

    // wall = new Wall({
    //   game: this.game,
    //   x: this.game.world.width-200,
    //   y : -128,
    //   asset: "wall"
    // });
    // this.walls.add(wall);


    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: "player"
    });
    this.game.add.existing(this.player);

    this.createCoins(1);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    // player collisions
    let hitPlatforms = this.game.physics.arcade.collide(this.player, this.platformsLayer);
    let hitWalls = this.game.physics.arcade.collide(this.player, this.wallsLayer);


    // player jump
    if (this.cursors.up.isDown && this.player.body.blocked.down && hitPlatforms) {
      this.jump();
    }

    // player wall jump
    if  (this.cursors.up.isDown) {
      if (this.player.state.right && hitWalls) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = -playerProps.wallJump.x;
        this.player.state.right = !this.player.state.right;
        this.player.state.left = !this.player.state.left;
      } else if (this.player.state.left && hitWalls) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = playerProps.wallJump.x;
        this.player.state.right = !this.player.state.right;
        this.player.state.left = !this.player.state.left;
      }
    }
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 16, 16);
      this.game.debug.bodyInfo(this.player, 16, 100);
      //this.game.debug.text(`x: ${this.result[0].x}, y: ${this.result[0].y}, o: ${this.result}`, 16, 200);
    }
  }

  jump(value = playerProps.jump) {
      this.player.body.velocity.y = -value;
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

      coin = new Coin({
        game: this.game,
        x: result[rand].x,
        y: result[rand].y,
        asset: result[rand].properties.sprite
      });
      this.game.add.existing(coin);

      oldRands.push(rand);
    }
  }

}
