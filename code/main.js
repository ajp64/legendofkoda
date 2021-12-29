import kaboom from "kaboom"

kaboom();

loadPedit("wall", "sprites/wall.pedit");
loadPedit("player", "sprites/player.pedit");
loadPedit("snakePile", "sprites/snakePile.pedit");
loadPedit("background", "sprites/background.pedit");

const background = add([
  sprite("background"),
  scale(100),
  pos(0,0)
]);

const level = addLevel([
  "xxxxxxxxxxxxxxxx",
  "x              x",
  "x              x",
  "x              x",
  "xxxxxxxxxxxxxxxx",
],{
  width: 40,
  height: 40,
  "x": ()=>[sprite("wall"), area(), solid()]
});

const moveSpeed = 100

const player = add([
  sprite("snakePile"),
  scale(1),
  pos(40,40)
]);



onKeyDown("right", ()=>{
  player.move(moveSpeed, 0)
})
onKeyDown("left", ()=>{
  player.move(-moveSpeed, 0)
})
onKeyDown("down", ()=>{
  player.move(0, moveSpeed)
})
onKeyDown("up", ()=>{
  player.move(0, -moveSpeed)
})