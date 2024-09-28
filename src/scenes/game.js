import { makeSonic } from "../entities/sonic.js";
import k from "../kaplayCtx.js";

export default function game() {
  k.setGravity(3000);

  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),

    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth, 0),
      k.scale(2),
      k.opacity(0.8),
    ]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
  ];

  const sonic = makeSonic(k.vec2(200, 745));

  k.add([
    k.rect(1920, 300),
    k.opacity(0),
    k.area(),
    k.pos(0, 830),
    k.body({ isStatic: true }),
  ]);

  k.onUpdate(() => {
    if (bgPieces[1].pos.x < 0) {
      //  bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2.9, 0);
      bgPieces.push(bgPieces.shift());
    }
    bgPieces[0].move(-20, 0);
    bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2.01, 0);

    if (platforms[1].pos.x < 0) {
      platforms.push(platforms.shift());
    }
    platforms[0].move(-300, 0);
    platforms[1].moveTo(platforms[0].pos.x + platformWidth * 4.1, 450);
  });
}
