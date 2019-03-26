let socket = io.connect();

//click the botton
$('.origin-button').on('click',function(){

  //get the position
  navigator.geolocation.getCurrentPosition(function(position) {

    ll = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }

    console.log(ll)

    //send to server
    socket.emit('generate-origin-point', ll)

    $('.output').html(position.coords.latitude + ',' + position.coords.longitude)

  });

})
