import { createPlatform } from "./entities/platform";
import { BASE_SIZE } from "./constants";

export type MapPieces = {
  tileType: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const NOTHING_TYPE = 0;
export const PLATFORM_TYPE = 1;

export function parseMap(rawMap: string) {
  const lines = rawMap.trim().split("\n");
  let pieces = [];

  lines.forEach((line, columnIndex) => {
    const itemsInLine = line.split("");
    let piece: Piece = null;

    itemsInLine.forEach((item, index) => {
      if (item !== "0") {
        if (!piece) {
          piece = new Piece(item, index, columnIndex);
        }

        piece.add();
      } else {
        if (piece) {
          pieces.push(piece.mapPieces);
          piece = null;
        }
      }
    });

    if (piece) {
      pieces.push(piece.mapPieces);
      piece = null;
    }
  });

  return pieces;
}

export function parsePlatforms(mapPieces: MapPieces[]) {
  return mapPieces
    .filter(piece => piece.tileType === 1)
    .map(piece => {
      return createPlatform(piece.x, piece.y, piece.width, piece.height);
    });
}

class Piece {
  private type: string;
  private x: number;
  private y: number;
  private quantity = 0;

  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
  }

  add() {
    this.quantity++;
  }

  get mapPieces(): MapPieces {
    return {
      tileType: Number(this.type),
      x: this.x * BASE_SIZE,
      y: this.y * BASE_SIZE,
      width: this.quantity * BASE_SIZE,
      height: BASE_SIZE
    };
  }
}
