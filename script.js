function fetchWeather() {
    var city = document.getElementById("city-input").value;
    var apiKey = 'e2f093c765e5eacc3f15243b94f958ac'; 
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var weatherData = document.getElementById("weather-data");
            var temperatureCelsius = (data.main.temp - 273.15).toFixed(2); 
            weatherData.innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Temperature: ${temperatureCelsius} °C</p> <!-- Display temperature in Celsius -->
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            updateTime(); 
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            var weatherData = document.getElementById("weather-data");
            weatherData.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>";
        });
}

function changeFontStyle() {
    var selectedFont = document.getElementById("font-style").value;
    var elements = document.getElementsByClassName("weather-container");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = selectedFont;
    }
}

function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    document.getElementById("current-time").innerText = `Current Time: ${hours}:${minutes}:${seconds}`;
}
setInterval(updateTime, 1000);
