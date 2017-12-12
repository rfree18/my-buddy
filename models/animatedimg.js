class AnimatedImage {

  /*
    imageBase: base url that all images in the animation contains
      note that this assumes that files are named imageBase1.type, imageBase2.type, etc.
    type: the image type extension. this must be the same for all images
    count: the number of images in the animation
    timer: the time (in frames) between frames
    repeat: whether or not the animation should repeat
  */
  constructor(imageBase, type, count, timer, repeat) {
    this.images = [];

    // Load images from 1 to count
    for (let i = 1; i <= count; i += 1) {
      this.images.push(loadImage(imageBase + i + type));
    }

    // Timer stores the initial value set
    this.timer = timer || 0;
    // currTime indicates the current time in the timer
    this.currTime = timer || 0;
    // Current image we are using
    this.currImg = 0;
    this.repeat = repeat;
  }

  draw(x, y, callback) {
    if (this.currTime === 0) {
      // Advance to next frame in animation and reset currTime
      this.currTime = this.timer;
      this.currImg += 1;

      if (this.currImg === this.images.length) {
        // Set to correct image depending on whether or not repeat is set
        this.currImg = this.repeat ? 0 : this.images.length - 1;
      }
    }
    this.currTime -= 1;
    image(this.images[this.currImg], x, y);

    if (callback) {
      // Send the current frame number to the callback
      // This is most often used to detect when an animation is complete
      callback(this.currImg);
    }
  }

  // Resets animation
  reset() {
    this.currTime = this.timer;
    this.currImg = 0;
  }
}
