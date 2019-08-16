export default class GameObject {
  sprite: any;

  constructor(sprite) {
    this.sprite = sprite;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  get width() {
    return this.sprite.width;
  }

  get height() {
    return this.sprite.height;
  }

  update() {
    this.sprite.update();
  }

  render() {
    this.sprite.render();
  }
}
