$(document).ready(function() {
  // Get current position
  var currTemp = 0;
  
  navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
   
  var weatherObj = $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
        
  // This gets the weather details
  weatherObj.done(update).fail(handleErr);
    
  $('#buttons').click(function() {
      weatherObj.done(clickUpdate).fail(handleErr);
    });
      });
  
  function clickUpdate(response) {
    var tempJSON = response.main.temp;

    if (currTemp === Math.round((tempJSON * 1.8) + 32)){
      currTemp = Math.round(tempJSON);
      $('#weather').html('<h1 id="temperature">' + currTemp + '&deg;</h1>');
      $('#buttons').html('<button id="button-convert">Convert to Fahrenheit</button>');
      $('#details').html('<p>H: ' + Math.round(response.main.temp_max) + '&deg; | L: ' + Math.round(response.main.temp_min) + '&deg;</p>');
    } else {
      currTemp = Math.round((tempJSON * 1.8) + 32);
      $('#weather').html('<h1 id="temperature">' + currTemp + '&deg;</h1>');
      $('#buttons').html('<button id="button-convert">Convert to Celsius</button>');
      $('#details').html('<p>H: ' + Math.round((response.main.temp_max * 1.8) + 32) + '&deg; | L: ' + Math.round((response.main.temp_min * 1.8) + 32) + '&deg;</p>');
    } 
  }
  
  // Function to update the the weather
  function update(response) {
    var temp = response.main.temp;
    var high = Math.round((response.main.temp_max * 1.8) + 32);
    var low = Math.round((response.main.temp_min * 1.8) + 32);
    currTemp = Math.round((temp * 1.8) + 32);

    // Update the background video based on the current conditions   
    $('#weather-vid').attr('src', function() {
      switch (response.weather[0].main) {
        case 'Snow':
          return 'http://jonmaldia.com/tencadenceweather/img/snowy.mp4';
          break;
        case 'Mist':
          return 'http://jonmaldia.com/tencadenceweather/img/misty.mp4';
          break;
        case 'Drizzle':
          return 'http://jonmaldia.com/tencadenceweather/img/misty.mp4';
          break;
        case 'Cloudy':
          return 'http://jonmaldia.com/tencadenceweather/img/cloudy.mp4';
          break;
        case 'Rain':
          return 'http://jonmaldia.com/tencadenceweather/img/rainy.mp4';
          break;
        default:
          return 'http://jonmaldia.com/tencadenceweather/img/sunny.mp4';
      }
    });   
    // Loads the video 
    $("#bg-vid")[0].load();

    // Updates the page temperature
    $('#location').html('<h2>' + response.name + '</h2>');
    $('#conditions').html('<h4>' + response.weather[0].main + '</h4>');
    $('#weather').html('<h1 id="temperature">' + currTemp + '&deg;</h1>');
    $('#details').html('<p>H: ' + high + '&deg; | L: ' + low + '&deg;</p>');
  }

  // Error handler
  function handleErr(jqxhr, textStatus, err) {
    console.log("Request Failed: " + textStatus + ", " + err);
  }
});
