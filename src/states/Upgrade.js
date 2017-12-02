import Phaser from 'phaser'

export default class extends Phaser.State{

  constructor(cost, name) {
    super();
    this.cost = cost;
    this.name = name;
  }
}
