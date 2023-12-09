class Player {
  constructor(marker) {
    this._marker = marker;
    this._score = 0;
  }

  get marker() {
    return this._marker;
  }

  // set marker(newMarker) {
  //   this._marker = newMarker;
  // }

  get score() {
    return this._score;
  }

  incrementScore() {
    this._score++;
  }
}

module.exports = Player;
