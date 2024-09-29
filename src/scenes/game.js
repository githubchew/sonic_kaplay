import { makeSonic } from "../entities/sonic.js";
import { makeMotobug } from "../entities/motobug.js";
import { makeRing } from "../entities/ring.js";
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

  let score = 0;

  let ringsCollected = 0;
  let scoreMultiplier = 0;

  const scoreText = k.add([
    k.text("Score: " + score, { size: 60 }),
    k.pos(20, 20),
  ]);

  const sonic = makeSonic(k.vec2(200, 745));
  sonic.setControls();
  sonic.setEvents();
  sonic.onCollide("enemy", (enemy) => {
    if (!sonic.isGrounded()) {
      k.play("destroy", { volume: 0.1 });
      k.play("hyper-ring", { volume: 0.1 });
      k.destroy(enemy);
      sonic.play("jump");
      sonic.jump();
      scoreMultiplier += 1;
      score += 2 * scoreMultiplier;
      scoreText.text = "Score: " + score;
      if (scoreMultiplier === 1) sonic.ringCollectUI.text = "+2";
      if (scoreMultiplier > 1)
        sonic.ringCollectUI.text = `X${scoreMultiplier} bugs`;
      k.wait(1, () => {
        sonic.ringCollectUI.text = "";
      });
      return;
      //TODO
    }

    k.play("hurt", { volume: 0.1 });
    k.setData("current-score", score);

    k.go("gameover");
  });
  sonic.onCollide("ring", (ring) => {
    k.play("ring", { volume: 0.1 });
    k.destroy(ring);
    score++;
    ringsCollected++;
    scoreText.text = "Score: " + score;
    sonic.ringCollectUI.text = `${ringsCollected} ${
      ringsCollected === 1 ? "ring" : "rings"
    } `;
    k.wait(1, () => {
      sonic.ringCollectUI.text = "";
    });
  });
  const spawnMotobug = () => {
    const motobug = makeMotobug(k.vec2(2000, 775));
    motobug.onUpdate(() => {
      motobug.move(-450, 0);
    });

    motobug.onExitScreen(() => {
      if (motobug.pos.x < 0) k.destroy(motobug);
    });

    const waitTime = k.rand(9.5, 20.5);
    k.wait(waitTime, spawnMotobug);
  };

  //spawn motobug2
  const spawnMotobug2 = () => {
    const motobug2 = makeMotobug(k.vec2(2000, 675));
    motobug2.onUpdate(() => {
      motobug2.move(-400, 0);
    });

    motobug2.onExitScreen(() => {
      if (motobug2.pos.x < 0) k.destroy(motobug2);
    });

    const waitTime = k.rand(4.5, 10.5);
    k.wait(waitTime, spawnMotobug2);
  };
  //-------------------------------------------------------
  spawnMotobug();
  spawnMotobug2();

  const spawnRing = () => {
    const ring = makeRing(k.vec2(2000, 775));
    ring.onUpdate(() => {
      ring.move(-350, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) k.destroy(ring);
    });
    const waitTime = k.rand(4.5, 8.5);
    k.wait(waitTime, spawnRing);
  };
  spawnRing();

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
