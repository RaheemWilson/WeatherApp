const parishCoordinates = {
    Kingston : ["17.995147", "-76.7846006"],
    SaintElizabeth : ["18.0499998", "-77.7833302"],
    SaintMary : ["18.3166654", "-76.8999964"],
    SaintAndrew : ["18.0166666", "-76.8999964"],
    Clarendon : ["18.0", "-77.283"],
    SaintAnn : ["18.2", "-77.467"],
    SaintJames : ["18.3833318", "-77.8833298"],
    SaintCatherine : ["18.0", "-77.0"],
    Trelawny : ["18.3833318", "-77.6333308"],
    Manchester : ["18.0499998", "-77.5333312"],
    SaintThomas : ["17.8999964", "-76.4333316"],
    Portland : ["18.1333328", "-76.5333312"],
    Westmoreland : ["18.2333324", "-78.1499994"],
    Hanover : ["18.417", "-78.133"]

}

function processInfo(){
    const e = document.getElementById("parish");
    const location = e.options[e.selectedIndex].value;

    const landingPage = document.getElementById('landing-page')

    landingPage.style.display = "none"; 

    document.getElementsByClassName('loader')[0].style.display ="block"
    
    setTimeout(() => {
        document.getElementsByClassName('loader')[0].style.display ="none"
        document.getElementById('info').style.display = 'block';
        var coord = parishCoordinates[`${location.replace(/ +/g, "")}`]
        loadPage(coord[0], coord[1], location)
    }, 4000)

    
    
}

function loadPage(latitude, longitude, location){
    // const location = localStorage.getItem("location");
    const currentDay = document.getElementById("current-day");
    const currentWeather = document.getElementById("current-weather");
    const weatherDesc = document.getElementById("weather-description");
    const dailyWeather = document.getElementById("daily-weather-info");



    const apiKey = "a59944a7dfac4d02e97986183343ea57"

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { current, daily} = data;
            console.log(daily)
            const today = new Date();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            const date = `
                <h1 id="temp">Today, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}</h1>
            `
            const icon = `http://openweathermap.org/img/wn/${(current["weather"])[0]["icon"]}@2x.png`
            const iconDescription = (current["weather"])[0]["description"]
            const weather = `
                <h1>${Math.round(current["temp"])}</h1>
                <p>&deg</p>
                <img src="${icon}" alt=${iconDescription}>
            `
            const description = `
                <p>${iconDescription.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} | ${location}</p>
            `
            currentDay.innerHTML = date;
            currentWeather.innerHTML = weather;
            weatherDesc.innerHTML = description;
            
            var day = today.getDay();
            const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
            for(var i = 0; i < 4; i++){
                const li = document.createElement("li");
                li.classList.add("weather")
                ++day;
                if(day > 6){
                    day = 0;
                }
                const weatherIcon = `http://openweathermap.org/img/wn/${((daily[i])["weather"])[0]["icon"]}@2x.png`
                const dailyInfo = `
                    <img src=${weatherIcon} alt="weather">
                    <p>${((daily[i])["weather"])[0]["description"].replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
                    <p><strong>${days[day]}</strong></p>
                `
                li.innerHTML = dailyInfo;
                dailyWeather.appendChild(li);

            }

        })
        .then(error => {

        })
}


// localStorage.getItem(parish)
//         .then(coords => {
//            const { latitude, longitude } = coords;
//            loadPage(latitude, longitude)
//         })
//         .catch(error => {

//             const parishApiKey = "8d8b8e427afd3af726a82f704daa5a06"

//             const parishURL = `http://api.positionstack.com/v1/forward
//                                 ?access_key=${parishApiKey}
//                                 &query=${parish}, Jamaica
//                                 &country=JM
//                                 &limit=1`

//             fetch(parishURL)
//                 .then(res => {
//                     const results = res['data']['results'][0]
                    
//                     const lat = results['latitude']
//                     const long = results['longitude']

//                     localStorage.setItem(parish, { latitude : lat, longitude : long })

//                     loadPage(lat, long)
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })

        // })
