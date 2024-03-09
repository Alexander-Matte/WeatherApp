const key = "1026bbcaad5b47a48dc153630242202";
const baseUrl = "https://api.weatherapi.com/v1";
let searchForm = document.querySelector("#search-form");
let weatherDiv = document.querySelector("#weather-info");





async function getWeather(location = "regina") {

  try {
    const response = await fetch(`${baseUrl}/forecast.json?days=3&key=${key}&q=${location}`, {mode: 'cors'});
    let data = await response.json();
    if(data.error) {
        console.log(data.error.message);
      return;
    } else {
      setWeather(data);
      return data;
    }

  } catch (error) {
    console.log(error);
  }

}





searchForm.addEventListener("submit", e => {
  e.preventDefault();
  weatherDiv.replaceChildren();
  document.querySelector("#location").replaceChildren();
  let searchValue = document.querySelector("#search-input").value;
  getWeather(searchValue);
  searchForm.reset();
 
})



function setWeather (data) {
  let current = data.current;
  let location = data.location;
  let forcastDays = data.forecast.forecastday;
  let city = location.name;
  let region = location.region;
  let country = location.country;
  document.querySelector("#location").innerHTML = `<p>${city}, ${region}, ${country}</p>`;
  

  forcastDays.forEach(item => {
    let date = item.date;
    let temp = item.day.avgtemp_c;
    let icon = item.day.condition.icon;
    let description = item.day.condition.text;


    let weatherInfo = `
    <div class="d-flex justify-content-between align-items-center border rounded">
      <div class="d-flex flex-column">
        <p>${date}</p>
        <p>Temperature: ${temp}°C</p>
        <p>${description}</p>
      </div>
      <div>
        <img src="${icon}" alt="Weather Icon">
      </div>
    </div>


    `;

    let content = document.createElement("div").innerHTML = weatherInfo;
    weatherDiv.innerHTML += content;


  });



}

