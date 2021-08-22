window.addEventListener('load',()=> {
let long;
let lat;

let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let iconimg = document.querySelector(".icon");
let temperatureSection = document.querySelector(".temperature");
let temperatureSpan = document.querySelector(".temperature span");

var video = document.getElementById("myVideo");
let source = document.getElementById("source");

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
            source.setAttribute("src","./videos/sunny1.mp4");
            video.load();
            video.play();
            let bgs = [{main:"Clouds",src:"./videos/cloudy.mp4",icon:"./animated/cloudy.svg"},{main:"Clear",src:"./videos/sunny1.mp4",icon:"./animated/day.svg"},{
                main:"Rain",src:"./videos/rain.mp4",icon:"./animated/rainy-7.svg"},{main:"Drizzle",src:"./videos/rain.mp4",icon:"./animated/rainy-4.svg"},{main:"Thunderstorm",src:"./videos/thunder.mp4",icon:"./animated/thunder.svg"},{main:"Snow",src:"./videos/snowy.mp4",icon:"./animated/snowy-6.svg"}
            ]
            bgs.every(function(bg){
                if(description===bg.main){
                    iconimg.src = bg.icon;
                    source.setAttribute("src",bg.src);
                    video.load();
                    video.play();
                    return false;
                
                } return true;
            })
            
        
        });
    });

    }
    
});