const key = "1026bbcaad5b47a48dc153630242202";
const baseUrl = "https://api.weatherapi.com/v1";
let searchForm = document.querySelector("#search-form");
let weatherLocation = document.querySelector(".location");




async function getWeather(location = "regina") {

  try {
    const response = await fetch(`${baseUrl}/current.json?key=${key}&q=${location}`, {mode: 'cors'});
    let data = await response.json();
    if(data.error) {
        console.log(data.error.message);
      return;
    } else {
      setCurrentWeather(data);
      return data;
    }

  } catch (error) {
    console.log(error);
  }

}



searchForm.addEventListener("submit", e => {
  e.preventDefault();
  let searchValue = document.querySelector("#search-input").value;
  getWeather(searchValue);
 
})


function setCurrentWeather (data) {
  console.log(data);
  let city = data.location.name;
  let region = data.location.region;
  let country = data.location.country;
  let lastUpdated = data.current.last_updated;
  document.querySelector(".description").innerHTML = data.current.condition.text;
  document.querySelector(".temp").innerHTML = data.current.temp_c;


  weatherLocation.innerHTML = `${city}, ${region}, ${country} As of ${lastUpdated}`

}

