import kaboom from "kaboom"

kaboom({
    background: [0, 0, 0],
    width: mapWidth,
    height: mapLength,
  });

loadPedit("wall", "sprites/wall.pedit");
loadPedit("floor", "sprites/floor.pedit");
loadPedit("empty", "sprites/empty.pedit");
loadPedit("door", "sprites/door.pedit");
loadPedit("console", "sprites/console.pedit");
loadPedit("background", "sprites/background.pedit");
loadPedit("playerLeft", "sprites/playerLeft.pedit");
loadPedit("playerRight", "sprites/playerRight.pedit");


const mapWidth = 1000;
const mapLength  = 1000;
const mapBlock = 60;

const level = addLevel([
  "xxxxxddxxxxx",
  "xyy        x",
  "xyy        x",
  "xyy        x",
  "xyy        x",
  "xyyeeeeee  x",
  "x  xyyyyx  x",
  "x  xyyyyx  x",
  "x  xyyyyx  x",
  "x xyyyyyyx x",
  "xxyyyyyyyyxx",
  "xyyyyyyyyyyx",
  "xxxxxxxxxxxx",
],{
  width: mapBlock,
  height: mapBlock,
  "x": ()=>[sprite("wall"), area(), solid(), "wall"],
  "y": ()=>[sprite("floor"), area()],
  "e": ()=>[sprite("empty"), area(), solid(),],
  "d": ()=>[sprite("door"), area()], 
});

const moveSpeed = 200

const player = add([
  sprite("playerRight"),
  scale(1),
  pos(400,600),
  area(),
  solid(),
  "player"
]);

const console = add([
  sprite("console"),
  scale(1),
  pos(330,425),
  area(),
  solid(),
  "console"
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

const dia = add([
    text(""),
    pos(24, 24),
    { value: 0 },
]);


player.onCollide("console",()=>{
         dia.text = "enter code"
         debug.log("contact")
    })



