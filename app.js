const apikey = "27c401f6e81e2277b2cc3fcf3e6aed1f";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ];
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
        weatherData.querySelector(
            ".temperature").textContent = `${temperature}°C`;

        weatherData.querySelector(
           ".description").textContent = `${description}`;
           if(description === "clouds") {
            document.body.style.backgroundImage ="url('assets/cloudy.jpg')";
        } else if (description === "clear sky") {
            document.body.style.backgroundImage ="url('assets/sunny.jpg')";
        } else if (description === "rain") {
            document.body.style.backgroundImage ="url('assets/rain.jpg')";
        } else if (description === "few clouds") {
            document.body.style.backgroundImage ="url('assets/fewClouds.jpg')";
        } else if (description === "scattered clouds") {
            document.body.style.backgroundImage ="url('assets/scatteredClouds.jpg')";
        } else if (description === "broken clouds") {
            document.body.style.backgroundImage ="url('assets/brokenClouds.jpg')";
        } else if (description === "overcast clouds") {
            document.body.style.backgroundImage ="url('assets/overcastClouds.jpg')";
        }


        weatherData.querySelector(
           ".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");

        
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";
        weatherData.querySelector(
            ".temperature").textContent = "";

        weatherData.querySelector(
           ".description").textContent = "Error: Please try again";

        weatherData.querySelector(
           ".details").innerHTML = "";
    }
}
