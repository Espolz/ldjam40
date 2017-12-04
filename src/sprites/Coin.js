import Phaser from 'phaser'

export default class Coin extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
    this.animations.play('idle');
  }
}

export const coinProps = {
	width: 32,
	height: 32
};