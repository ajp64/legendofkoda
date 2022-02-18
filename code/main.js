import kaboom from "kaboom"
import {maps, lvlConfig} from "./maps.js"
import {levelTwo} from "./level2.js"
import {levelTwoIntro} from "./level2.js"
import {gameEnd} from "./level2.js"

const mapWidth = 1000;
const mapLength  = 1000;
const mapBlock = 64;

kaboom({
    background: [0, 0, 0],
    width: mapWidth,
    height: mapLength,
    scale: 0.75
});

loadPedit("wall", "sprites/wall.pedit");
loadPedit("floor", "sprites/floor.pedit");
loadPedit("empty", "sprites/empty.pedit");
loadPedit("door", "sprites/door.pedit");
loadPedit("switch", "sprites/switch.pedit");
loadPedit("switchon", "sprites/switchon.pedit");
loadPedit("screen", "sprites/screen.pedit");
loadSprite("screenpx", "sprites/screenpx.png");
loadPedit("screenOff", "sprites/screenOff.pedit");
loadPedit("console", "sprites/console.pedit");
loadPedit("openDoor", "sprites/openDoor.pedit");
loadPedit("iWall", "sprites/iWall.pedit");
loadPedit("vWall", "sprites/vWall.pedit");
loadPedit("vWall2", "sprites/vWall2.pedit");
loadPedit("vWall3", "sprites/vWall3.pedit");
loadPedit("bridge", "sprites/bridge.pedit");
loadPedit("bridge2", "sprites/bridge2.pedit");
loadPedit("background", "sprites/background.pedit");
loadPedit("playerLeft", "sprites/playerLeft.pedit");
loadPedit("playerRight", "sprites/playerRight.pedit");
loadPedit("playerDown", "sprites/playerDown.pedit");
loadPedit("playerUp", "sprites/playerUp.pedit");
loadSprite("start", "sprites/start.png");
loadSprite("levelone", "sprites/levelone.png");
loadSprite("codeblock", "sprites/codeblock.png");
loadSprite("declarefunction", "sprites/declarefunction.png");
loadSprite("line2", "sprites/line2.png");
loadSprite("line3", "sprites/line3.png");
loadSprite("line4", "sprites/line4.png");
loadSprite("line5", "sprites/line5.png");
loadSprite("trick1", "sprites/trick1.png");
loadSprite("trick2", "sprites/trick2.png");
loadPedit("line1check", "sprites/line1check.pedit");
loadSprite("inventory", "sprites/inventory.png");
loadSprite("run", "sprites/run.png");
loadSprite("leveltwo", "sprites/leveltwo.png");
loadSprite("gameend", "sprites/gameend.png");

// intro scene to game
scene("start", () => {

// skip to level 2 during devp
  onUpdate(()=>{
  if(isKeyPressed("p")){go("leveltwobrief")}
})

  add([
    sprite("start", ),
    pos(50, 70),
    color(255, 255, 255),
    scale(6)
  ]);

  keyRelease("enter", () => {
    go("gamebrief");
  })
});

go("start");

scene("gamebrief",()=>{
add([
    sprite("levelone", ),
    pos(50, 70),
    color(255, 255, 255),
    scale(6)
  ]);

  keyRelease("enter", () => {
    go("gameone");
  })
})


