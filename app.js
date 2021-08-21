window.addEventListener('load',()=> {
let long;
let lat;

let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let iconimg = document.querySelector(".icon");
let temperatureSection = document.querySelector(".temperature");
let temperatureSpan = document.querySelector(".temperature span");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
       long=position.coords.longitude;
       lat=position.coords.latitude;   
        const API_key =  "164f9a8193cbf430f847422c364b1ec3";
       
       const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}`;
       

       fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {temp} = data.main;                      //temperature
            const description = data.weather[0].main;
            const icon = data.weather[0].icon;
           
            
            //Set DOM elements from the API
            temperatureDegree.textContent = (temp - 273.15).toFixed(1);  //kelvin to celsius
            temperatureDescription.textContent = description;
            locationTimezone.textContent = data.name;

            //Formula for fahrenheit
            let fahrenheit = (((temp - 273.15) * 9/5) + 32).toFixed(0);

            //Set Icon
            
            iconimg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
           
            //Change temperature to celsius/fahrenheit
            temperatureSection.addEventListener("click", ()=>{
                if(temperatureSpan.textContent === "°F"){
                    temperatureSpan.textContent = "°C";
                    temperatureDegree.textContent = (temp - 273.15).toFixed(1);  //for celsius
                }else {
                    temperatureSpan.textContent = "°F";
                    temperatureDegree.textContent = fahrenheit;                  //for fahrenheit
                   
                }
            })
        });
    });

    }
    
});