const click = document.getElementById('click');
const city = document.getElementById('city');
const lagos = document.querySelector('.lagos');
const lagoso = document.querySelector('.lagoso');
const lekki = document.querySelector('.lekki');
const lekki2 = document.querySelector('.lekki2');
const header = document.querySelector('header');

// weather icon
var imgy = document.createElement('img');
imgy.style.width = '50%';

// async function
let see = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=8d56aec28d481e32e90ec65fb0a35df0`);

        const data = await response.json();

        lagoso.innerHTML = data.weather[0].main.toUpperCase();
        let temperature = `${Math.round(data.main.temp)}`;
        // change temperature to farenheit
        let farenheit = Math.round((temperature * 1.8) + 32);
        // display temperature in both celsius and farenheit
        lagos.innerHTML = `${temperature}°C | ${farenheit}°F`;
        lekki.innerHTML = `${data.name}, ${data.sys.country}`;
        let now  = new Date();
        lekki2.innerHTML = dateBuilder(now);

        // set weather icon according to weather condition
        switch (data.weather[0].main) {
            case 'Clouds':
                imgy.src = 'images/sky.png';
                lagoso.appendChild(imgy);
                break;
        
            case 'Rain':
                imgy.src = 'images/rain(1).png';
                lagoso.appendChild(imgy);
                break;

            case 'Thunderstorm':
                imgy.src = 'images/storm.png';
                lagoso.appendChild(imgy);
                break;

            case 'Clear':
                imgy.src = 'images/sun.png';
                lagoso.appendChild(imgy);
                break;

            case 'Smoke':
                imgy.src = 'images/wind.png';
                lagoso.appendChild(imgy);
                break;

            case 'Drizzle':
                imgy.src = 'images/rain(4).png';
                lagoso.appendChild(imgy);
                break;

            case 'Snow':
                imgy.src = 'images/snow.png';
                lagoso.appendChild(imgy);
                break;

            default:
                imgy.src = 'images/sun(1).png';
                lagoso.appendChild(imgy);
                break;
        }

        return data;
    }
    
    catch (error) {
        alert('City not found. Try a different city or check your internet connection.');
    }
}

click.addEventListener('click', function(e) {
    e.preventDefault();
    see();
    city.value = '';
    header.style.display = 'none';
    lagoso.style.paddingTop = '2rem';
    lekki2.style.padding = '2rem 0';
})

// get current date
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}