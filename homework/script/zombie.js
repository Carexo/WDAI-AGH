function gerRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Zombie {
  // TODO add Z layer to zombie
  static BASE_ZOMBIE_DIMENSIONS = {
    width: 200,
    height: 312,
  };

  static MIN_SCALE = 1.5;
  static MAX_SCALE = 3;
  static MIN_DISTANCE = 0;
  static MAX_DISTANCE = 300;

  constructor(x, canvasHeight) {
    const distance = gerRandomNumber(Zombie.MIN_DISTANCE, Zombie.MAX_DISTANCE);
    const scale = this.mapDistanceToScale(distance);
    this._x = x;
    this._y =
      canvasHeight -
      Zombie.BASE_ZOMBIE_DIMENSIONS.height / (scale + 1) -
      distance;

    this.scale = scale;
    this.speed = (1 / scale) * 1.5;
    this.animationFrame = gerRandomNumber(0, 9);
  }

  mapDistanceToScale(distance) {
    return (
      Zombie.MIN_SCALE +
      ((distance - Zombie.MIN_DISTANCE) /
        (Zombie.MAX_DISTANCE - Zombie.MIN_DISTANCE)) *
        (Zombie.MAX_SCALE - Zombie.MIN_SCALE)
    );
  }

  get width() {
    return Zombie.BASE_ZOMBIE_DIMENSIONS.width / this.scale;
  }

  get height() {
    return Zombie.BASE_ZOMBIE_DIMENSIONS.height / this.scale;
  }

  get animationSpeed() {
    return Math.floor(20 / this.scale);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  move() {
    this._x -= this.speed;
  }

  nextFrame() {
    this.animationFrame++;
    if (this.animationFrame > 9) {
      this.animationFrame = 0;
    }
  }
}
