// display current date function
const dateDisplayEl = $("#date-display");
const todaysDate = moment().format("MMM DD, YYYY");
function displayDate() {
  dateDisplayEl.text(todaysDate);
}
displayDate();

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

// https://openweathermap.org/api

// create searchFx for cities searched by user
// trim city
// get current weather for that city = call 1
// get five day forecast for that city = call 2

$(document).ready(function () {
  $("#search-btn").click(searchFx);
});

//let means the contents of the variable may change
//const is constant, cannot change
let searchFx = function () {
  //this retrieves the value of our input for the city
  let city = $("#search-bar").val();


  //now we want to get our api calls using the parsed city
  //first let's get the 5 day forecast
  currentWeather(city)
  fiveDay(city);
};
// create currentWeather function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}

// should i use let or const here ?
let currentWeather = function (city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      /**
             *        
                    <div class="card todays-weather">
                        <h4 class="card-title">City</h4>
                        <p class="card-text">Temperature</p>
                        <p class="card-text">Humidity</p>
                        <p class="card-text">Wind Speed</p>
                        <p class="card-text">UV Index</p>
                    </div>
                </div>
             */
            console.log(data);
      const currentWeatherCard = $("#currrentWeatherCard");

      //this empties the contents of our row
      currentWeatherCard.empty();

      const resDay = data;
      //$("div") selects all divs, $("<div>") creates a new div

       const currentDayCard = $("<div>").addClass("card todays-weather"); //$("div")

       const day = $("<h4>").addClass("card-title");
       const weatherIcon = $("<img>");
       const temperatureCard = $("<p>").addClass("card-text");
       const humidityCard = $("<p>").addClass("card-text");
      //getting an image hosted somewhere else
      //the ${} is a template literal, here we are taking in the icon id in the url
      //from the api call we got for the day
      weatherIcon.attr(
        "src",
        `http://openweathermap.org/img/w/${resDay.weather[0].icon}.png`
      );
      //I parsed through the api to get the info I want
      //it's nested within multiple objects from the JSON response
      temperatureCard.text(resDay.main.temp_max);
      humidityCard.text(resDay.main.humidity);

      currentDayCard.append(day);
      currentDayCard.append(weatherIcon);
      currentDayCard.append(temperatureCard);
      currentDayCard.append(humidityCard);

    //   fiveDayCard.append(cardContainer);
      currentWeatherCard.append(currentDayCard);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// create fiveDay function
// let API url / fetch / catch
// display weather
// ? error alerts
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={ded1e9b5e5ea66606148d61b8d281024}

let fiveDay = function (city) {
  let apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;
  //res is response
  fetch(apiURL)
    .then(function (res) {
      if (res.ok) {
        //this sends a json object to our next promise aka the then
        return res.json().then((data) => {
          //arrow function is the same as me writing function
          //this converts our data from a string into a JSON object / aka we can now use javascript on it
          //parse


          //there are 8 time increments in a day, so maybe we should get the middle of day per each day
          //so we added 8 starting from 3 to get each day
          const main5dayRow = $("#5-day-forecast");
          //this empties the contents of our row
          main5dayRow.empty();
          for (let i = 3; i < data.list.length; i = i + 8) {

            const resDay = data.list[i];
            /**
                 * <div class="col five-day-forecast">
                    <!-- <div class="card card-body"> -->
                        <h4 class="card-title">Date 1</h4>
                        <p class="card-text">Weather Icon</p>
                        <p class="card-text">Temperature</p>
                        <p class="card-text">Humidity</p>
                    <!-- </div> -->
                </div>
                 */

            //$("div") selects all divs, $("<div>") creates a new div

            const fiveDayCard = $("<div>").addClass("col five-day-forecast"); //$("div")
            const cardContainer = $("<div>").addClass("card card-body");
            const day = $("<h4>").addClass("card-title");
            const weatherIcon = $("<img>");
            const temperatureCard = $("<p>").addClass("card-text");
            const humidityCard = $("<p>").addClass("card-text");
            day.text(resDay.dt_txt.split(" ")[0]);
            //getting an image hosted somewhere else
            //the ${} is a template literal, here we are taking in the icon id in the url
            //from the api call we got for the day
            weatherIcon.attr(
              "src",
              `http://openweathermap.org/img/w/${resDay.weather[0].icon}.png`
            );
            //I parsed through the api to get the info I want
            //it's nested within multiple objects from the JSON response
            temperatureCard.text(resDay.main.temp_max);
            humidityCard.text(resDay.main.humidity);

            cardContainer.append(day);
            cardContainer.append(weatherIcon);
            cardContainer.append(temperatureCard);
            cardContainer.append(humidityCard);

            fiveDayCard.append(cardContainer);
            main5dayRow.append(fiveDayCard);
          }

    
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      console.log(error);
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
