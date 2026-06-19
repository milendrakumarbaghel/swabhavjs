const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationButton = document.getElementById("locationButton");
const statusMessage = document.getElementById("statusMessage");
const locationName = document.getElementById("locationName");
const updatedTime = document.getElementById("updatedTime");
const weatherSymbol = document.getElementById("weatherSymbol");
const currentTemp = document.getElementById("currentTemp");
const conditionText = document.getElementById("conditionText");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const rainChance = document.getElementById("rainChance");
const forecastGrid = document.getElementById("forecastGrid");
const recentList = document.getElementById("recentList");

const geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
const forecastUrl = "https://api.open-meteo.com/v1/forecast";
const recentSearchesKey = "weatherAppRecentSearches";

const weatherCodes = {
    0: ["SUN", "Clear sky"],
    1: ["SUN", "Mainly clear"],
    2: ["MIX", "Partly cloudy"],
    3: ["CLD", "Overcast"],
    45: ["FOG", "Fog"],
    48: ["FOG", "Depositing rime fog"],
    51: ["DRZ", "Light drizzle"],
    53: ["DRZ", "Moderate drizzle"],
    55: ["DRZ", "Dense drizzle"],
    61: ["RAN", "Slight rain"],
    63: ["RAN", "Moderate rain"],
    65: ["RAN", "Heavy rain"],
    71: ["SNW", "Slight snow"],
    73: ["SNW", "Moderate snow"],
    75: ["SNW", "Heavy snow"],
    80: ["SHR", "Rain showers"],
    81: ["SHR", "Heavy showers"],
    82: ["SHR", "Violent showers"],
    95: ["STM", "Thunderstorm"],
    96: ["STM", "Thunderstorm with hail"],
    99: ["STM", "Heavy thunderstorm with hail"],
};

let recentSearches = getRecentSearches();

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = cityInput.value.trim();

    if (query) {
        searchCity(query);
    }
});

locationButton.addEventListener("click", useCurrentLocation);
renderRecentSearches();
loadDefaultWeather();

async function loadDefaultWeather() {
    await searchCity("Mumbai");
}

async function searchCity(query) {
    try {
        setLoading(true, `Searching weather for ${query}...`);

        const location = await getLocationFromSearch(query);
        const weather = await getWeather(location.latitude, location.longitude);

        renderWeather(location, weather);
        saveRecentSearch(location);
        cityInput.value = "";
        setStatus("");
    } catch (error) {
        setStatus(error.message);
    } finally {
        setLoading(false);
    }
}

async function useCurrentLocation() {
    if (!navigator.geolocation) {
        setStatus("Geolocation is not available in this browser.");
        return;
    }

    setLoading(true, "Finding your location...");

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const weather = await getWeather(latitude, longitude);
                const location = await getLocationFromCoordinates(latitude, longitude);

                renderWeather(location, weather);
                saveRecentSearch(location);
                setStatus("");
            } catch (error) {
                setStatus(error.message);
            } finally {
                setLoading(false);
            }
        },
        () => {
            setStatus("Location permission was denied or unavailable.");
            setLoading(false);
        }
    );
}

async function getLocationFromSearch(query) {
    const url = `${geocodingUrl}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Could not search for that location. Please try again.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No matching city found. Try a different search.");
    }

    return normalizeLocation(data.results[0]);
}

async function getLocationFromCoordinates(latitude, longitude) {
    const url = `${geocodingUrl}?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
        return {
            name: "Your Location",
            country: "",
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return {
            name: "Your Location",
            country: "",
            latitude,
            longitude,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }

    return normalizeLocation(data.results[0]);
}

async function getWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        timezone: "auto",
        forecast_days: "5",
    });
    const response = await fetch(`${forecastUrl}?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Weather data is unavailable right now. Please try again.");
    }

    return response.json();
}

function renderWeather(location, weather) {
    const current = weather.current;
    const currentCode = getWeatherCode(current.weather_code);

    locationName.textContent = formatLocationName(location);
    updatedTime.textContent = `Updated ${formatDateTime(current.time, weather.timezone)}`;
    weatherSymbol.textContent = currentCode[0];
    currentTemp.textContent = `${Math.round(current.temperature_2m)} C`;
    conditionText.textContent = currentCode[1];
    feelsLike.textContent = `${Math.round(current.apparent_temperature)} C`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    rainChance.textContent = `${current.precipitation_probability ?? weather.daily.precipitation_probability_max[0]}%`;

    renderForecast(weather.daily, weather.timezone);
}

function renderForecast(daily, timezone) {
    forecastGrid.innerHTML = "";

    daily.time.forEach((date, index) => {
        const forecastCard = document.createElement("article");
        const code = getWeatherCode(daily.weather_code[index]);
        const dayName = formatDay(date, timezone);

        forecastCard.className = "forecast-card";
        forecastCard.innerHTML = `
            <strong>${dayName}</strong>
            <span class="forecast-icon">${code[0]}</span>
            <span>${code[1]}</span>
            <strong>${Math.round(daily.temperature_2m_max[index])} C / ${Math.round(daily.temperature_2m_min[index])} C</strong>
            <span>${daily.precipitation_probability_max[index]}% rain</span>
        `;

        forecastGrid.appendChild(forecastCard);
    });
}

function normalizeLocation(location) {
    return {
        name: location.name,
        admin1: location.admin1 || "",
        country: location.country || "",
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone || "auto",
    };
}

function formatLocationName(location) {
    return [location.name, location.admin1, location.country].filter(Boolean).join(", ");
}

function formatDateTime(value, timezone) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
        hour: "numeric",
        minute: "2-digit",
        timeZone: timezone,
    }).format(new Date(value));
}

function formatDay(value, timezone) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
        timeZone: timezone,
    }).format(new Date(value));
}

function getWeatherCode(code) {
    return weatherCodes[code] || ["---", "Unknown conditions"];
}

function setLoading(isLoading, message = "") {
    searchForm.querySelector("button").disabled = isLoading;
    locationButton.disabled = isLoading;

    if (message) {
        setStatus(message);
    }
}

function setStatus(message) {
    statusMessage.textContent = message;
}

function saveRecentSearch(location) {
    const savedLocation = {
        label: formatLocationName(location),
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
        name: location.name,
        admin1: location.admin1,
        country: location.country,
    };

    recentSearches = [
        savedLocation,
        ...recentSearches.filter((item) => item.label !== savedLocation.label),
    ].slice(0, 5);

    localStorage.setItem(recentSearchesKey, JSON.stringify(recentSearches));
    renderRecentSearches();
}

function getRecentSearches() {
    try {
        return JSON.parse(localStorage.getItem(recentSearchesKey)) || [];
    } catch {
        return [];
    }
}

function renderRecentSearches() {
    recentList.innerHTML = "";

    if (recentSearches.length === 0) {
        recentList.textContent = "Your recent searches will appear here.";
        return;
    }

    recentSearches.forEach((location) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = location.label;
        button.addEventListener("click", async () => {
            try {
                setLoading(true, `Loading ${location.label}...`);
                const weather = await getWeather(location.latitude, location.longitude);
                renderWeather(location, weather);
                setStatus("");
            } catch (error) {
                setStatus(error.message);
            } finally {
                setLoading(false);
            }
        });

        recentList.appendChild(button);
    });
}
