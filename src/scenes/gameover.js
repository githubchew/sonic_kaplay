import k from "../kaplayCtx.js";

export default function gameover() {
  let bestScore = k.getData("best-score");
  const currentScore = k.getData("current-score");

  if (bestScore < currentScore) {
    k.setData("best-score", currentScore);
    bestScore = currentScore;
  }

  k.add([
    k.text("GAME OVER", { size: 64 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 200),
  ]);

  k.add([
    k.text("Best Score: " + bestScore, { size: 62 }),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.wait(1, () => {
    k.add([
      k.text("press space to play again", { size: 62 }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y + 300),
    ]);
  });

  k.onButtonPress("jump", () => {
    k.go("game");
  });
}
