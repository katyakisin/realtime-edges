// make express available
const express = require('express');
//turn on express
const app = express();
// make a server to handle TCP connections and use the app (our express instance) to handle endpoints (/) and requests
const server = require('http').Server( app )

// make socket io available
const io = require('socket.io')(server);

let totalConnections = 0
let storedPoints = []

let storedOriginPoint;

//serve out files in our public_html folder
app.use(express.static(__dirname + '/public_html'))


//socket == client
// io == server
io.on('connection', function(socket){

  //listen for clients reaching the end of thier journey
  // socket.on('reachedTheEnd',function(ll){
  //   storedPoints.push(ll)
  //
  //   if(storedPoints.length ==  io.sockets.sockets.length ){
  //     //we've all checked in.
  //     io.emit('renderPolygon', storedPoints)
  //     //this will send all of the stored points down to the clinet and they can render the polygon in the clinet.js prob using p5.js
  //   }
  //
  // })

  //log out the unique identifier for this connection
  console.log(socket.id);

  socket.on('generate-origin-point', function(ll){
    //store this on the server for later!
    storedOriginPoint = ll;
    console.log(ll)
    console.log(ll.lat)
    console.log(ll.lon)
    console.log(storedOriginPoint)

  })


  //when someone asks for the origin point , lets send it out to everyone.
  socket.on('get-origin-point', function(){
    io.emit('origin-point', storedOriginPoint)
  })


})





let port = process.env.PORT || 3000;
// turn on our server so it can recieve requests.
server.listen(port, function(){
  console.log('app is listening on port 3000!');
  console.log('so cool!');
})
