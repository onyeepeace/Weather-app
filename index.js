const click = document.getElementById('click');
const city = document.getElementById('city');
const lagos = document.querySelector('.lagos');
const lagoso = document.querySelector('.lagoso');
const lekki = document.querySelector('.lekki');
const lekki2 = document.querySelector('.lekki2');

let see = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=8d56aec28d481e32e90ec65fb0a35df0`);

    const data = await response.json();

    console.log(data);

    lagos.innerHTML = data['main']['temp'];
    lagoso.innerHTML = data['weather'][0]['main'].toUpperCase();
    lekki.innerHTML = new Date(1000 * data.sys.sunrise);
    let now  = new Date();
    lekki2.innerHTML = dateBuilder(now);

    return data;
}

click.addEventListener('click', function(e) {
    e.preventDefault();
    see();
    city.value = '';
})

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }