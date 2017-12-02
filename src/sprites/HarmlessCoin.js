import Phaser from 'phaser'
import Coin from './Coin';

export default class HarmlessCoin extends Coin {
  constructor ({ game, x, y, asset }) {
    super({game, x, y, asset});
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
  }
}

export const harmlessCoinProps = {
	width: 32,
	height: 32,
	spawnLuck: 0
};