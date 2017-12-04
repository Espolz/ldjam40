import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'
import Punch, { punchProps } from './Punch'

export default class Player extends Phaser.Sprite {
	constructor ({ game, x, y, asset }) {
		super(game, x, y, asset);
		this.game.physics.arcade.enableBody(this);
		this.scale.setTo(playerProps.scale);
		this.body.gravity.y = playerProps.gravity.y;
		//this.body.collideWorldBounds = true;
		this.body.velocity.x = playerProps.speed.x;

		//Adding the visual effects that will disturb the player
		var repetitiveFlash = {
			isActivated: false,
			effect: function(){ game.time.events.loop(Phaser.Timer.SECOND, function(){     game.camera.flash(0xffffff, 8000); }, this) } }
			var screenshake = {
			isActivated: false,
			effect: function(){game.time.events.loop(Phaser.Timer.SECOND, function(){ game.camera.shake(0.02, 300); }, this) } }

		var effectList = [repetitiveFlash, screenshake];
		this.state = {
			left: false,
			right: true,
			jumpCount: 0,
			canBump: true,
			bonus: {
				havePunch : false,
				haveSlide : false,
				haveDoubleJump : false,
				haveShield : false,
			},
			coins: 0,
			malus: 0,
			punch: null,
			effectList: effectList
		};


	}

	update() {
		this.body.velocity.x = this.state.right ? playerProps.speed.x : -playerProps.speed.x;

		if (this.state.punch !== null) {
			if (!this.state.punch.state.isAlive) {
				this.game.time.events.add(Phaser.Timer.SECOND * playerProps.punchChargeDelay, this.activePunch, this);
			} else {
				this.state.punch.body.velocity.x = 0.1 * (this.state.right ? 1 : -1);
			}
		}
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

	land(value = 0) {
		this.state.jumpCount = value;
	}

	canJump() {
		return this.state.jumpCount < playerProps.maxJumpNb;
	}

	punch(dir) {
		if (this.state.punch === null) {
			this.state.punch = new Punch({
				game: this.game,
				x: dir == "right" ? playerProps.punchDist + playerProps.width : -playerProps.punchDist - playerProps.width,
				y: playerProps.height/2 - punchProps.height/2,
				asset: "punch"
			});
			this.addChild(this.state.punch);
		}
	}

	activePunch() {
		this.state.punch = null;
	}

	knockBack(pixel = 10) {
		this.body.x += (this.state.right ? -pixel : pixel);
		if (this.state.punch !== null  && this.state.punch.state.isAlive) {
			this.state.punch.body.x += (this.state.right ? playerProps.punchDist/3 : -playerProps.punchDist/3);
		}
	}

	jump(value = playerProps.jump) {
      this.body.velocity.y = -value;
      this.state.jumpCount++;
 	}

	bump() {
		if (this.state.canBump) {
			this.state.canBump = false;
			this.land();
			this.jump(playerProps.bumperJump);
			this.game.time.events.add(Phaser.Timer.SECOND * playerProps.bumpDelay, () => this.state.canBump = true, this);
		}
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
	bumpDelay: 0.5,
	maxJumpNb: 2,
	gravity: {
		y: 1000
	},
	scrollSpeed: {
		x: 3
	},
	punchDist: 5,
	punchChargeDelay: 1,
	scale: 1,
};

playerProps = spriteSizeFactory(playerProps, 32, 48);

export { playerProps };
