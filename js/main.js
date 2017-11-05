$(document).ready(function() {

  // Get current position
  navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        
  // This gets the weather details
  $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`).done(update).fail(handleErr);
      });


  // Function to update the the weather
  function update(response) {
    var temp = JSON.stringify(response.main.temp);
    var fahrenheit = Math.round((temp * 1.8) + 32);

    // Update the background video based on the current conditions
    $('#weather-vid').attr('src', function() {
      if (response.weather[0].main === 'Snow') {
        return 'http://jonmaldia.com/tenCadenceWeather/img/snowy.mp4';
      } else if (response.weather[0].main === 'Mist') {
        return 'http://jonmaldia.com/tenCadenceWeather/img/cloudy.mp4';
      } else if (response.weather[0].main === 'Rain') {
        return 'http://jonmaldia.com/tenCadenceWeather/img/rainy.mp4';
      } else {
        return 'http://jonmaldia.com/tenCadenceWeather/img/sunny.mp4';
      }
    });
    
    // Loads the video 
    $("#bg-vid")[0].load();

    // Updates the page temperature
    $('#weather').html('<h1>' + fahrenheit + '&deg;</h1> <p>lat: ' + response.coord.lat + ' lon: ' + response.coord.lon + '<p> Current Conditions: ' + response.weather[0].main + '</p>');
  }

  // Error handler
  function handleErr(jqxhr, textStatus, err) {
    console.log("Request Failed: " + textStatus + ", " + err);
  }
});
