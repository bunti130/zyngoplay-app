// ZyngoPlay Ludo Frontend Engine

const socket = io()

const boardSize = 15
const board = document.getElementById("ludoBoard")

let players = ["red","green","blue","yellow"]
let currentTurn = 0

let tokens = {
 red:[0,0,0,0],
 green:[0,0,0,0],
 blue:[0,0,0,0],
 yellow:[0,0,0,0]
}

let safeCells = [0,8,13,21,26,34,39,47]

let diceValue = 0

function rollDice(){

 diceValue = Math.floor(Math.random()*6)+1

 document.getElementById("dice").innerText="Dice: "+diceValue

 moveToken()

}

function moveToken(){

 let player = players[currentTurn]

 let tokenIndex = 0

 tokens[player][tokenIndex]+=diceValue

 checkKill(player)

 checkWin(player)

 nextTurn()

}

function nextTurn(){

 currentTurn++

 if(currentTurn>=players.length){
  currentTurn=0
 }

}

function checkKill(player){

 let pos = tokens[player][0]

 if(safeCells.includes(pos)) return

 for(let p of players){

  if(p===player) continue

  if(tokens[p][0]===pos){

   tokens[p][0]=0

  }

 }

}

function checkWin(player){

 if(tokens[player][0]>=57){

  alert(player+" wins!")

 }

}

function renderTokens(){

 let cells=document.querySelectorAll(".cell")

 cells.forEach(c=>c.innerHTML="")

 players.forEach(p=>{

  tokens[p].forEach(pos=>{

   if(pos<cells.length){

    let token=document.createElement("div")

    token.className="token"

    token.style.background=p

    cells[pos].appendChild(token)

   }

  })

 })

}

setInterval(renderTokens,300)

socket.on("ludo_update",(data)=>{

 tokens=data.tokens

 currentTurn=data.turn

})
