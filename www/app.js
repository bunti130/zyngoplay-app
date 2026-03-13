const SERVER_URL = "https://zyngoplay-server.onrender.com";

let socket;
let userId = "user_" + Math.floor(Math.random()*100000);

function connectSocket(){

socket = io(SERVER_URL);

socket.on("connect", () => {

console.log("Connected:", socket.id);

});

socket.on("match_found", (roomId) => {

console.log("Match found:", roomId);

joinRoom(roomId);
  
window.location = "room.html";
});

socket.on("players", (players) => {

console.log("Players in room:", players);

if(players.length >= 2){

alert("Game Starting!");

}

});

}

function findMatch(game){

socket.emit("find_match", {

userId: userId,
game: game,
entryFee: 10

});

}

function joinRoom(roomId){

socket.emit("join_room", {

roomId: roomId,
userId: userId

});

}

connectSocket();
