export const maps = [[
  "xxxxxddxxxxx",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x  xxyyyx  x",
  "x  xyyyyx  x",
  "x  xyyyyx  x",
  "x xyyyyyyx x",
  "xxyyyyyyyyxx",
  "xyyyyyyyyyyx",
  "xxxxxxxxxxxx",
],
[
  "xxxxxxxxxxxx",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "x          x",
  "xxxxxxxxxxxx",
],
];

const mapWidth = 1000;
const mapLength  = 1000;
const mapBlock = 64;

export const lvlConfig = {
  width: mapBlock,
  height: mapBlock,
  "x": ()=>[sprite("wall"), area(), solid(), "wall"],
  "y": ()=>[sprite("floor"), area()],
  "e": ()=>[sprite("empty"), area(), solid(),],
  "d": ()=>[sprite("door"), area(),solid()], 
}