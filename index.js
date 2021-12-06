let apiKey = "be261a4a5f704a3b839452f102bc9548";
//set temperature and city
function setTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#degree");
  tempToday.innerHTML = temperature;
  let city = document.querySelector("#city-today");
  city.innerHTML = response.data.name;
  let humidityElem = document.querySelector("#humidity");
  humidityElem.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}
//get your current location
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiLink).then(setTemperature);
}
//triget search a) with city name b) empty = current  location
function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  if (cityInput.value.length > 0) {
    cityInput.innerHTML = cityInput.value;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiLink).then(setTemperature);
  } else {
    navigator.geolocation.getCurrentPosition(currentPosition);
  }
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
//Set current time
function getTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let timeNow = new Date();
  let time = timeNow.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let message = `${days[timeNow.getDay()]} ${time}`;
  return message;
}

let enterCity = document.querySelector("#enter-city");
enterCity.addEventListener("submit", changeCity);

let date = document.querySelector("#date");
date.innerHTML = getTime();

currentLocation();

let unitF = document.querySelector("#unit-f");
unitF.addEventListener("click", function (event) {
  event.preventDefault();
  let value = document.querySelector("#degree");
  let fahrenheit = (value.innerHTML * 9) / 5 + 32;
  let value.innerHTML = Math.round(fahrenheit)
});

let unitC = document.querySelector("#unit-c");
unitC.addEventListener("click", function (event) {
  event.preventDefault();
  let value = document.querySelector("#degree");
  let celsius = ((value.innerHTML - 32) * 5) / 9;
  value.innerHTML = Math.round(celsius);
});
