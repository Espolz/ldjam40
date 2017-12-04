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
		var repetitiveFlash = { isActivated: false, effect: function(){var fx = game.add.audio('repetitiveFlash'); fx.play(); game.camera.flash(0xffffff, 1000); this.timer = game.time.events.loop(Phaser.Timer.SECOND*2.5, function(){ game.camera.flash(0xffffff, 1000); }, this) }}

		var screenshake = { isActivated: false, effect: function(){var fx = game.add.audio('screenshake'); fx.play(); this.timer = game.time.events.loop(Phaser.Timer.SECOND, function(){ game.camera.shake(0.05, 999); }, this) }}

		var grayScreen = { isActivated: false, effect: function(){var fx = game.add.audio('grayScreen'); fx.play(); var gray = game.add.filter('Gray'); game.world.filters = [gray]; }}

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

	this.effectList = [coinBurst, grayScreen, repetitiveFlash, fireScreen, lightBeam, rainbowScreen, screenshake];

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
		marge: 0,
		punch: null,
		effectList: this.effectList
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

updateMarge(nbMarge) {
	this.state.marge += nbMarge;
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
