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
const mapBlock = 64;

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

let moveSpeed = 200

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


// this constant is for dialogue the player sees on screen
const dia = add([
    text(""),
    pos(24, 24),
    { value: 0,
      width: 50,
      size: 36,
      font: "sinko" },
]);

// allows player to access console
// player.onCollide("console",()=>{
//      if(isKeyPressed("z")){  
//          dia.text = "enter code, or press x to leave console. Code:"
//          moveSpeed = 0
//          }})

//allows player to exit out and continue exploring
// onUpdate(()=>{
//   debug.log(`${player.pos.x} + ${player.pos.y}`)
//   if(moveSpeed === 0){
//     if(isKeyPressed("x")){
//     dia.text = ""
//     moveSpeed = 200
//          }else{onCharInput((ch) => {
//     dia.text += ch
// })}
// }})

// tracks player location
let playerLocY;
let playerLocX
onUpdate(()=>{
  playerLocY = player.pos.y
  playerLocX = player.pos.x
})


onUpdate(()=>{
  debug.log(`${player.pos.x} + ${player.pos.y}`)
  if(playerLocY === 489 && (playerLocX > 310 && playerLocX < 365)){
    if(isKeyPressed("z")){  
         dia.text = "enter code, or press x to leave console. Code:"
         moveSpeed = 0
         }
    if(isKeyPressed("x")){
    dia.text = ""
    moveSpeed = 200
         }
}})

// else{onCharInput((ch) => {
//     dia.text += ch
