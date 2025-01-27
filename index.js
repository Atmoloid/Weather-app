const button = document.querySelector("button");

button.addEventListener("click", () => {
    const city = getInput(); 
    if (city) {
        getInformation(city); 
    } else {
        console.log("Please insert a valid city.");
    }
});

function getInput() {
    const input = document.querySelector("input");
    return input.value.trim(); 
}

async function getInformation(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=SPUA37TG35B6P4ANLXQUXJAWH&contentType=json`, { mode: 'cors' });
        
        if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status} - ${response.statusText}`);
        }

        const cityData = await response.json();
        console.log(cityData);

        const cityInformation = {
            location: cityData.resolvedAddress,
            temperature: cityData.currentConditions.temp,
            conditions: cityData.currentConditions.conditions,
            humidity: cityData.currentConditions.humidity,
            precipitation: cityData.currentConditions.precip,
            sunriseTime: cityData.currentConditions.sunrise,
            sunsetTime: cityData.currentConditions.sunset,
            wind: cityData.currentConditions.windspeed,
            time: cityData.currentConditions.datetime,
            icon: cityData.currentConditions.icon
        };

        console.log(cityInformation);

        
        displayWeather(cityInformation);
    } catch (e) {
        console.error("Non è stato possibile trovare questa località, riprova: " + e.message);
    }
}

function displayWeather(info) {
    const forecastDiv = document.getElementById("forecast-div");
    const cityDiv = document.getElementById('cityDiv');
    const weatherDiv = document.getElementById('weatherIcon-div');
    const degreeDiv = document.getElementById('degree-div');
    const windSpeedDiv = document.getElementById('windSpeed-div');
    const humidityDiv = document.getElementById('humidity-div');

    
    cityDiv.style.height = "40px";
    cityDiv.style.width = "400px";
    cityDiv.style.color = "white";
    cityDiv.style.position = "absolute";
    cityDiv.style.bottom = "85%";
    cityDiv.style.left = "2%";
    cityDiv.textContent = info.location;
    cityDiv.style.fontSize = "25px";
    cityDiv.style.fontWeight = "bolder";
    cityDiv.style.display = "flex";
    cityDiv.style.alignItems = "end";

    weatherDiv.style.border = "5px solid white";
    weatherDiv.style.borderRadius = "10px";
    weatherDiv.style.height = "280px";
    weatherDiv.style.width = "400px";
    weatherDiv.style.position = "absolute";
    weatherDiv.style.bottom = "10%";
    weatherDiv.style.left = "2%";

    const weatherIcon = document.createElement('div');
    weatherIcon.style.display = "flex";
    weatherIcon.style.justifyContent = "center";
    weatherIcon.style.alignItems = "center";
    weatherIcon.style.height = "100%";
    weatherIcon.style.width = "100%";
    weatherIcon.style.fontSize = "400px";

    let svgContent = "";
    if (info.conditions.toLowerCase().includes("sun")) {
        svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='yellow' width='100' height='100'><circle cx='12' cy='12' r='5'/><path d='M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/></svg>`;
    } else if (info.conditions.toLowerCase().includes("cloud")) {
        svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray' width='100' height='100'><path d='M19 17H6a4 4 0 010-8 4.37 4.37 0 01.93.11 6 6 0 0111.14 0A4 4 0 0119 17z'/></svg>`;
    } else if (info.conditions.toLowerCase().includes("rain")) {
        svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='blue' width='100' height='100'><path d='M8 19c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm8-6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zM12 22c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2z'/></svg>`;
    } else if (info.conditions.toLowerCase().includes("snow")) {
        svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='100' height='100'><path d='M12 2v20m-7-7h14M5 5l14 14M19 5L5 19'/></svg>`;
    } else {
        svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='100' height='100'><circle cx='12' cy='12' r='10'/></svg>`;
    }
    weatherIcon.innerHTML = svgContent;
    weatherDiv.appendChild(weatherIcon);

    degreeDiv.style.border = "5px solid white";
    degreeDiv.style.borderRadius = "10px";
    degreeDiv.style.position = "absolute";
    degreeDiv.style.left = "50%";
    degreeDiv.style.top = "5%";
    degreeDiv.style.height = "70px";
    degreeDiv.style.width = "450px";
    degreeDiv.textContent = info.temperature + "°C";
    degreeDiv.style.fontSize = "50px";
    degreeDiv.style.color = "white";
    degreeDiv.style.display = "flex";
    degreeDiv.style.justifyContent = "center";
    degreeDiv.style.alignItems = "center";

    windSpeedDiv.style.border = "5px solid white";
    windSpeedDiv.style.borderRadius = "10px";
    windSpeedDiv.style.position = "absolute";
    windSpeedDiv.style.left = "50%";
    windSpeedDiv.style.top = "35%";
    windSpeedDiv.style.height = "70px";
    windSpeedDiv.style.width = "450px";
    windSpeedDiv.textContent = "Wind: " + info.wind + " km/h";
    windSpeedDiv.style.fontSize = "30px";
    windSpeedDiv.style.color = "white";
    windSpeedDiv.style.display = "flex";
    windSpeedDiv.style.justifyContent = "center";
    windSpeedDiv.style.alignItems = "center";

    humidityDiv.style.border = "5px solid white";
    humidityDiv.style.borderRadius = "10px";
    humidityDiv.style.position = "absolute";
    humidityDiv.style.left = "50%";
    humidityDiv.style.top = "65%";
    humidityDiv.style.height = "70px";
    humidityDiv.style.width = "450px";
    humidityDiv.textContent = "Humidity: " + info.humidity + "%";
    humidityDiv.style.fontSize = "30px";
    humidityDiv.style.color = "white";
    humidityDiv.style.display = "flex";
    humidityDiv.style.justifyContent = "center";
    humidityDiv.style.alignItems = "center";


    forecastDiv.appendChild(cityDiv);
    forecastDiv.appendChild(weatherDiv);
    forecastDiv.appendChild(degreeDiv);
    forecastDiv.appendChild(windSpeedDiv);
    forecastDiv.appendChild(humidityDiv);
}
