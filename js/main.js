$(document).ready(function() {
    
    // temp = Math.floor(Math.random() * 100);
    // $('#weather-vid').attr('src', 'http://jonmaldia.com/tenCadenceWeather/img/sunny.mp4');

    // $('#weather-vid').attr('src', function() {
    //     if (temp < 25) {
    //       return 'http://jonmaldia.com/tenCadenceWeather/img/snowy.mp4';
    //     } else if (temp < 50) {
    //       return 'http://jonmaldia.com/tenCadenceWeather/img/cloudy.mp4';
    //     } else if (temp < 75) {
    //       return 'http://jonmaldia.com/tenCadenceWeather/img/rainy.mp4';
    //     } else {
    //       return 'http://jonmaldia.com/tenCadenceWeather/img/sunny.mp4';
    //     }
    // });

    // Get current position
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      // This gets the weather details
      $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`).done(update).fail(handleErr);
    });

    // This gets the random quote from forismatic on click (new quote button or tweet button)
    // $('#button-new-quote').click(function() {
    //   $.getJSON("tempURL").done(update).fail(handleErr);
    // });

    // Function to update the quotes on the tweet and on the page
    function update(response) {
      var temp = JSON.stringify(response.main.temp);
      var fahrenheit = Math.round((temp * 1.8) + 32);
      var weather = 'http://jonmaldia.com/tenCadenceWeather/img/';

      // Updates the page quote
      $('#quote').html('<h1>' + fahrenheit + '&deg;</h1> <p>lat: ' + response.coord.lat + ' lon: ' + response.coord.lon + response.weather[0].main);

      if (response.weather[0].main === 'Clear') {
        weather += 'sunny.mp4';
      }
      
      document.getElementById("#weather-vid").src = 'http://jonmaldia.com/tenCadenceWeather/img/snowy.mp4';
      // $('#bg-vid').html(`<source id="weather-vid" src="${weather}">`);
      
      // Updates the twitter URL with current quote
      // $('#tweet_btn').attr('href', 'https://twitter.com/intent/tweet?text=' + randomQuote + '&via=jonmaldia&url=http%3A%2F%2Fbit.ly%2Fjonquotes&hashtags=quotes%2Cinspiration' + "%0a-" + randomQuoteAuthor);
    }

    // Error handler
    function handleErr(jqxhr, textStatus, err) {
      console.log("Request Failed: " + textStatus + ", " + err);
    }
});
