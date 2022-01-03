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
}