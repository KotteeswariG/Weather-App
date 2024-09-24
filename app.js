const apiKey = '710261564782e21ceeefd17fd0176f45';  // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name';
        weatherInfo.style.display = 'none';
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${city}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            errorMessage.textContent = '';  // Clear error message
        })
        .catch(error => {
            errorMessage.textContent = error.message || 'Error fetching weather data';
            weatherInfo.style.display = 'none';
        });
}

function displayWeather(data) {
    cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    weatherInfo.style.display = 'block';
}