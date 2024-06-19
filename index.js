const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "c74c14b2d66915aa8ebfe07bf9b511d8"; // Replace this with your API key

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Failed to fetch weather data. Please try again later.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // Units set to metric for Celsius
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the data for debugging
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
}

function displayWeatherInfo(data){
const {name: city,
       main: {temp, humidity},
       weather: [{description, id}]} = data;

card.textContent = "";
card.style.display = "flex";
const cityDisplay = document.createElement("h1");
const tempDisplay = document.createElement("p");
const humidityDisplay = document.createElement("p");
const descDisplay = document.createElement("p");
const weatherEmoji = document.createElement("p");
cityDisplay.textContent = city;
tempDisplay.textContent = `${((temp - 273.15) * (9/5) +32).toFixed(1)}°F`;
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descDisplay.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);
cityDisplay.classList.add("cityDisplay");
tempDisplay.classList.add("tempDisplay");
humidityDisplay.classList.add("humidityDisplay");
descDisplay.classList.add("descDisplay");
weatherEmoji.classList.add("weatherEmoji");
card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);
}


function getWeatherEmoji (weatherld){

switch(true){

case (weatherld >= 200 && weatherld < 300):

return" ⛈ ";

case (weatherld >= 300 && weatherld < 400):

return "🌧"

case (weatherld >= 500 && weatherld < 600):

return "🌧"

case (weatherld >= 600 && weatherld < 700):

return "❄";

case (weatherld >= 700 && weatherld < 800):

return "🌫";

case (weatherld === 800):

return "☀";

case (weatherld >= 801 && weatherld < 810):

return "☁"

default:

return "?";

}

}


function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.append(errorDisplay);
}
