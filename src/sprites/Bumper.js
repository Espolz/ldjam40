import Phaser from 'phaser'

export default class Bumper extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.animations.add('bump', [1, 2, 3, 4, 5], 20, false);
    this.frame = 1;
  }
}

export const bumperProps = {
	width: 32,
	height: 32
};