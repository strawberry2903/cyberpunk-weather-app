
document.addEventListener("DOMContentLoaded", function () {
  // Use the global variable directly (make sure config.js is loaded before this!)
  const API_KEY = config.API_KEY;
  const button = document.getElementById("getWeatherBtn");
  const input = document.getElementById("cityInput");
  const output = document.getElementById("weatherResult");

  button.addEventListener("click", function () {
    const city = input.value.trim();
    if (!city) {
      output.innerText = "Please enter a city name.";
      return;
    }

    output.innerHTML = "⏳ Fetching your futuristic forecast...";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found!");
        }
        return response.json();
      })
      .then((data) => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const humidity = data.main.humidity;

        output.innerHTML = `
          <p>🌆 <strong>${city}</strong></p>
          <p>🌤️ Weather: ${weather}</p>
          <p>🌡️ Temp: ${temp}°C</p>
          <p>🤖 Feels Like: ${feelsLike}°C</p>
          <p>💧 Humidity: ${humidity}%</p>
        `;
      })
      .catch((error) => {
        output.innerText = `⚠️ ${error.message}`;
      });
  });
});
