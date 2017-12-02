import Phaser from 'phaser'

export default class HarmlessCoin extends Coin {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
  }
}

export const coinProps = {
	width: 32,
	height: 32
};