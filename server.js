// make express available
const express = require('express');
//turn on express
const app = express();
// make a server to handle TCP connections and use the app (our express instance) to handle endpoints (/) and requests
const server = require('http').Server( app )

// make socket io available
const io = require('socket.io')(server);

//STUFF NOT TO F WITH
let loop; //the main timing loop.
let roundCount = 0; //keep track of how many rounds have happened
let tempCoords = []; // gather the coords for a second before sending down to the clinets again.

//GAME SETTINGS
let totalGameRounds = 4; // how many rounds of getting the coords shoudl there begfore game ends.
let intervalCoords = 30; //in seconds (how often to get the coords, aka. how long each round takes.)

//serve out files in our public_html folder
app.use(express.static(__dirname + '/public_html'))

//socket == clinet
// io == server
io.on('connection', function(socket){
  //log out the unique identifier for this connection
  console.log(socket.id);

  socket.on('start-the-game', function(){
    console.log('game started');
    io.emit('game-started');


    loop = setInterval(function(){
      //increase the timer so we can be sane people and use seconds.
      roundCount = roundCount + 1;

      //get the location on the interval using the % – modulo
        console.log("gather-locations");
        io.emit('gather-locations'); //tell the clinets

      //end game condition.
      if(roundCount >= totalGameRounds){
        //the game is over.
        roundCount = 0; //reset the clock so we can play again
        io.emit('game-over')
        console.log('game-ended')
        clearInterval(loop) //stop the loop
      }
    }, intervalCoords * 1000)

  });

  socket.on('send-our-coords', function(clientLocaton){
    tempCoords.push(clientLocaton)
    console.log(tempCoords)
    //get total connections to the Server
    let connections = socket.client.conn.server.clientsCount; // <------COME BACK TO THIS
    console.log(`total number of connections: ${ connections }` )
    if(tempCoords.length === connections){
      console.log('send-gathered-coords')
      io.emit('collected-coords', tempCoords )
      //erase the array for next time
      tempCoords = [];
    }
  })
})





let port = process.env.PORT || 3000;
// turn on our server so it can recieve requests.
server.listen(port, function(){
  console.log('app is listening on port 3000!');
  console.log('so cool!');
})
