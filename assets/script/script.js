// test variables
var city = 'mesa'


// gloabal variables
var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0';



function displayDash(cityLat, cityLon) {

    var displayApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;

    fetch(displayApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        // build current weather

                        // set varibles response
                        var currentDate = new Date(data.current.dt * 1000);
                        var currentIcon = data.current.weather[0].icon;
                        var currentTemp = data.current.temp;
                        var currentHumidity = data.current.humidity;
                        var currentWs = data.current.wind_speed;
                        var currentUvi = data.current.uvi;

                        // create html elements
                        var title = $('<h2>').text(city + ' (' + currentDate.getMonth() + '/' + currentDate.getDate() + '/' + currentDate.getFullYear() + ')');
                        var img = $('<img>').attr('scr', 'http://openweathermap.org/img/wn/' + currentIcon + '.png')
                        var temp = $('<p>').text('Temp: ' + currentTemp + ' °F');
                        var wind = $('<p>').text('Wind: ' + currentWs + ' MPH');
                        var humidity = $('<p>').text('Humidity: ' + currentHumidity + '%');
                        var uvi = $('<p>').text('UV Index: ' + currentUvi);

                        // append to the page 
                        $('#current-day').append(title);
                        $('#current-day').append(img);
                        $('#current-day').append(temp);
                        $('#current-day').append(wind);
                        $('#current-day').append(humidity);
                        $('#current-day').append(uvi);

                        // build 5 day forcast 
                        // place for loop here
                        for (i = 1; i <= 5; i++) {

                            // set varibles from response
                            var forcastDate = new Date(data.daily[i].dt * 1000);
                            var forcastIcon = data.daily[i].weather[0].icon;
                            var forcastTemp = data.daily[i].temp.day;
                            var forcastWs = data.daily[i].wind_speed;
                            var forcastHumidity = data.daily[i].humidity;
                            
                            // creat div for forcast
                            var forcastDiv = $('<div>').addClass('col-3 m-1 forcast');

                            // create html elements
                            var title1 = $('<h3>').text('(' + forcastDate.getMonth() + '/' + forcastDate.getDate() + '/' + forcastDate.getFullYear() + ')');
                            var img1 = $('<img>').attr('scr', 'http://openweathermap.org/img/wn/' + forcastIcon + '.png')
                            var temp1 = $('<p>').text('Temp: ' + forcastTemp + ' °F');
                            var wind1 = $('<p>').text('Wind: ' + forcastWs + ' MPH');
                            var humidity1 = $('<p>').text('Humidity: ' + forcastHumidity + '%');


                            // append into div
                            forcastDiv.append(title1);
                            forcastDiv.append(img1);
                            forcastDiv.append(temp1);
                            forcastDiv.append(wind1);
                            forcastDiv.append(humidity1);

                            // append to page 
                            $('#forcast-five').append(forcastDiv);

                        }



                    });
            } else {
                alert("Error:" + response.statusText);
            }
        });


}

// this will eventually be my submit function 
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey

fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {
                    var cityLon = data.coord.lon;
                    var cityLat = data.coord.lat;

                    displayDash(cityLat, cityLon)
                });
        } else {
            alert("Error:" + response.statusText);
        }
    });



