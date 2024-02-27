const key = "1026bbcaad5b47a48dc153630242202";
const baseUrl = "http://api.weatherapi.com/v1";



async function getWeather(location = "regina") {

  try {
    const response = await fetch(`${baseUrl}/current.json?key=${key}&q=${location}`, {mode: 'cors'});
    let data = await response.json();
  
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }

}

getWeather();