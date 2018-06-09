export default class Raf {
  constructor() {
    this.RAF = null;
    this.callback = null;
    this.isRunning = false;
  }

  subscribe(callback) {
    if (typeof callback !== 'function') return;

    this.callback = callback;
  }

  unsubscribe() {
    this.callback = null;
    this.stop();
  }

  start() {
    if (this.callback === null || this.isRunning) return;

    this.tick();
    this.isRunning = true;
  }

  stop() {
    if (!this.RAF || !this.isRunning) return;

    window.cancelAnimationFrame(this.RAF);
    this.RAF = null;
    this.isRunning = false;
  }

  tick() {
    this.callback();
    this.RAF = window.requestAnimationFrame(this.tick.bind(this));
  }
}
