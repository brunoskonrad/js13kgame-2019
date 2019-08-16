import { createPlatform } from "./platform";

export default class World {
  platforms: any[];

  loadMap(theMap) {
    this.platforms = [];

    theMap.forEach((row, columnIndex) => {
      row.forEach((item, rowIndex) => {
        if (item === 1) {
          this.platforms.push(createPlatform(rowIndex * 50, columnIndex * 50));
        }
      });
    });
  }

  update() {}

  render() {
    this.platforms.forEach(platform => platform.render());
  }
}
