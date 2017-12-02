import Phaser from 'phaser'

export default class Wall extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
  }
}

export const wallProps = {
	width: 32,
	height: 540
};