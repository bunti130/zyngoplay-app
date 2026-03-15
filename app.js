const SERVER_URL = "https://zyngoplay-server.onrender.com";

let socket;
let userId = "user_" + Math.floor(Math.random()*100000);
let currentRoom = null;

/* CONNECT SOCKET */

function connectSocket(){

socket = io(SERVER_URL,{
transports:["websocket"]
});

/* CONNECTION */

socket.on("connect",()=>{

console.log("Connected:",socket.id);

});

/* RECONNECT */

socket.on("disconnect",()=>{

console.log("Disconnected");

});

/* MATCH FOUND */

socket.on("match_found",(roomId)=>{

console.log("Match Found:",roomId);

currentRoom = roomId;

joinRoom(roomId);

const game = localStorage.getItem("selectedGame");

/* OPEN GAME */

if(game==="ludo"){
window.location="ludo.html";
}

if(game==="poker"){
window.location="poker.html";
}

if(game==="rummy"){
window.location="rummy.html";
}

if(game==="carrom"){
window.location="carrom.html";
}

});

/* ROOM PLAYERS */

socket.on("players",(players)=>{

console.log("Players:",players);

});

/* LUDO UPDATE */

socket.on("ludo_update",(data)=>{

if(typeof updateBoard==="function"){
updateBoard(data);
}

});

/* POKER UPDATE */

socket.on("poker_update",(data)=>{

if(typeof updatePoker==="function"){
updatePoker(data);
}

});

/* RUMMY UPDATE */

socket.on("rummy_update",(data)=>{

if(typeof updateRummy==="function"){
updateRummy(data);
}

});

/* CARROM UPDATE */

socket.on("carrom_update",(data)=>{

if(typeof updateCarrom==="function"){
updateCarrom(data);
}

});

}

/* FIND MATCH */

function findMatch(game){

 game = game.toLowerCase()

 socket.emit("find_match",{
  userId:userId,
  game:game
 })

}

/* START GAME */

function startGame(game){

localStorage.setItem("selectedGame",game);

findMatch(game);

}

/* JOIN ROOM */

function joinRoom(roomId){

socket.emit("join_room",{

roomId:roomId,
userId:userId

});

}

/* LUDO MOVE */

function sendMove(steps){

socket.emit("ludo_move",{

roomId:currentRoom,
player:userId,
steps:steps

});

}

/* POKER ACTION */

function pokerAction(action){

socket.emit("poker_action",{

roomId:currentRoom,
player:userId,
action:action

});

}

/* RUMMY DRAW */

function rummyDraw(){

socket.emit("rummy_draw",{

roomId:currentRoom,
player:userId

});

}

/* RUMMY DISCARD */

function rummyDiscard(card){

socket.emit("rummy_discard",{

roomId:currentRoom,
player:userId,
card:card

});

}

/* CARROM POT */

function carromPot(){

socket.emit("carrom_pot",{

roomId:currentRoom,
player:userId

});

}

/* START SOCKET */

connectSocket();
