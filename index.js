"use strict";
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const weatherTemperature = document.querySelector('.weather-temperature');
const weatherCondition = document.querySelector('.weather-condition');
const city = document.querySelector('.city');
const day = document.querySelector('.day');
const header = document.querySelector('header');
//weather icon
const weatherIcon = document.createElement('img');
weatherIcon.style.width = '50%';
//async function
const weatherInfo = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=8d56aec28d481e32e90ec65fb0a35df0`);
        const data = await response.json();
        weatherCondition.innerHTML = data.weather[0].main.toUpperCase();
        let temperature = Math.round(data.main.temp);
        // change temperature to farenheit
        let farenheit = Math.round((temperature * 1.8) + 32);
        // display temperature in both celsius and farenheit
        weatherTemperature.innerHTML = `${temperature}°C | ${farenheit}°F`;
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        let now = new Date();
        day.innerHTML = dateBuilder(now);
        // set weather icon according to weather condition
        switch (data.weather[0].main) {
            case 'Clouds':
                weatherIcon.src = 'images/sky.png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Rain':
                weatherIcon.src = 'images/rain(1).png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Thunderstorm':
                weatherIcon.src = 'images/storm.png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Clear':
                weatherIcon.src = 'images/sun.png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Smoke':
                weatherIcon.src = 'images/wind.png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Drizzle':
                weatherIcon.src = 'images/rain(4).png';
                weatherCondition.appendChild(weatherIcon);
                break;
            case 'Snow':
                weatherIcon.src = 'images/snow.png';
                weatherCondition.appendChild(weatherIcon);
                break;
            default:
                weatherIcon.src = 'images/sun(1).png';
                weatherCondition.appendChild(weatherIcon);
                break;
        }
        return data;
    }
    catch (error) {
        alert('City not found. Try a different city or check your internet connection.');
    }
};
search.addEventListener('click', function (e) {
    e.preventDefault();
    weatherInfo();
    searchInput.value = '';
    header.style.display = 'none';
    weatherCondition.style.paddingTop = '2rem';
    day.style.padding = '2rem 0';
});
// get current date
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}
