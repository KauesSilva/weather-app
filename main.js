class Weather {
    constructor(locationName, temperature) {
        this._locationName = locationName,
        this._temperature = Math.trunc(temperature) + '°C'
    }
    get locationName() {
        return this._locationName;
    }
    set locationName(newLocationName) {
        this._locationName = newLocationName;
    }
    get temperature() {
        return this._temperature;
    }
    set temperature(newTemperature) {
        this._temperature = newTemperature;
    }
};

//Requesting openWeatherAPI data//
async function requestWeather(locationName) {
    const api_key = '738b4e44b882a8119a242f281a4c0d0e';
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${api_key}&units=metric`);
    let data = await response.json();
    return data.cod != 200 ? Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: data.message,
        scrollbarPadding: false
    }) : data;
};

//Showing openWeatherAPI data//
async function showWeather() {
    let data = await requestWeather(document.querySelector("#searchInp").value);
    weather = new Weather(data.name, data.main.temp);
    //Activating containter transitions with jQuery//
    $(".container").addClass("active");
    $(".forecast").css("display", "flex");
    console.log(data.weather);
    //Setting dinamic weather icon based on wheather name(rain, clear, snow...)//
    if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
        document.querySelector(".weather-img").src = "./assets/weather-icons/Haze.svg";
    } else {
        document.querySelector(".weather-img").src = `./assets/weather-icons/${data.weather[0].main}.svg`;
    }
    document.querySelector(".location-name").innerHTML = weather.locationName;
    document.querySelector(".location-temp").innerHTML = weather.temperature;
}
document.querySelector("#searchBtn").addEventListener("click", showWeather);