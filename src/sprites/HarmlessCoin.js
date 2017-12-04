import Phaser from 'phaser'
import Coin from './Coin';

export default class HarmlessCoin extends Coin {
  constructor ({ game, x, y, asset }) {
    super({game, x, y, asset});
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
    this.animations.play('idle');
  }
}

export const harmlessCoinProps = {
	width: 32,
	height: 32,
	spawnLuck: 100
};