class AnimatedImage {
  constructor(imageBase, type, count, timer, repeat) {
    this.images = [];
    for (let i = 1; i <= count; i += 1) {
      this.images.push(loadImage(imageBase + i + type));
    }

    this.timer = timer || 0;
    this.currTime = timer || 0;
    this.currImg = 0;
    this.repeat = repeat;
  }

  draw(x, y, callback) {
    if (this.currTime === 0) {
      this.currTime = this.timer;
      this.currImg += 1;

      if (this.currImg === this.images.length) {
        this.currImg = this.repeat ? 0 : this.images.length - 1;
      }
    }
    this.currTime -= 1;
    image(this.images[this.currImg], x, y);

    if (callback) {
      callback(this.currImg);
    }
  }

  reset() {
    this.currTime = this.timer;
    this.currImg = 0;
  }
}
