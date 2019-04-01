let socket = io.connect();

let storedOriginPoint;
// let ourDistance = Math.random() * 100;

let ourDistance = 40;

socket.on('origin-point',function(incomingPosition){

  storedOriginPoint = incomingPosition;

  $('.origin-point-readout').text(storedOriginPoint.lat + ',' + storedOriginPoint.lon)

})


if ("geolocation" in navigator) {
  /* geolocation is available */

  // get our position every interval
    setInterval(function(){

      $('.our-distance').text( 'distance from anchor: ' + ourDistance + ' feet')


      socket.emit('get-origin-point');

      navigator.geolocation.getCurrentPosition(function(position) {

        // console.log(position)
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)

        //distance drom the ou origin point
        let gd = miles2feet( calcGeoDistance(position.coords.latitude, position.coords.longitude, storedOriginPoint.lat, storedOriginPoint.lon ) )

        if(gd <= ourDistance){
          $('.current-distance-away').text( Math.round( gd ) )

        }else{
          $('.current-distance-away').text("you've reached the end, return to the origin point!")
        }

      });
    }, 1000)



} else {
  /* geolocation IS NOT available */
  console.error('no geolocation available!')
}



//convert miles to feet
function miles2feet(miles){
  return miles * 5280;
}


// http://www.movable-type.co.uk/scripts/latlong.html
// Used Under MIT License
function calcGeoDistance(lat1, lon1, lat2, lon2){

    var R = 3959; // earth radius in Miles (default)

    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}



let port = process.env.PORT || 3000;
