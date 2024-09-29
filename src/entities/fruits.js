import k from "../kaplayCtx.js";

export function makeFruits(pos) {
  const animations = [
    "avocadoSprite",
    "starwberrySprite",
    "grapeSprite",
    "bananaSprite",
    "pineappleSprite",
    "orangeSprite",
    "watermelonSprite",
    "appleSprite",
    "lemonSprite",
  ];
  {
    let randomFruit = animations[k.rand(8)];
  }
  const randomFruit = animations[Math.floor(Math.random() * animations.length)];
  return k.add([
    k.sprite("fruits", { anim: randomFruit }),
    k.area({ shape: new k.Rect(k.vec2(20, 0), 62, 62) }),
    k.scale(2),
    k.anchor("center"),
    k.pos(pos),
    k.offscreen(),
    "ring",
  ]);
}
