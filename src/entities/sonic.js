import k from "../kaplayCtx.js";
export function makeSonic(pos) {
  const sonic = k.add([
    k.sprite("sonic", { anim: "run" }),
    k.scale(4),
    k.area(),
    k.anchor("center"),
    k.pos(pos),
    k.body({ jumpForce: 1700 }),
    {
      ringCollectUI: null,
      setControls() {
        k.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            k.play("jump", { volume: 0.1 });
          }
        });
      },

      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);
  sonic.ringCollectUI = sonic.add([
    k.text("", { size: 20 }),
    k.color(255, 255, 0),
    k.anchor("left"),
    k.pos(15, -10),
  ]);

  return sonic;
}

//1h21m
