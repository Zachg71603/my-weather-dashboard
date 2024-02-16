//declaring today date using moment.
moment().format("L");

//On click event that handles the users city search. I need to make that input
//relate to the api call and display in the currentweather div based on the city
//that is searched. Also saving the searched items to local storage.
$("#cityButton").on("click", function(event){
    event.preventDefault();
    //grabbing user input
    var cityInput = $("#city-input").val();
    //saving user input to local storage
    //Local storage working but overwriting key
    //every time a city is searched
    var textContent = $(this).siblings("#city-input").val();
    var storeArray = [];
    storeArray.push(textContent);
    localStorage.setItem("userInput", JSON.stringify(storeArray));

    //calling both functions on click of search button
    citySearch(cityInput);
    citysaveBtn();
})

//First setup a function that gets the weather api. Then that function will
//get the day's weather and eventually append those results to the 
//page in my currentweather div. 
function citySearch(cityname){
    //using weather api + cityname + my key to call this api.
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=2160410541d867a67171353419f6b95d";
    //5-day forecast call
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=2160410541d867a67171353419f6b95d";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(queryURL);
        //emptying div current weather
    $("#currentWeather").empty();
    //use for displaying date when i append api call
    let today = moment();
    var mainDate = today.format ("MMMM Do YYYY");
    console.log(mainDate);

    //create html elements to display parts of api call I want to display
    var cityName = $("<h2>").text(response.name);
    console.log(response.name);
    var displayDate = $("<p>").text(mainDate);
    console.log(displayDate);
    var temp = $("<p>").text("Temperature: " + response.main.temp + " \xB0");
    console.log(response.main.temp);
    var humidity = $("<p>").text("Humidity: " + response.main.humidity + " %");
    console.log(response.main.humidity);
    var wind =  $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
    console.log(response.wind.speed);
    var weatherIcon = response.weather[0].main;
    console.log(response.weather[0].main);
       //if else statements that display weather icons from openweathermap
       //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
       
       if (weatherIcon === "Clouds"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/02d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (weatherIcon === "Clear"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (weatherIcon === "Smoke"){
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/50d.png")
            currentIcon.attr("style", "height: 100px; width: 100px")
        } else if (currentweather === "Drizzle") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentweather === "Rain") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        } else if (currentweather === "Snow") {
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 100px; width: 100px");
        }

    var weatherDisplay = $("<div>");
        //appending all to div I created
    weatherDisplay.append(cityName, displayDate, temp, humidity, wind, currentIcon);
        //targeting html element
    $("#currentWeather").html(weatherDisplay);

var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=2160410541d867a67171353419f6b95d&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            //need uv value, coordinate variables above work
            $("#uv-display").empty();
           
            var uvResults = response.value;
            var uvBox = $("<button class='btn uvBtn'>").text("UV Index: " + uvResults);
      
            $("#uv-display").html(uvBox);

            if (uvResults <= 2){
                uvBox.attr("style", "background-color: green")
               }else if(uvResults <=5){
                uvBox.attr("style", "background-color: yellow")
               }else if(uvResults > 5) {
                   uvBox.attr("style", "background-color: red")
               }
        });
    },
      //I also need to make a call for the 5-day forecast which will display in the
//div "5day" and append those to the page. Need to figure out how to include
//weather icons based upon the weather that day
$.ajax({
    url: queryURLforecast,
    method: "GET"
}).then(function (response){
    console.log(response);
    //console.log(queryURLforecast)
    var results = response.list
    //need to empty display area as results are stacking
    $("#5day").empty();
    //looping through part of response I want
    for (var i = 0; i < results.length; i += 8){
        //creating area for forecast to show
        var fiveDay = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 140px; height: 180px;'>");
        var date = new Date (results[i].dt * 1000).toLocaleDateString('en-US');
        var temp2 = results[i].main.temp;
        var humid = results[i].main.humidity;

        //creating html for results
        var dateh4 = $("<h4 class = 'card-title'>").text(date);
        var temp2 = $("<p class = 'card-text card1'>").text ("Temp: " + temp2 + " \xB0");
        var humid = $("<p class = 'card-text card1'>").text("Humidity: " + humid + " %");

        fiveDay.append(dateh4, temp2, humid);

        $("#5day").append(fiveDay);
        }
    })
)};
citysaveBtn();

//Buttons that store saved data and display city name in there. Getting items from
//local storage
function citysaveBtn () {
    var lastSearch = JSON.parse(localStorage.getItem("userInput"));
    var searchDiv = $("<button class='btn-primary btn-outline-dark mt-1 bg-primary rounded' style='width: 165px;'>").text(lastSearch);
    var pastSearch = $("<div>");
    pastSearch.append(searchDiv)
    //using prepend so users search history displays in correct order
    $("#searchHistory").prepend(pastSearch);
    //on click for button that stores city searches and displays them
    $(searchDiv).click(function () {
        console.log($(this).text());
        citySearch($(this).text());
})
};