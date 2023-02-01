class Weather {
    constructor(locationName, temperature, feelsLike, tempMin, tempMax) {
        this.locationName = locationName;
        this.temperature = Math.trunc(temperature) + '°C';
        this.feelsLike = feelsLike;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
    }
}

class WeatherService {
    async requestWeather(locationName) {
        const apiKey = '738b4e44b882a8119a242f281a4c0d0e';
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            return data;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: error.message,
                scrollbarPadding: false
            });
        }
    }

    async showWeather(locationName) {
        try {
            const data = await this.requestWeather(locationName);
            const weather = new Weather(data.name, data.main.temp, data.main.feels_like, data.main.temp_min, data.main.temp_max);
            $(".container").addClass("active");
            $(".forecast").css("display", "flex");
            console.log(data);
            if (data.weather[0].id >= 701 && data.weather[0].id <= 781) {
                document.querySelector(".weather-img").src = "./assets/weather-icons/Haze.svg";
            } else {
                document.querySelector(".weather-img").src = `./assets/weather-icons/${data.weather[0].main}.svg`;
            }
            document.querySelector(".location-name").innerHTML = weather.locationName;
            document.querySelector(".location-temp").innerHTML = weather.temperature;
        } catch (error) {
            console.error(error);
        }
    }
}

const weatherService = new WeatherService();
document.querySelector("#searchBtn").addEventListener("click", () => weatherService.showWeather(document.querySelector("#searchInp").value));  