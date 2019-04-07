// make express available
const express = require('express');
//turn on express
const app = express();
// make a server to handle TCP connections and use the app (our express instance) to handle endpoints (/) and requests
const server = require('http').Server( app )

// make socket io available
const io = require('socket.io')(server);

let clientCount = 0;

let storedOriginPoint;

//serve out files in our public_html folder
app.use(express.static(__dirname + '/public_html'))


//socket == clinet
// io == server
io.on('connection', function(socket){

 // clientCount++;

  //log out the unique identifier for this connection
  console.log(socket.id);

  socket.on('generate-origin-point', function(ll){
    //store this on the server for later!

    storedOriginPoint = ll;
    console.log(ll)
    console.log(ll.lat)
    console.log(ll.lon)
    console.log(storedOriginPoint)

  });



socket.on('reached-node'), function(ll){
  //store this on the server for later!

console.log('reached node!');

});








  //when someone asks for the origin point, lets send it out to everyone.
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
