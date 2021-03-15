// display current date function
const dateDisplayEl = $("#date-display");
const todaysDate = moment().format("MMM DD, YYYY");
function displayDate() {
  dateDisplayEl.text(todaysDate);
}
displayDate();

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

$(document).ready(function () {
  $("#search-btn").click(searchFx);
});


let searchFx = function () {
  //this retrieves the value of our input for the city
  let city = $("#search-bar").val();


  //Get our api calls using the parsed city, and also get the 5 day forecast
  currentWeather(city)
  fiveDay(city);
};

//  create function for today's weather
let currentWeather = function (city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
            console.log(data);
      const currentWeatherCard = $("#currrentWeatherCard");

      //this empties the contents of the row
      currentWeatherCard.empty();

      const resDay = data;
      const currentDayCard = $("<div>").addClass("card todays-weather"); 
      const day = $("<h4>").addClass("card-title");
      const weatherIcon = $("<img>");
      const temperatureCard = $("<p>").addClass("card-text");
      const humidityCard = $("<p>").addClass("card-text");
      //the ${} is a template literal, here we are taking in the icon id in the url
      //from the api call we got for the day
      weatherIcon.attr(
        "src",
        `http://openweathermap.org/img/w/${resDay.weather[0].icon}.png`
      );

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


// create function for five day forecast
let fiveDay = function (city) {
  let apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;

  fetch(apiURL)
    .then(function (res) {
      if (res.ok) {
        //this sends a json object to the next promise 
        return res.json().then((data) => {

          // 8 time increments per day, start in middle of the day at i=3 then add 8 5x
          const main5dayRow = $("#5-day-forecast");
          //this empties the contents of our row
          main5dayRow.empty();
          for (let i = 3; i < data.list.length; i = i + 8) {

            const resDay = data.list[i];
            const fiveDayCard = $("<div>").addClass("col five-day-forecast"); 
            const cardContainer = $("<div>").addClass("card card-body");
            const day = $("<h4>").addClass("card-title");
            const weatherIcon = $("<img>");
            const temperatureCard = $("<p>").addClass("card-text");
            const humidityCard = $("<p>").addClass("card-text");
            day.text(resDay.dt_txt.split(" ")[0]);
            weatherIcon.attr(
              "src",`http://openweathermap.org/img/w/${resDay.weather[0].icon}.png`);
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