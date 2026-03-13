const SERVER_URL = "https://zyngoplay-server.onrender.com";

let socket = null;
let userId = "user_" + Math.floor(Math.random()*100000);

function connectSocket(){

console.log("Connecting to server...");

socket = io(SERVER_URL);

socket.on("connect", function(){

console.log("Connected:", socket.id);

});

socket.on("match_found", function(roomId){

console.log("Match found:", roomId);

alert("Match Found!");

joinRoom(roomId);

});

socket.on("players", function(players){

console.log("Players in room:", players);

});

}

function findMatch(game){

if(!socket){
connectSocket();
}

console.log("Searching match for:", game);

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

connectSocket();l
