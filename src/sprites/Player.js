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

		// add music
		this.game.gameMusic = this.game.add.audio('gameMusic', 0.3, true);
		this.game.saturateGameMusic = this.game.add.audio('saturateGameMusic', 0.6, true);
		this.game.coinSound = this.game.add.audio('coinSound', 0.4, false);
		this.game.jumpSound = this.game.add.audio('jumpSound', 0.08, false);
		this.game.shopMusic = this.game.add.audio('shopMusic', 0.3, true);







		//Adding the visual effects that will disturb the player
		var repetitiveFlash = { isActivated: false, effect: function(){var fx = game.add.audio('repetitiveFlash'); fx.play(); game.camera.flash(0xffffff, 1000); this.timer = game.time.events.loop(Phaser.Timer.SECOND*2.5, function(){ game.camera.flash(0xffffff, 1000); }, this) }}

		var screenshake = { isActivated: false, effect: function(){var fx = game.add.audio('screenshake'); fx.play(); this.timer = game.time.events.loop(Phaser.Timer.SECOND, function(){ game.camera.shake(0.05, 999); }, this) }}

		var grayScreen = { isActivated: false, effect: function(){var fx = game.add.audio('grayScreen'); fx.play(); var gray = game.add.filter('Gray'); game.world.filters = [gray]; }}

		var badMusic = {
			isActivated: false,
			effect: function(){
				game.gameMusic.stop();
				game.saturateGameMusic.play();
				var fx = game.add.audio('badMusic'); fx.play();
			}
		}

		var rainbowScreen = {
			isActivated: false,
			effect: function(){
				var marble = game.add.filter('Marble', 960, 540);
				var bg = game.add.sprite(0,0);
				bg.width = 960;
				bg.height = 540;
				marble.speed = 1;
				marble.alpha = 0.4;
				marble.intensity = 0.1;
				bg.filters = [marble];
				var fx = game.add.audio('rainbowScreen'); fx.play();
				game.time.events.loop(5, function(){ marble.update(); }, this);
			} }

var lightBeam = {
	isActivated: false,
	effect: function(){
		var lightbeam_bg = game.add.sprite(0, 0);
		lightbeam_bg.width = 960;
		lightbeam_bg.height = 540;

		var lightBeam_effect = game.add.filter('LightBeam', 960, 540);

		//	You have the following values to play with (defaults shown):
		lightBeam_effect.alpha = 0.05;
		// filter.red = 1.0;
		lightBeam_effect.green = 0.2;
		lightBeam_effect.blue = 0.2;
		// filter.thickness = 70.0;
		lightBeam_effect.speed = 2.0;
		var fx = game.add.audio('lightBeam'); fx.play();
		lightbeam_bg.filters = [lightBeam_effect];
		game.time.events.loop(5, function(){ lightBeam_effect.update(); }, this);
	} }

	var fireScreen = {
		isActivated: false,
		effect: function(){
			var bg_fire = game.add.sprite(0,0);
			bg_fire.width = 960;
			bg_fire.height = 540;

			var fire_effect = game.add.filter('Fire', 960, 540);
			fire_effect.alpha = 0.05;
			fire_effect.intensity = 0.05;
			bg_fire.filters = [fire_effect];
			var fx = game.add.audio('fireScreen'); fx.play();
			game.time.events.loop(3, function(){fire_effect.update();}, this);
		} }

	var coinBurst = {
		isActivated: false,
		effect: function(){
			//	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    var emitter = game.add.emitter(this.x+700, 200, 200);
    //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    emitter.width = 1000;
    emitter.makeParticles('coin');
    emitter.minParticleSpeed.set(0, 300);
    emitter.maxParticleSpeed.set(0, 400);
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.9, 0.9);
    emitter.setScale(1, 1, 1, 1);
    emitter.gravity = -200;
    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
		var fx = game.add.audio('coinBurst'); fx.play();
    emitter.start(false, 3000, 100);
	}.bind(this) }

	 var effectList = [coinBurst, grayScreen, repetitiveFlash, fireScreen, lightBeam, rainbowScreen, screenshake, badMusic];


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
				havePunch : false,
				haveSlide : false,
				haveDoubleJump : false,
				haveShield : false,
			},
			coins: 0,
			malus: 0,
			marge: 0,
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
	this.game.coinSound.play();
}

updateMalus(nbMalus) {
	this.state.malus += nbMalus;
}

updateMarge(nbMarge) {
	this.state.marge += nbMarge;
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
			this.game.jumpSound.play();
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
