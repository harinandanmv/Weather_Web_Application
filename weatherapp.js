const apiKey = '515418cffbb35006d8c224c8ce6c1f2c';

// Function to fetch weather data from OpenWeatherMap
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const feels_like = data.main.feels_like;

    weatherInfo.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Feels like: ${feels_like} °C</p>
    `;
}

// Event listener for the "Get Weather" button
document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeather(city);
    } else {
        document.getElementById('weatherInfo').innerHTML = '<p>Please enter a city name.</p>';
    }
});
