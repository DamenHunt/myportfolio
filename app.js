

function openPopup() {
    const menuButton = document.querySelector('.menu-button')
    let popup = document.getElementById('popup')

    menuButton.style.display = 'none'
    popup.classList.add("open-popup")
}

function hidePopup() {
    const menuButton = document.querySelector('.menu-button')
    let popup = document.getElementById('popup')

    popup.classList.remove("open-popup")
    menuButton.style.display = 'flex'
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element));


// Time App

function show_clock(){

    let h = document.getElementsByClassName('hr')[0];
    let m = document.getElementsByClassName('min')[0];
    let s = document.getElementsByClassName('sec')[0];

    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    h.style.transform = `rotate(${30 * hours + minutes/2}deg)`;
    m.style.transform = `rotate(${6*minutes}deg)`;
    s.style.transform = `rotate(${6*seconds}deg)`;

}
setInterval(show_clock, 1000);


let time = document.getElementById("currentTime");
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);


// Weather App

const apiKey = '1a76dc9df1a484b7f0e70fc791dfd618';

const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    console.log(position)

    const response = await fetch(apiUrl)


    if(response.status == 404) {

        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } else { 

        var data = await response.json();

        console.log(data)

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round((data.main.temp * 1.8) + 32) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round((data.wind.speed)/1.609) + "mph";

        if(data.weather[0].main == "Clouds") { 
            weatherIcon.src = "images/clouds.png"
        } 
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png"
        } 
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
        } 
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
        } 
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
        }
        else if(data.weather[0].main == "Wind") {
            weatherIcon.src = "images/wind.png"
        }
        else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

navigator.geolocation.getCurrentPosition(checkWeather);

checkWeather();



