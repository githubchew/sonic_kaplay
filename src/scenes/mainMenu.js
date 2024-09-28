import k from "../kaplayCtx.js";
import { makeSonic } from "../entities/sonic.js";
export default function mainMenu() {
  if (!k.getData("best-score")) k.setData("best-score", 0);
  k.onButtonPress("jump", () => k.go("game"));

  const bgPieceWidth = 1920;
  const bgPieces = [
    k.add([
      k.sprite("chemical-bg"),
      k.pos(0, 0),
      k.scale(2),
      k.opacity(0.7),
      // k.area(),
    ]),
    k.add([
      k.sprite("chemical-bg"),
      k.pos(bgPieceWidth * 2, 0),
      k.scale(2),
      k.opacity(0.7),
    ]),
  ];

  const platformWidth = 1280;
  const platforms = [
    k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
    k.add([k.sprite("platforms"), k.pos(platformWidth * 4, 450), k.scale(4)]),
  ];

  k.add([
    k.text("Sonic Ring Run" , { font: "mania", size: 96 }  ),
    k.pos(k.center()),
    k.anchor("center"),
   ]    );

 k.add([
  k.text("Best Score: " ),
  k.pos(100,100),
  k.anchor("left"),

])


  makeSonic(k.vec2(200, 745));

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

//59mins
