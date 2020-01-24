import React, { useState } from 'react';


const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }


  const days = ["Sunday", "Monday", "Tuesay", "Wednesday", "Thursday", "Friday", "Saturday",];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];

  const dateBuilder = (d) => {
    let day = days[d.getDay()];
    let date = new Date().getDate();
    let month = months[d.getMonth()];
    let year = new Date().getFullYear();

    return `${day} ${date} ${month} ${year}`

  }
  return (

    // function backgroungToggle(temp) {
    //   if (typeof weather.main != "undefined" && weather.main.temp > 16){
    //   background = 'app warm'
    // }else{
    //   background = 'app'
    // };

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app' : 'app warm') : 'app'}>
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°c</div>
        <div className="weather">{weather.weather[0].main}</div>
          </div>
          
        </div>
        ) : ('')}

      </main>

    </div>
  );
}

export default App;
