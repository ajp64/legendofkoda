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
  player.use(sprite("playerDown")) 
  player.move(0, moveSpeed)
})
onKeyDown("up", ()=>{
  player.use(sprite("playerUp")) 
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
  scale(2.25),
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

// line 2 of the function
const line2 = add([
  sprite("line2"),
  scale(3),
  pos(330,530),
  area(),
  solid(),
  "line2"
]); 

// line 3 of the function
const line3 = add([
  sprite("line3"),
  scale(3),
  pos(330,560),
  area(),
  solid(),
  "line3"
]); 

// line 4 of the function
const line4 = add([
  sprite("line4"),
  scale(3),
  pos(330,590),
  area(),
  solid(),
  "line4"
]); 

// line 5 of the function
const line5 = add([
  sprite("line5"),
  scale(3),
  pos(330,620),
  area(),
  solid(),
  "line5"
]); 

// wrong call 1 of the function
const trick1 = add([
  sprite("trick1"),
  scale(3),
  pos(330,650),
  area(),
  solid(),
  "trick1"
]); 

// wrong call 2 of the function
const trick2 = add([
  sprite("trick2"),
  scale(3),
  pos(330,680),
  area(),
  solid(),
  "trick2"
]); 

// variable to track if you are carrying a code line
let carrying = false;

// object to track inventory

let inventory = {}

//function to allow picking up of items
function pickUpItem(item){
  if(carrying === false){
  if(playerLocY - item.pos.y < 5 && playerLocY - item.pos.y > -12 &&
  playerLocX - item.pos.x < 0 && playerLocX - item.pos.x > -55){
    if(isKeyPressed("z")){  
        item.pos.y = 860
        item.pos.x = 100
        carrying = true
        inventory.item = item
         }
}}
}

// removes the line from the screen, allowing it to be used.
onUpdate(()=>{
  pickUpItem(line1)
  pickUpItem(line2)
  pickUpItem(line3)
  pickUpItem(line4)
  pickUpItem(line5)
  pickUpItem(trick1)
  pickUpItem(trick2)
})

// allows the player to put down their item
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
