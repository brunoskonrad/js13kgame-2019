import Platform from "./Platform";

export default class World {
  platforms: Platform[];

  loadMap(theMap) {
    this.platforms = [];

    theMap.forEach((row, columnIndex) => {
      row.forEach((item, rowIndex) => {
        if (item === 1) {
          this.platforms.push(new Platform(rowIndex * 50, columnIndex * 50));
        }
      });
    });
  }

  update() {}

  render() {
    this.platforms.forEach(platform => platform.render());
  }
}
