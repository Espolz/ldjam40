import Phaser from 'phaser'
import { playerProps } from './Player'


export default class Punch extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.game.time.events.add(Phaser.Timer.SECOND * punchProps.punchTime, this.dead, this);

    this.state = {
    	isAlive: true
    }
  }

  dead() {
  	this.state.isAlive = false;
  	if (this.parent) this.parent.removeChild(this);
  	this.kill();
  }
}

export const punchProps = {
	width: 32,
	height: 32,
	punchTime: 1
};