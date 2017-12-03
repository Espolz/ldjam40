import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils';

export default class Player extends Phaser.Sprite {
	constructor ({ game, x, y, asset }) {
		super(game, x, y, asset);
		this.game.physics.arcade.enableBody(this);
		this.scale.setTo(playerProps.scale);
		this.body.gravity.y = playerProps.gravity.y;
		this.body.collideWorldBounds = true;
		this.body.velocity.x = playerProps.speed.x;

		this.state = {
			left: false,
			right: true,
			jumpCount: 0,
			bonus: {
				havePunch : false,
				haveSlide : false,
				haveDoubleJump : false,
				haveShield : false,
			},
			coins: 0,
			malus: 0
		};		

	}

	update() {
		this.body.velocity.x = this.state.right ? playerProps.speed.x : -playerProps.speed.x;
	}

	addBonus(bonus) {
		if (this.state.bonus.hasOwnProperty(bonus) && !this.state.bonus[bonus]) {
			this.state.bonus[bonus] = true;
		}
	}

	removeBonus(bonus) {
		if (this.state.bonus.hasOwnProperty(bonus) && this.state.bonus[bonus]) {
			this.state.bonus[bonus] = false;
		}
	}

	updateCoins(nbCoins) {
		this.state.coins += nbCoins;
	}

	updateMalus(nbMalus) {
		this.state.malus += nbMalus;
	}

	land() {
		this.state.jumpCount = 0;
	}

	canJump() {
		return this.state.jumpCount < playerProps.maxJumpNb;
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
	bumperJump: 600,  
	maxJumpNb: 2,
	gravity: {
		y: 1000
	},
	scrollSpeed: {
		x: 3
	},
	scale: 1
};

playerProps = spriteSizeFactory(playerProps, 32, 48);

export { playerProps };
