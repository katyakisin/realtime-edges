let socket = io.connect();

let collectedCoords;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    console.log('got location' + position)
  }, function(){
    console.error('location services not available.')
  });

}

$('#start-game-button').on('click', function(){


  socket.emit('start-the-game') //send the game start to the server.

})

//server tells us that the game has started.
socket.on('game-started', function(){

  $('#start-game-button').hide()

})

//get the notification from the server and send our location up!
socket.on('gather-locations',function(){

  //geolocation available
  if (navigator.geolocation) {

    //get the location, and use the functions below.
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {

      //pack up our coords
      let ourPosition = {
        "lat": position.coords.latitude,
        "lon": position.coords.longitude
      }

      //send them to the server!
      socket.emit('send-our-coords', ourPosition)
    }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  }else{
    console.error("no geolocetion available...")
  }

})




socket.on('collected-coords',function(coordsArray){

  // console.log(coordsArray)
  collectedCoords = coordsArray

})

socket.on('game-over', function(){
  //the game is over
  console.log('game is over')
  $('#start-game-button').show()

})



//an array of objects containing lat / lon points
  // {"lat" : 44.964782 , "lon" : -93.276922 }


// let latlonArray = [
//     // {"lat" : 44.964782, "lon" : -93.276922 },
//     // {"lat" : 44.964125, "lon" : -93.266912 },
//     // {"lat" : 44.918733, "lon" : -93.241098 },
//     // {"lat" : 44.924925, "lon" : -93.331771 }
//
//
//   {"lat" : 44.963385, "lon" : -93.278789 },
//   {"lat" : 44.976013, "lon" : -93.258953 },
//   // {"lat" : 44.945031, "lon" : -93.225235 },
//    {"lat" : 44.942499, "lon" : -93.225518 },
//   {"lat" :  44.893919, "lon" : -93.237053 }
//
// ]


function setup() {
  createCanvas(500, 500);
  background(0, 3, 75);
}

function draw() {
  noStroke();
  fill(242, 241, 232);
  ll2poly(collectedCoords); //the magic!

}

function ll2poly(latlonArray) {
  // local variables
  let latMin = 0; // bigger
  let latMax = 0; // smaller
  let lonMin = 0; // bigger (remember negatives)
  let lonMax = 0; // smaller (remember negatives)
  // might seem counterintuitive but start the max and min with opposite values.
  //just set these to the first slot so we have something to comapre to in order to calculate the min/max
  latMin = latlonArray[0].lat
  latMax = latlonArray[0].lat
  lonMin = latlonArray[0].lon
  lonMax = latlonArray[0].lon

  // console.log(latMin, latMax, lonMin, lonMax);
  // loop through each lat/lon and check to see it it's actually the min/max
  for(let i = 0 ; i < latlonArray.length; i ++ ) {

    if(latlonArray[i].lat >= latMin){
      latMin = latlonArray[i].lat
    }

    if(latlonArray[i].lat <= latMax){
      latMax = latlonArray[i].lat
    }

    if(latlonArray[i].lon >= lonMin){
      lonMin = latlonArray[i].lon
    }

    if(latlonArray[i].lon <= lonMax){
      lonMax = latlonArray[i].lon
    }


  }

  //push and pop so that the styles dont change anything else in the sketch and so we can cleanly translate and rotate
  push()
  //we can translate and rotate here to correct the orientation of the shape to face "north"/up
  translate(height,0);
  rotate(radians(90)) //rotate by 90 degrees

  beginShape()
  //loop through each point, scale to the min/max and adda vertex for drwaing.
    for(let j = 0 ; j < latlonArray.length; j++){
      let latOut = map(latlonArray[j].lat, latMin, latMax, 0, width);
      let lonOut = map(latlonArray[j].lon, lonMin, lonMax, 0, height);
      // return createVector(latOut, lonOut);
      vertex(latOut, lonOut)
    }
  endShape(CLOSE)
  pop()

}
