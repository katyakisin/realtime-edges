let socket = io.connect();


//click the botton
$('.origin-button').on('click',function(){
$('.origin-button').hide();
$('.origin-pin').show();
$('.output').show();

  //get the position
  navigator.geolocation.getCurrentPosition(function(position) {

    ll = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }

    console.log(ll)

    //send to server
    socket.emit('generate-origin-point', ll)

    $('.output').html('[' + Math.round(1000000*position.coords.latitude)/1000000 + ', ' + Math.round(1000000*position.coords.longitude)/1000000 + ']')
  });
})
