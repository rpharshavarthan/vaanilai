const api = {
    key: "0481a08c0386995225c2395604b19cb1",
    base: "http://api.openweathermap.org/data/2.5/",
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', checkKey);
function checkKey(event){
    if(event.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let date = document.querySelector('.location .date');
    date.innerHTML = datebuilder();
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>&#xb0;C</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;
    let hilow = document.querySelector('.current .hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_max)} &#xb0;C / ${Math.round(weather.main.temp_min)} &#xb0;C`;
}
function datebuilder(){
    let now = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = now.getDate();
    if (date < 10) date = `${'0' + date}`;
    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}