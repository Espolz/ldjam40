/* globals __DEV__ */
import Phaser from 'phaser'

import Player, { playerProps } from '../sprites/Player'
import Ground, { groundProps } from '../sprites/Ground'
import Wall, { wallProps } from '../sprites/Wall'

export default class extends Phaser.State {

  init () {}
  preload () {}

  create () {

    
    this.walls = this.game.add.group();
    this.platforms = this.game.add.group();


    let ground = new Ground({
      game: this.game,
      x: 0,
      y: this.game.world.height-groundProps.height,
      asset: "ground"
    });
    this.platforms.add(ground);


    let wall = new Wall({
      game: this.game,
      x: 0,
      y: 0,
      asset: "wall"
    });
    this.walls.add(wall);

    wall = new Wall({
      game: this.game,
      x: this.game.world.width-wallProps.width,
      y :0,
      asset: "wall"
    });
    this.walls.add(wall);


    this.player = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: "player"
    });
    this.game.add.existing(this.player);


    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    // player collisions
    let hitPlatforms = this.game.physics.arcade.collide(this.player, this.platforms);
    let hitWalls = this.game.physics.arcade.collide(this.player, this.walls);

    // player movements
    this.player.body.velocity.x = 0;
    //this.player.body.acceleration.x = 0;

      // move lef and right
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -playerProps.speed.x;

      // right wall jump
      if (this.player.body.touching.right && hitWalls) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = -playerProps.wallJump.x;
      }
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = playerProps.speed.x;

      // left wall jump
      if (this.player.body.touching.left && hitWalls) {
        this.jump(playerProps.wallJump.y);
        this.player.body.velocity.x = playerProps.wallJump.x;
      }
    }

    // player jump
    if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatforms) {
      this.jump();
    }

  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 16, 16);
      //this.game.debug.body(this.player);
    }
  }

  jump(value = playerProps.jump) {
      this.player.body.velocity.y = -value;
  }
}
