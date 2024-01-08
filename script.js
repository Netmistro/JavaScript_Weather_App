// Constants
const API_Key = "0b4dc57092b5fc8283887957647bb1f7";
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

// Event Listeners
formEl.addEventListener("submit", (e) => {
  // Prevent default behavior of page refreshing
  e.preventDefault();
  // Get the value of the input
  const cityValue = cityInputEl.value;
  // Function to get the weather data
  getWeatherData(cityValue);
});

// Functions
async function getWeatherData(cityValue) {
  // Fetch the data from the API using try catch
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_Key}&units=metric`
    );
    // Check if there was a network error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Push the data to JSON
    const data = await response.json();

    // Log the data
    console.log(data);

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels Like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${Math.round(data.main.humidity)}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;

    // Map through the array of the details and create a list item for each
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An Error has Occured, Please try again later!";

    // Map through the array of the details and create a list item for each
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
