type GameStorageKeys = "highscore";

class GameStorage {
  private getKey(key: GameStorageKeys) {
    return `Back-To-That-Platform-I-Was-On-Before-Jumping:${key}`;
  }

  setItem(key: GameStorageKeys, value) {
    localStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  getItem(key: GameStorageKeys) {
    return JSON.parse(localStorage.getItem(this.getKey(key)));
  }

  clear() {
    localStorage.removeItem(this.getKey("highscore"));
  }
}

export const gameStorage = new GameStorage();
