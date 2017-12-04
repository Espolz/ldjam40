import Phaser from 'phaser'

export default class Bumper extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
  }
}

export const bumperProps = {
	width: 32,
	height: 32
};