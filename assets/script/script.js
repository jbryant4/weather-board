
// gloabal variables
var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0';



function displayDash(cityLat, cityLon, city) {

    // clear content area
    $('#current-day').empty();
    $('#forcast-five').empty();
    var displayApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey;

    fetch(displayApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
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
                        var img = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + currentIcon + '.png')
                        img.attr('alt', 'weather icon');
                        var temp = $('<p>').text('Temp: ' + currentTemp + ' °F');
                        var wind = $('<p>').text('Wind: ' + currentWs + ' MPH');
                        var humidity = $('<p>').text('Humidity: ' + currentHumidity + '%');
                        var uvi = $('<p>').text('UV Index: ' + currentUvi).attr('id','uvi');

                        // append to the page 
                        $('#current-day').append(title);
                        $('#current-day').append(img);
                        $('#current-day').append(temp);
                        $('#current-day').append(wind);
                        $('#current-day').append(humidity);
                        $('#current-day').append(uvi);

                        // build 5 day forcast
                        // check uvi
                        checkUvi(currentUvi); 
                        // place for loop here
                        for (i = 1; i <= 5; i++) {

                            // set varibles from response
                            var forcastDate = new Date(data.daily[i].dt * 1000);
                            var forcastIcon = data.daily[i].weather[0].icon;
                            var forcastTemp = data.daily[i].temp.day;
                            var forcastWs = data.daily[i].wind_speed;
                            var forcastHumidity = data.daily[i].humidity;

                            // creat div for forcast
                            var forcastDiv = $('<div>').addClass('col-md-3 m-1 forcast');

                            // create html elements
                            var title1 = $('<h4>').text('(' + forcastDate.getMonth() + '/' + forcastDate.getDate() + '/' + forcastDate.getFullYear() + ')');
                            var img1 = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + forcastIcon + '.png')
                            img1.attr('alt', 'weather icon');
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

function checkUvi(uvi) {

    if (uvi <= 2) {
        $('#uvi').addClass('low')
    } else if (uvi <= 8) {
        $('#uvi').addClass('moderate')
    } else {
        $('#uvi').addClass('hi')

    }
}

function getCoord(city) {

    // this will eventually be my submit function 
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        var cityLon = data.coord.lon;
                        var cityLat = data.coord.lat;

                        displayDash(cityLat, cityLon, city)
                    });
            } else {
                alert("Error:" + response.statusText);
            }
        });

};

function saveCity(city) {
    // create button with class
    var savedCity = $("<button>").text(city).addClass('saved-btn btn')

    // apend to page
    $('#search-history').append(savedCity);

    // check if their is a local storage
    var cityList = localStorage.getItem("cityList");

    if (cityList === null) {

        var listObj = JSON.stringify([{ city: city }]);
        var cityList = localStorage.setItem("cityList", listObj);

    } else {

        cityList = JSON.parse(cityList);
        cityList.push({ city: city });
        localStorage.setItem("cityList", JSON.stringify(cityList));
    }

};

// event listener to start the page up
$('#search-form').on('submit', function (event) {
    // prevent refresh
    event.preventDefault();

    // create city var
    var city = $('#city-input').val();
    console.log(city);

    // check to make sure somehting is inputed into the text area
    if (city === ''){
        alert('Please input a city.');
        window.location.reload();
    } else {
    // call functions with that city 
    getCoord(city);
    saveCity(city);

    // clear the text area of the input
    $('#city-input').val('');
    }
});

// loads list from local storage
function loadCity() {

    var cityList = localStorage.getItem("cityList");
    if (cityList === null) {
        console.log("empty");
    } else {
        var cityList = JSON.parse(cityList);

        for (i = 0; i < cityList.length; i++) {
            var cityButton = cityList[i].city;

            // create button with class
            var savedCity = $("<button>").text(cityButton).addClass('saved-btn btn')

            // apend to page
            $('#search-history').append(savedCity);
            ;
        }
    }
};



// add event listener for search history btn
$('#search-history').on('click','button', function(event) {

    // prevent refresh
    event.preventDefault();
    // pull text out 
    var city = $(this).text().trim();
    // send to coord and display on page
    getCoord(city);
});

$('#delete-btn').on('click', function(event){
    event.preventDefault
    // clear local storage and search history div
    $('#search-history').empty();
    localStorage.clear();

});

loadCity();