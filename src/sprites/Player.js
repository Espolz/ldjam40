import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils';



export default class Player extends Phaser.Sprite {
	constructor ({ game, x, y, asset }) {
		super(game, x, y, asset);
		this.game.physics.arcade.enableBody(this);
		this.scale.setTo(playerProps.scale);
		this.body.gravity.y = playerProps.gravity.y;
		this.body.collideWorldBounds = true;
	}
} 

let playerProps = {
	speed: {
		x: 225,
	},
	wallJump: {
		x: 1000,
		y: 500
	},
	jump: 425,
	gravity: {
		y: 1000
	},
	scale: 1
};

playerProps = spriteSizeFactory(playerProps, 32, 48);

export { playerProps };