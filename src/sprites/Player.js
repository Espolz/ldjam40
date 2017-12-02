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
			right: true
		};

		//Upgrades
		this.coins = 0;
		this.state = {
			havePunch : false,
			noPunch : true
		};
		this.state = {
			haveSlide : false,
			noSlide : true
		};
		this.state = {
			haveDoubleJump : false,
			noDoubleJump : true
		};

		this.state = {
			haveShield : false,
			noShield : true
		};


	}

	update() {
		this.body.velocity.x = this.state.right ? playerProps.speed.x : -playerProps.speed.x
	}

//BONUS
	addPunch() {
		if (this.state.noPunch){
			this.state.havePunch = !this.state.havePunch;
			this.state.noPunch = !this.state.noPunch;
		}
		return this.state.havePunch;
	}

	removePunch() {
		if (this.state.havePunch){
			this.state.havePunch = !this.state.havePunch;
			this.state.noPunch = !this.state.noPunch;
		}
		return this.state.havePunch;

	}

	addSlide() {
		if (this.state.noSlide){
			this.state.haveSlide = !this.state.haveSlide;
			this.state.noSlide = !this.state.noSlide
		}
		return this.state.haveSlide;
	}

	removeSlide() {
		if (this.state.haveSlide){
			this.state.haveSlide = !this.state.haveSlide;
			this.state.noSlide = !this.state.noSlide;
		}
		return this.state.haveSlide;
	}

	addShield() {
		if (this.state.noShield){
			this.state.haveShield = !this.state.haveShield;
			this.state.noShield = !this.state.noShield;
		}
		return this.state.haveShield;
	}

	removeShield() {
		if (this.state.haveShield){
			this.state.haveShield = !this.state.haveShield;
			this.state.noShield = !this.state.noShield;
		}
		return this.state.haveShield;
	}

	addDoubleJump() {
		if (this.state.noDoubleJump){
			this.state.haveDoubleJump = !this.state.haveDoubleJump;
			this.state.noDoubleJump = !this.state.noDoubleJump;
		}
		return this.state.haveDoubleJump;
	}

	removeDoubleJump() {
		if (this.state.haveDoubleJump){
			this.state.haveDoubleJump = !this.state.haveDoubleJump;
			this.state.noDoubleJump = !this.state.noDoubleJump;
		}
		return this.state.haveDoubleJump;
	}

	addFreeCoins() {
		this.coins += 1;
	}

	addRevome2Coins() {
		this.coins -= 2;
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
