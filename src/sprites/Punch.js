import Phaser from 'phaser'
import { playerProps } from './Player'


export default class Punch extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.timer = this.game.time.events.add(Phaser.Timer.SECOND * punchProps.punchTime, this.dead, this).timer;
    this.anchor.set(0.5);
    this.animations.add('punching', [0, 1, 2, 3], 10, true);
    this.animations.play('punching');

    this.state = {
    	isAlive: true
    }
  }

  dead() {
  	this.state.isAlive = false;
  	this.animations.stop();
  	this.destroy();
  }
}

export const punchProps = {
	width: 32,
	height: 32,
	punchTime: 1
};