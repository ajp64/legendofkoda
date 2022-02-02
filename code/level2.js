import {maps, lvlConfig} from "./maps.js"


const mapWidth = 1000;
const mapLength  = 1000;
const mapBlock = 64;

export function levelTwo(){
layers([
    "bg",
    "game",
    "ui",
], "game")



// maps and lvlConfig imported from maps.js
let level = addLevel(maps[1], lvlConfig);

let moveSpeed = 200

let gameText = add(["gameText"]);

const player = add([
  sprite("playerRight"),
  scale(1),
  pos(353,721),
  area(),
  solid(),
  "player"
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

// tracks player location
let playerLocY;
let playerLocX
onUpdate(()=>{
  playerLocY = player.pos.y
  playerLocX = player.pos.x
  debug.log(`X: ${playerLocX} Y: ${playerLocY}`)
})

// code block for placing code pieces
const codeBlock = add([
  sprite("codeblock"),
  scale(3),
  pos(150,110),
  area(),
  solid(),
  "codeblock"
]); 

// line 1 of the function
const line1 = add([
  sprite("declarefunction"),
  scale(3),
  pos(330,500),
  area(),
  solid(),
  "declarefunction"
]); 

// variable to track if you are carrying a code line
let carrying = false;

// object to track inventory

let inventory = {}


// removes the line from the screen, allowing it to be used.
onUpdate(()=>{
  if(carrying === false){
  if(playerLocY - line1.pos.y < 30 && playerLocY - line1.pos.y > -40 &&
  playerLocX - line1.pos.x < 0 && playerLocX - line1.pos.x > -60){
    if(isKeyPressed("z")){  
        line1.pos.y = 860
        line1.pos.x = 100
        carrying = true
        inventory.item = line1
         }
}}})

// allows the player to put down their line of code

onUpdate(()=>{
  if(carrying === true){
    if(isKeyPressed("x")){  
        inventory.item.pos.y = 10 + playerLocY
        inventory.item.pos.x = 50 + playerLocX
        carrying = false
        inventory.item = ""
         }
}})

}
