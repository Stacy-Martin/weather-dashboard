init()

// display current date function
const dateDisplayEl = $('#date-display');
const todaysDate = moment().format('MMM DD, YYYY');
function displayDate() {
    dateDisplayEl.text(todaysDate);
}
displayDate()

const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

// https://openweathermap.org/api

// create searchFx for cities searched by user
// trim city
// get current weather for that city = call 1
// get five day forecast for that city = call 2


$('#search-btn').click(searchFx);


// create currentWeather function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}


// create fiveDay function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}



// add fetched weather data to appropriate spot in HTML for currentWeather
// use of append and addClass methods
// let statements to addClass (like in create table in calendar)



// add fetched weather data to appropriate spot in HTML for fiveDay
// use of append and addClass methods
// let statements to addClass (like in create table in calendar)
// have to do this for each of the five day col's
// create if/then statement for weather icons from here:
// https://openweathermap.org/weather-conditions#Icon-list



// local storage  ???