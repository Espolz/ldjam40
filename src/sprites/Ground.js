import Phaser from 'phaser'

export default class Ground extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.scale.setTo(2, 1);
  }
}

export const groundProps = {
	width: 960,
	height: 32
};