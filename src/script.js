// In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let datetime = document.querySelector("span.datetime");
datetime.innerHTML = `${day} ${hour}:${minutes}`;

// Show the temperature
function displayTemp(response) {
  console.log(response);
  // display city name
  let displaySearch = document.querySelector("#city");
  displaySearch.innerHTML = response.data.name;
  // temperature
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = ` ${temp}°C`;
  // wind
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  // humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  // maximum temperature
  let maxtemp = document.querySelector("#maxtemp");
  maxtemp.innerHTML = Math.round(response.data.main.temp_max);
  // minimum temperature
  let mintemp = document.querySelector("#mintemp");
  mintemp.innerHTML = Math.round(response.data.main.temp_min);
  // description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
}

// Search for a city
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "da4354ccc4b5c937168c50391a787c99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchcity = document.querySelector("#citysearch");
searchcity.addEventListener("submit", search);

// Search for current location

function searchLocation(position) {
  let apiKey = "da4354ccc4b5c937168c50391a787c99";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchCurrentLocation = document.querySelector("#searchcurrent");
searchCurrentLocation.addEventListener("submit", getCurrentLocation);
