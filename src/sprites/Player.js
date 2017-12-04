import Phaser from 'phaser'
import { spriteSizeFactory } from '../utils'
import Punch, { punchProps } from './Punch'
import Shield, { shieldProps } from './Shield'

export default class Player extends Phaser.Sprite {
	constructor ({ game, x, y, asset }) {
		super(game, x, y, asset);
		this.game.physics.arcade.enableBody(this);
		this.scale.setTo(playerProps.scale);
		this.body.gravity.y = playerProps.gravity.y;
		//this.body.collideWorldBounds = true;
		this.body.velocity.x = playerProps.speed.x;
		this.anchor.set(0.5);

		// add some animations
		this.animations.add('idle', [15, 16, 17, 18], 5, true);
		this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 15, true);
		this.animations.add('slide', [10, 11, 12, 13], 10, true);


		//Adding the visual effects that will disturb the player
		var repetitiveFlash = {
			isActivated: false,
			effect: function(){ game.time.events.loop(Phaser.Timer.SECOND, function(){     game.camera.flash(0xffffff, 8000); }, this) } }
			var screenshake = {
			isActivated: false,
			effect: function(){game.time.events.loop(Phaser.Timer.SECOND, function(){ game.camera.shake(0.02, 300); }, this) } }

		var effectList = [repetitiveFlash, screenshake];
		this.state = {
			prev: {
				x: x,
				y: y
			},
			left: false,
			right: true,
			jumpCount: 0,
			canBump: true,
			canShield: true,
			isSlide: false,
			bonus: {
				havePunch : true,
				haveSlide : true,
				haveDoubleJump : true,
				haveShield : true,
			},
			coins: 0,
			malus: 0,
			punch: null,
			shield: null,
			effectList: effectList
		};

	}

	update() {
		this.body.velocity.x = this.state.right ? playerProps.speed.x : -playerProps.speed.x;
		this.scale.set((this.state.right ? playerProps.scale : -playerProps.scale), playerProps.scale);


		if (this.state.punch) {
			if (!this.state.punch.state.isAlive) {
				this.game.time.events.add(Phaser.Timer.SECOND * playerProps.punchChargeDelay, this.activePunch, this);
			}
			if (this.state.isSlide) {
				this.state.punch.dead();
			}
		}

		this.enableShield();
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
		return this.state.jumpCount < (this.state.bonus.haveDoubleJump ? playerProps.maxJumpNb : 1);
	}

	punch(dir) {
		if (this.state.bonus.havePunch && !this.state.punch && !this.state.isSlide) {
			this.state.punch = new Punch({
				game: this.game,
				x: dir == "right" ? playerProps.punchDist + playerProps.width/2 : -playerProps.punchDist - playerProps.width/2 - punchProps.width,
				y: 0,
				asset: "punch"
			});
			this.addChild(this.state.punch);
		}
	}

	enableShield() {
		if (this.state.bonus.haveShield && this.state.canShield) {
			this.state.canShield = false;
			this.state.shield = new Shield({
				game: this.game,
				x: 0,
				y: 0,
				asset: "shield"
			});
			this.addChild(this.state.shield);
		}
	}

	disableShield() {
		if (this.state.bonus.haveShield && !this.state.canShield) {
			this.state.shield.invicibilityFrame();
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
      this.animations.stop();
      this.frame = 14;
 	}

	bump(player, bumper) {
		if (this.state.canBump) {
			bumper.animations.play('bump');
			this.state.canBump = false;
			this.land();
			this.jump(playerProps.bumperJump);
			this.game.time.events.add(Phaser.Timer.SECOND * playerProps.bumpDelay, () => this.state.canBump = true, this);
		}
	}

	enableSlide() {
		if (this.state.bonus.haveSlide && !this.state.isSlide) {
			this.state.isSlide = true;
			this.angle += this.state.right ? 90 : -90;
			this.body.setSize(playerProps.height, playerProps.width/2, -8, 24);
		}
	}

	disableSlide() {
		if (this.state.bonus.haveSlide && this.state.isSlide) {
			this.state.isSlide = false;
			this.angle -= this.state.right ? 90 : -90;	
			this.body.setSize(playerProps.width, playerProps.height, 0, 0);
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
		x: 3.5
	},
	punchDist: 5,
	punchChargeDelay: 1,
	scale: 1,
};

playerProps = spriteSizeFactory(playerProps, 32, 48);

export { playerProps };
