//set temperature and city
function setTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#degree");
  tempToday.innerHTML = temperature;
  let city = document.querySelector("#city-today");
  city.innerHTML = response.data.name;
}
//get your current location
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be261a4a5f704a3b839452f102bc9548";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiLink).then(setTemperature);
}
//triget search a) with city name b) empty = current  location
function changeCity(event) {
  event.preventDefault();
  let apiKey = "be261a4a5f704a3b839452f102bc9548";
  let cityInput = document.querySelector("#city");
  if (cityInput.value.length > 0) {
    cityInput.innerHTML = cityInput.value;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
    axios.get(apiLink).then(setTemperature);
  } else {
    navigator.geolocation.getCurrentPosition(currentPosition);
  }
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

// let unitF = document.querySelector("#unit-f");
// unitF.addEventListener("click", function (event) {
//   event.preventDefault();
//   let value = document.querySelector("#degree");
// });

// let unitC = document.querySelector("#unit-c");
// unitC.addEventListener("click", function (event) {
//   event.preventDefault();

//   let value = document.querySelector("#degree");
// });
