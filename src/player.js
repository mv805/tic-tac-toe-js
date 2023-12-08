class Player {
  constructor(marker) {
    this._marker = marker;
    this._wins = 0;
  }

  get marker() {
    return this._marker;
  }

  // set marker(newMarker) {
  //   this._marker = newMarker;
  // }

  get wins() {
    return this._wins;
  }

  addWin() {
    this._wins++;
  }
}

module.exports = Player;