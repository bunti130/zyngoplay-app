const SERVER_URL = "https://zyngoplay-server.onrender.com";

let socket;
let userId = "user_" + Math.floor(Math.random()*100000);
let currentRoom = null;

function connectSocket(){

socket = io(SERVER_URL);

socket.on("connect", () => {

console.log("Connected:", socket.id);

});

socket.on("match_found", (roomId) => {

currentRoom = roomId;

joinRoom(roomId);

window.location = "room.html";

});

socket.on("players", (players) => {

console.log("Players:", players);

});

socket.on("ludo_update", (data) => {

if(typeof updateBoard === "function"){
updateBoard(data);
}

});

}

function findMatch(game){

socket.emit("find_match",{

userId:userId,
game:game,
entryFee:10

});

}

function joinRoom(roomId){

socket.emit("join_room",{

roomId:roomId,
userId:userId

});

}

function sendMove(steps){

socket.emit("ludo_move",{

roomId:currentRoom,
player:userId,
steps:steps

});

}

connectSocket();
