import kaplay from "kaplay";

export const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [10, 10, 10, 0.7],
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ["space", "z"],
      mouse: ["left"],
    },
  },
  debugKey: "d",
  debug: true,
});

export default k;
