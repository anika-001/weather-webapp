window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationtimezone=document.querySelector('.location-timezone');
    let temperatureSection=document.querySelector('.temperature');
    let temperatureSpan=document.querySelector('.temperature span');
    let locationIcon=document.querySelector('.weather-icon');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy="https://cors-anywhere.herokuapp.com/"
            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=your-api-key:)`;

            fetch(api)
             .then((response)=> {
                 return response.json();

             })
             .then(data=>{
                 
                 const {feels_like}=data.main;
                 const{description}=data.weather[0];
                 const {icon}=data.weather[0];

                
                 temperatureDegree.textContent= feels_like;
                 temperatureDescription.textContent=description;
                 locationtimezone.textContent=data.name;
                 locationIcon.innerHTML=`<img src="icons/${icon}.png"></img>`;
                 //tocel
                 let celsius=(feels_like-273);
                 temperatureSection.addEventListener('click',()=>{
                     if(temperatureSpan.textContent=="K"){
                         temperatureSpan.textContent="C";
                         temperatureDegree.textContent=Math.floor(celsius);
                     }
                     else{
                        temperatureSpan.textContent="K";
                        temperatureDegree.textContent=feels_like;
                     }
                 })
                 console.log(data);

             });
        });



    }
 
});
