const SERVER_URL = "https://zyngoplay-server.onrender.com";

let socket = null;

function connectSocket(){

console.log("Connecting to server...");

socket = io(SERVER_URL);

socket.on("connect", function(){

console.log("Connected:", socket.id);

});

socket.on("match_found", function(roomId){

console.log("Match found:", roomId);

alert("Match Found! Room: " + roomId);

});

}

connectSocket();
