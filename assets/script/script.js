// test variables
var city = 'mesa'


// gloabal variables
var apiKey = '29d178bf984c3810ca4482bb3d2b6ab0';

var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey

fetch(apiUrl)
.then(function (response) {
    if (response.ok) {
        response.json()
            .then(function (data) {
                console.log(data)
            });
    } else {
        alert("Error:" + response.statusText);
    }
});