scene("gameone", () => {


layers([
    "bg",
    "game",
    "ui",
], "game")

// maps and lvlConfig imported from maps.js
let level = addLevel(maps[0], lvlConfig);


// defining character moveSpeed. using let so this can be reassigned to zero if need to freeze player in place for a decision
let moveSpeed = 200

let gameText = add(["gameText"]);

//inventory sprite
const inventorySprite = add([
  sprite("inventory"),
  scale(2),
  pos(290,920),
  "inventory"
]); 

const player = add([
  sprite("playerRight"),
  scale(1),
  pos(74,711),
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

let button = add([
  sprite("switch"),
  scale(1),
  pos(512,0),
  area(),
  solid(),
  layer("ui"),
  "switch"
]); 

// invisible wall to control when player can move to exit
let iWall = add([
  sprite("iWall"),
  scale(4),
  pos(260,120),
  area(),
  solid(),
  "iWall"
]);
// puts invisible wall back in place at new location
function reWall(x,y){
  iWall = add([
  sprite("iWall"),
  scale(4),
  pos(x,y),
  area(),
  solid(),
  "iWall"
]);
}
let vWall = add([sprite("screenOff")])
// puts vertical invisible wall back in place at new location
function vertWall(x,y){
    vWall = add([
  sprite("vWall"),
  scale(4),
  pos(x,y),
  area(),
  solid(),
  "vWall"
]);
}
let vWall2 = add([sprite("screenOff")])
// puts second vertical invisible wall back in place at new location
function vert2Wall(x,y){
    vWall2 = add([
  sprite("vWall2"),
  scale(4),
  pos(x,y),
  area(),
  solid(),
  "vWall"
]);
}

// creating bridge to be moved later. 220 x position is center. 
let bridge = add([
  sprite("bridge"),
  scale(5),
  pos(0,64),
  layer("bg"),
  "bridge"
]);
// creating second half of bridge to be moved later. 220 x position is center. 
let bridge2 = add([
  sprite("bridge2"),
  scale(5),
  pos(0,64),
  layer("bg"),
  "bridge2"
]);
// moves the first half of the bridge based on x and y coord input
function bridgeMove(x,y){
   bridge = add([
  sprite("bridge"),
  scale(5),
  pos(x,y),
  layer("bg"),
  "bridge"
]);
}
// moves the second half of the bridge based on x and y coord input
function bridge2Move(x,y){
   bridge2 = add([
  sprite("bridge2"),
  scale(5),
  pos(x,y),
  layer("bg"),
  "bridge"
]);
}
//destroys all vertical walls
function killWalls(){
  destroy(iWall);
  destroy(vWall);
  destroy(vWall2);
}

//destroys both halves of the bridge
function killBridge(){
  destroy(bridge)
  destroy(bridge2)
}

// basic movement controls
onKeyDown("right", ()=>{
  player.use(sprite("playerRight")) 
  player.move(moveSpeed, 0)
})
onKeyDown("left", ()=>{
  player.use(sprite("playerLeft")) 
  player.move(-moveSpeed, 0)
})
onKeyDown("down", ()=>{
  player.use(sprite("playerDown"))
  player.move(0, moveSpeed)
})
onKeyDown("up", ()=>{
  player.use(sprite("playerUp"))
  player.move(0, -moveSpeed)
})


// defining a screen variable for global use. giving the default blank sprite so it exists in case player tries to "destroy" prior to accessing.
let screen = add([sprite("screenOff")])
// this function pops up the screen in the players game
function screenPop(){
    screen = add([
    sprite("screenpx"),
    pos(0, 0),
    scale(7),
    layer("ui"),
])};

// tracks player location
let playerLocY;
let playerLocX
onUpdate(()=>{
  playerLocY = player.pos.y
  playerLocX = player.pos.x
})

// variable to determine if the console is in use
let consoleOn = false

// player can access the console from certain coords. Z uses the console, x returns them to the game. 
onUpdate(()=>{
  // debug.log(`${player.pos.x} + ${player.pos.y}`)
  if(playerLocY === 489 && (playerLocX > 310 && playerLocX < 365)){
    if(isKeyPressed("z")){  
         screenPop();
         consoleOn = true
         moveSpeed = 0
         }
}})

// checks if a key is pressed, and if so will destroy the original out of place bridge, and place it in different places depending on the player selection.
onKeyPress("1", () => { // center
  if(consoleOn === true){
  killWalls();
  killBridge();
  bridgeMove(220,64);
  bridge2Move(220,64);
  vert2Wall(485,95);
  vertWall(30,95);
  moveSpeed = 200
  destroy(screen)
  consoleOn = false
  } 
})
onKeyPress("2", () => {  // space between
  if(consoleOn === true){
  killBridge();
  killWalls();
  bridgeMove(440,64);
  bridge2Move(0,64);
  reWall(260,120);
  moveSpeed = 200
  destroy(screen)
  consoleOn = false
  } 
})
onKeyPress("3", () => {  // space around
  if(consoleOn === true){
  killBridge();
  killWalls();
  bridgeMove(330,64);
  bridge2Move(110,64);
  reWall(200,120);
  vert2Wall(585,90);
  vertWall(225,75);
  moveSpeed = 200
  destroy(screen)
  consoleOn = false
  } 
})
onKeyPress("4", () => {  // flex-end
  if(consoleOn === true){
  killBridge();
  killWalls();
  bridgeMove(440,64);
  bridge2Move(440,64);
  reWall(260,120);
  moveSpeed = 200
  destroy(screen)
  consoleOn = false
  } 
})
onKeyPress("5", () => {  // flex-start
  if(consoleOn === true){
  killBridge();
  killWalls();
  bridgeMove(0,64);
  bridge2Move(0,64);
  reWall(260,120);
  moveSpeed = 200
  destroy(screen)
  consoleOn = false
  } 
})
// player can stand next to the button and press it to unlock the door.
let doorLock = true;

onUpdate(()=>{
  if(playerLocY === 64 && (playerLocX > 500 && playerLocX < 540)){
    if(isKeyPressed("z") && doorLock === true){  
         button = add([
          sprite("switchon"),
          scale(1),
          pos(512,0),
          layer("ui"),
          ])
         add([
          sprite("openDoor"),
          pos(384, 0),
          scale(1),
          layer("game"),
            ])
            add([
          sprite("openDoor"),
          pos(320, 0),
          scale(1),
          layer("game"),
            ])
          doorLock = false;
          gameText = add([
            "gameText",
            pos(24, 840),
            text("You hear the door unlock.", {
              size: 48,
              width: 1000,
              font: "sinko",
              },
              ),
           ])
           wait(3, () => {destroyAll("gameText")})
         }
}})
// player can exit the level when the door is unlocked, otherwise gets a message saying the door is locked
onUpdate(()=>{
  if(playerLocY === 64 && (playerLocX > 312 && playerLocX < 410)){
    if(isKeyPressed("z")){  
         if(doorLock === true){
            gameText = add([
            "gameText",
            pos(24, 840),
            text("The door is locked.", {
              size: 48,
              width: 1000,
              font: "sinko",
              },
              ),
           ])
           wait(3, () => {destroyAll("gameText")})
         }else{
           go("leveltwobrief")
         }
         }
}})


});// end of level one game scene

// scene for level two brief
scene("leveltwobrief", levelTwoIntro)

// scene for level two
scene("gametwo", levelTwo)

//scene for end of game
scene("gameend", gameEnd)

