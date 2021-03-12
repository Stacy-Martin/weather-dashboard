

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

$(document).ready(function(){
     $('#search-btn').click(searchFx);
}
   
);


//let means the contents of the variable may change
//const is constant, cannot change
let searchFx = function (){

    //this retrieves the value of our input for the city
    let city = $('#search-bar').val();
    console.log(city);

    //now we want to get our api calls using the parsed city 
    //first let's get the 5 day forecast
    fiveDay(city);

}
// create currentWeather function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}

// should i use let or const here ?
let currentWeather = function(city){
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024`

    fetch(apiURL)
        .then(function (response){
            if (response.ok){

            }
        });
}

// create fiveDay function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}

let fiveDay = function (city) {
    let apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024`;
    //res is response
    fetch(apiURL)
        .then(function (res){
            if (res.ok){
            //this sends a json object to our next promise aka the then
            return res.json().then((data)=>{
                //arrow function is the same as me writing function
                //this converts our data from a string into a JSON object / aka we can now use javascript on it
                //parse
            console.log(data)
            console.log(data.main.temp) 
        });
    } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};



// add fetched weather data to appropriate spot in HTML for currentWeather
// use of append and addClass methods
// let statements to addClass (like in create table in calendar)



// add fetched weather data to appropriate spot in HTML for fiveDay
// use of append and addClass methods
// let statements to addClass (like in create table in calendar)
// have to do this for each of the five day col's
// create if/then statement for weather icons from here:
// https://openweathermap.org/weather-conditions#Icon-list

// init()

// local storage  ??
