let socket = io.connect();
//when page loads-ask to get location

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('got location' + position)
  }, function() {
    console.error('location services not available.')
    //return to user that they can't use app w/o location
    //tell them to reload
  });
}

//get the notification from the server and send our location up!
socket.on('gather-locations', function() {
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
      socket.emit('send-our-coords', ourPosition);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

  } else {
    console.error("no geolocation available...");
  }

})

socket.on('game-over', function() {
  //the game is over
  console.log('game is over');
  $('#start-game-button').show();
})


// ***** START P5 STUFF *********

let scalar = 0.15; //starting size
let ringInc = 0.15;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  socket.on('collected-coords', function(coordsArray) {
    console.log(coordsArray)
    //draw it
    ll2poly(coordsArray, scalar); //the magic!
      console.log("draw shape");
    //increase the size for next time (this is an idea you can test once you test the main functionality)

  })

  $('#start-game-button').on('click', function() {
    socket.emit('start-the-game'); //send the game start to the server.
    background(0);
  })

  //server tells us that the game has started.
  socket.on('game-started', function() {
    //add direction picker here
    scalar = 0.15;
    $('#start-game-button').hide()
    background(0);

  })

}

function draw() {
  // blendMode(OVERLAY);
  // noStroke();
    strokeWeight(20);
    stroke(236,236,218);
    fill(236,236,218);

}

function ll2poly(latlonArray, scaleFactor) {

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
  for (let i = 0; i < latlonArray.length; i++) {

    if (latlonArray[i].lat >= latMin) {
      latMin = latlonArray[i].lat
    }
    if (latlonArray[i].lat <= latMax) {
      latMax = latlonArray[i].lat
    }
    if (latlonArray[i].lon >= lonMin) {
      lonMin = latlonArray[i].lon
    }
    if (latlonArray[i].lon <= lonMax) {
      lonMax = latlonArray[i].lon
    }


  }


  //push and pop so that the styles dont change anything else in the sketch and so we can cleanly translate and rotate
  push()
  //we can translate and rotate here to correct the orientation of the shape to face "north"/up
  // translate((width / 5) - (scalar + width / 5), (height / 2) - (scalar + height / 2)); //manipulate position here
  translate(width/2, height/2) //move the whole thing to the center of the screen
  translate(-scalar*width/2, -scalar*height/2) //move the origin point of the shape to the center instead of the top left corner
  scale(scaleFactor)
  // rotate(radians(90)) //rotate by 90 degrees

  beginShape()
  //loop through each point, scale to the min/max and adda vertex for drwaing.
  for (let j = 0; j < latlonArray.length; j++) {
    let latOut = map(latlonArray[j].lat, latMin, latMax, 0, width);
    let lonOut = map(latlonArray[j].lon, lonMin, lonMax, 0, height);
    // return createVector(latOut, lonOut);
    vertex(latOut, lonOut)
  }
  endShape(CLOSE)
  pop()
  scalar = scalar + ringInc;
}


$('.toProj').on('click', function() {
  $('.intro').hide()
})
