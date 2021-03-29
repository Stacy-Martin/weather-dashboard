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
  getCities();
  $("#search-btn").click(searchFx);
  $(document).on("keydown", function (e) {
    // {console.log(e.keyCode)
    if (e.keyCode == 13) {
      searchFx();
    }
  });

  $("#localStorage").on("click", function (e) {
    //classList gives us back an array of classes
    console.log(e.target.classList);

    if (e.target.classList[0] == "saveBtn") {
      let city = $(e.target).text();
      console.log(city);
      currentWeather(city);
      fiveDay(city);
    }
  });
});

let searchFx = function () {
  //this retrieves the value of our input for the city
  let city = $("#search-bar").val();

  //Get our api calls using the parsed city, and also get the 5 day forecast
  currentWeather(city);
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
      const day = $("<h1>").addClass("card-title");
      const weatherIcon = $("<img>");
      const temperatureCard = $("<p>").addClass("card-text");
      const humidityCard = $("<p>").addClass("card-text");
      const windSpeedCard = $("<p>").addClass("card-text");
      

      //the ${} is a template literal, here we are taking in the icon id in the url
      //from the api call we got for the day
      weatherIcon.attr(
        "src",
        `https://openweathermap.org/img/w/${resDay.weather[0].icon}.png`
      // backticks allow string and can call variables within
      );
      //String.concat() method of the String object does the same thing as below
      day.text(resDay.name);
      temperatureCard.text("Temp: " + resDay.main.temp_max + String.fromCharCode(176));
      humidityCard.text("Humidity: " + resDay.main.humidity + "%");
      windSpeedCard.text("Wind Speed: " + resDay.wind.speed + " mph")

      currentDayCard.append(day);
      currentDayCard.append(weatherIcon);
      currentDayCard.append(temperatureCard);
      currentDayCard.append(humidityCard);
      currentDayCard.append(windSpeedCard);
      getUVIndex(resDay.coord.lat, resDay.coord.lon);
      

      //currentWeatherCard.append(cardContainer);
      currentWeatherCard.append(currentDayCard);
      currentWeatherCard.attr("style", "display: block");
      
      //store the city in our local storage 
      storeCities(city);
    })
    .catch(function (error) {
      console.log(error);
    });
};
//returns the uvi of the city
let getUVIndex = (lat, lon) => {
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;
    fetch(apiURL)
      .then(function (res) {
          if (res.ok) {
            //this sends a json object to the next promise
            return res.json().then((data) => {
              const currentWeatherCard = $(".todays-weather");
              console.log(currentWeatherCard[0])
              const uviCard = $("<p>").addClass("card-text uvIndex");
              //parseFloat() is for decimals
              let uvi = parseFloat(data.current.uvi);
              
              if(uvi < 3){
                uviCard.attr("style", "background-color: #90EE90");
              }
              else if(uvi < 6){
                uviCard.attr("style", "background-color: #ffea61");
              }
              else if(uvi < 8){
                uviCard.attr("style", "background-color: orange");
              }
              else if(uvi < 10){
                uviCard.attr("style", "background-color: #ff7f7f");
              }
              else{
                uviCard.attr("style", "background-color: #b19cd9");
              }
              console.log(uvi)
              uviCard.text("UV Index: " + uvi);
              currentWeatherCard.append(uviCard);
            })
          }
        })
      }

    // create function for five day forecast
    let fiveDay = function (city) {
      let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ded1e9b5e5ea66606148d61b8d281024&units=imperial`;
      const main5dayRow = $("#5-day-forecast");
      //this empties the contents of our row
      main5dayRow.empty();
      fetch(apiURL)
        .then(function (res) {
          if (res.ok) {
            //this sends a json object to the next promise
            return res.json().then((data) => {
              // 8 time increments per day, start in middle of the day at i=3 then add 8 5x


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
                  "src",
                  `https://openweathermap.org/img/w/${resDay.weather[0].icon}.png`
                );
                //string concatenation <- what to search for
                //resDay.main.temp_max is a string, a string can be added before it to describe what it is
                temperatureCard.text("Temp: " + resDay.main.temp_max + String.fromCharCode(176));
                humidityCard.text("Humidity: " + resDay.main.humidity + "%");

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

    function storeCities(city) {
      //we have to add to an array of cities stored into localstorage
      /**
       * 1. Get the array from localstorage or set the variable as a new empty array
       * 2. parse the string into json as well (could be done on the same line as 1)
       * 3. push city into array
       * 4. set local storage as the modified array
       */
      const container = $("#localStorage");
      const div = $("<div>");
      const newButton = $("<button>");
      newButton.addClass("saveBtn");
      newButton.text(city);
      
      let cityArray = localStorage.getItem("cities"); 
      //returns undefined if there is no property in local storage called cities
      // let cityArray = JSON.parse(localStorage.getItem("cities")) || []
      //an item from localstorage that is undefined will have a length equal zero
      if (!cityArray) {
        cityArray = [];
      } else {
        //convert the string into JSON
        cityArray = JSON.parse(cityArray);
      }

      //cityArray is a city, so we can add items to it using .push()
      // .push() is a method of the Array object class
      if (!cityArray.includes(city)) {
        cityArray.push(city);
        if (cityArray.length > 5) {

          cityArray.shift();
          console.log(container.children()[0])
          let child = container.find(":first-child");
          container.find(":first-child")[0].remove()
        }

        div.append(newButton);
        container.append(div);
        //set the new cityArray as our reference in localStorage to cities
        //change cityArray into a string cause localStorage only accepts strings
        localStorage.setItem("cities", JSON.stringify(cityArray));
      }
    }

    function getCities() {
      const container = $("#localStorage");
      let cityArray = JSON.parse(localStorage.getItem("cities"));

      if (cityArray) {
        for (let i = 0; i < cityArray.length; i++) {

          if (i < 5) {
            const div = $("<div>");
            const newButton = $("<button>");
            newButton.addClass("saveBtn");
            newButton.text(cityArray[i]);
            div.append(newButton);
            container.append(div);
          } else {
            break;
          }
        }
      }
    }