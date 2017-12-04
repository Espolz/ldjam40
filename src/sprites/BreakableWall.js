import Phaser from 'phaser'

export default class BreakableWall extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enableBody(this);
    this.body.immovable = true;
    this.animations.add("destroy", [0, 1, 2, 3, 4, 5, 6, 7], 90, false);
  }

  update() {
  	if (this.frame == 7) {
  		this.kill();	
  	}
  }

  dead() {
  	this.animations.play("destroy");
  }
}

export const breakableWallProps = {
	width: 32,
	height: 32
};