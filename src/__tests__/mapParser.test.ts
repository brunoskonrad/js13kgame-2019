import { parseMap } from "../mapParser";

describe("mapParser", () => {
  describe(".parseMap", () => {
    it("group platforms of the same type", () => {
      const fixture = `001110
001010`;

      expect(parseMap(fixture)).toEqual([
        { tileType: 1, x: 100, y: 0, width: 150, height: 50 },
        { tileType: 1, x: 100, y: 50, width: 50, height: 50 },
        { tileType: 1, x: 200, y: 50, width: 50, height: 50 }
      ]);
    });
  });
});
