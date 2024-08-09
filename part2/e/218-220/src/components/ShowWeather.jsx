import { useEffect, useState } from "react";

import axios from "axios";

const ShowWeather = ({ apikey, city, latitude, longitude }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const url = `https://api.pirateweather.net/forecast/${apikey}/${latitude},${longitude}`;

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log("Error getting weather data: ", error);
      });
  }, []);

  if (!weather) {
    return <p>No weather data available.</p>;
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Currently: {weather.currently.summary}</p>
      <p>Temperature: {weather.currently.temperature}°F</p>
      <p>Wind: {weather.currently.windSpeed} m/s</p>
    </div>
  );
};

export default ShowWeather;
