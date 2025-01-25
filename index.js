const button = document.querySelector("button");

button.addEventListener("click", () => {
    const city = getInput(); 
    if (city) {
        getInformation(city); 
    } else {
        console.log("Per favore, inserisci una città valida.");
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

        // Mostra le informazioni nel DOM
        displayWeather(cityInformation);
    } catch (e) {
        console.error("Non è stato possibile trovare questa località, riprova: " + e.message);
    }
}

function displayWeather(info) {
    
}

