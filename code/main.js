import kaboom from "kaboom"

kaboom({
    background: [0, 0, 0],
    width: mapWidth,
    height: mapLength,
  });

loadPedit("wall", "sprites/wall.pedit");
loadPedit("background", "sprites/background.pedit");
loadPedit("playerLeft", "sprites/playerLeft.pedit");
loadPedit("playerRight", "sprites/playerRight.pedit");


const mapWidth = 1000;
const mapLength  = 1000;
const mapBlock = 60;

const level = addLevel([
  "xxxxxxxxxxxxx",
  "x           x",
  "x   x       x",
  "x   x       x",
  "x   x       x",
  "x   xxx     x",
  "x     x     x",
  "x   xxx     x",
  "x   x       x",
  "x   x x xx  x",
  "x        x  x",
  "x           x",
  "xxxxxxxxxxxxx",
],{
  width: mapBlock,
  height: mapBlock,
  "x": ()=>[sprite("wall"), area(), solid(), "wall"]
});

const moveSpeed = 200

const player = add([
  sprite("playerRight"),
  scale(1),
  pos(60,60),
  area(),
  solid(),
]);


onKeyDown("right", ()=>{
  player.use(sprite("playerRight")) 
  player.move(moveSpeed, 0)
})
onKeyDown("left", ()=>{
  player.use(sprite("playerLeft")) 
  player.move(-moveSpeed, 0)
})
onKeyDown("down", ()=>{
  player.move(0, moveSpeed)
})
onKeyDown("up", ()=>{
  player.move(0, -moveSpeed)
})