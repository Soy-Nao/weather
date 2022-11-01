import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [grados, setGrados] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;


      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e2612daabdffe3c8153f204c566798e1`
        )
        .then((res) => setWeather(res.data));
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  console.log(weather);

  let gradosC = Math.trunc(weather.main?.temp - 273.15);
  let gradosF = Math.trunc(1.8*(weather.main?.temp - 273.15) + 32);

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <br />
        <h3>
          City {weather.name}, {weather.sys?.country}
        </h3>
        <div className="information">
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <br />
            <h2>{grados ? gradosF + "° F" : gradosC + "° C"}</h2>
          </div>

          <div>
            <p className="climate">"{weather.weather?.[0].description}"</p>
            <br />
            <p>
              <i className="fa-solid fa-wind"></i> {"   "} Wind speed:{"   "}
              <b>{weather.wind?.speed} m/s</b>
            </p>
            <br />
            <p>
              <i className="fa-solid fa-cloud"></i> Clouds:{"   "}
              <b>{weather.clouds?.all}%</b>
            </p>
            <br />
            <p>
              <i className="fa-solid fa-temperature-three-quarters"></i>{" "}
              Pressure:
              {"   "}
              <b>{weather.main?.pressure} mb</b>
            </p>
          </div>
        </div>
        <button onClick={() => setGrados(!grados)}>Degrees F°/C°</button>
      </div>
    </div>
  );
}

export default App;
