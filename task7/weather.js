// 🎯 عناصر بـ ID
let todayEl = document.getElementById("today");
let todayDateEl = document.getElementById("today-data");
let locationEl = document.getElementById("location");
let todayDegreeEl = document.getElementById("today-degree");
let todayIconEl = document.getElementById("today-icon");
let todayDescriptionEl = document.getElementById("today-description");
let humidtyEl = document.getElementById("humidty");
let windEl = document.getElementById("wind");
let compassEl = document.getElementById("compass");
let searchBarEl = document.getElementById("search-bar");

// 🎯 عناصر بـ Class (بيرجع Array-like [HTMLCollection] فلازم تتعامل معاها بفهرس أو لوب)
let nextDayEls = document.getElementsByClassName("nextDay"); // العناوين (Tuesday, Wednesday..)
let nextDayIconEls = document.getElementsByClassName("nextDay-icon"); // الأيقونات
let maxDegreeEls = document.getElementsByClassName("max-degree"); // أعلى درجة
let minDegreeEls = document.getElementsByClassName("min-degree"); // أقل درجة
let nextDayDescriptionEls = document.getElementsByClassName("nextDay-description"); // وصف الطقس
let apiResponse ;
let apidata ;
let days = ["Sunday" ,"Monday" ,"Tuesday","wednesday" ,"Thursday" ,"Friday" ,"Saturday"];
let months =["Jan" ,"Feb" ,"March", "April","May","June" ,"July","Aug","spet","Oct","Nov","Dec"];
let currentcity = "cairo";

async function getweatherData(city = "cairo") {
    try {
        apiResponse = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${city}&days=3`
        );
        apidata = await apiResponse.json();
        console.log(apidata);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
    displayTodayweather();
    displaynextdayweather();
}
getweatherData(currentcity);

function displayTodayweather() {
    let date = new Date();
    todayEl.innerHTML = days[date.getDay()];
    todayDateEl.innerHTML = date.getDate() + " " + months[date.getMonth()];
    locationEl.innerHTML = apidata.location.name;
    todayDegreeEl.innerHTML = `${apidata.current.temp_c} <sup>°</sup>C`;
    todayIconEl.setAttribute("src", `https:${apidata.current.condition.icon}`);
    todayDescriptionEl.innerHTML = apidata.current.condition.text;
    windEl.innerHTML = apidata.current.wind_kph;
    humidtyEl.innerHTML = apidata.current.humidity;
    compassEl.innerHTML = apidata.current.wind_dir;
}

function displaynextdayweather() {
    for (let i = 0; i < nextDayEls.length; i++) {
        let day = new Date(apidata.forecast.forecastday[i+1].date);
        nextDayEls[i].innerHTML = days[day.getDay()];
        nextDayIconEls[i].setAttribute("src", `https:${apidata.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegreeEls[i].innerHTML = apidata.forecast.forecastday[i+1].day.maxtemp_c;
        minDegreeEls[i].innerHTML = apidata.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescriptionEls[i].innerHTML = apidata.forecast.forecastday[i+1].day.condition.text;
    }
}

searchBarEl.addEventListener("keyup", function() {
    currentcity = searchBarEl.value;
    console.log(currentcity);
    getweatherData(currentcity);
});
