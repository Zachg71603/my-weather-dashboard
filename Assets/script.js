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