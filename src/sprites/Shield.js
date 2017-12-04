import Phaser from 'phaser'
import { playerProps } from './Player'


export default class Shield extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.anchor.set(0.5);
    this.animations.add('block', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 20, true);
    this.animations.play('block');
  }

  invicibilityFrame() {
    this.game.time.events.add(Phaser.Timer.SECOND * shieldProps.invFrameTime, this.dead, this);
  }

  dead() {
  	this.animations.stop();
    if (this.parent) this.parent.state.canShield = true;
    if (this.parent) this.parent.state.bonus.haveShield = false;
    if (this.parent) this.parent.state.shield = null;
    this.kill();
  }
}

export const shieldProps = {
	width: 32,
	height: 32,
	invFrameTime: 1,
};
