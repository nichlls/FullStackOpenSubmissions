import { useEffect, useState } from "react";

import axios from "axios";

const APIKEY = import.meta.env.VITE_WEATHER_APIKEY;

const Search = ({ search, handleSearch }) => {
  return (
    <p>
      Find countries <input value={search} onChange={handleSearch}></input>
    </p>
  );
};

const ShowCountry = ({ country }) => {
  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
      </div>
      <div>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map((language) => (
            <li key={language[0]}>{language[1]}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} />
      </div>
      <div>
        <ShowWeather
          apikey={APIKEY}
          city={country.capital[0]}
          latitude={country.latlng[0]}
          longitude={country.latlng[1]}
        />
      </div>
    </div>
  );
};

const ShowCountries = ({ countries, handleShowCountry }) => {
  try {
    if (countries.length >= 10) {
      return <p>Too many matches, include more characters</p>;
    } else if (countries.length === 1) {
      return <ShowCountry country={countries[0]} />;
    } else if (countries.length === 0) {
      return <p>No matches</p>;
    } else {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              <p>
                {country.name.common}{" "}
                <button onClick={() => handleShowCountry(country)}>Show</button>
              </p>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
};

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

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showCountry, setShowCountry] = useState(false);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Error when fetching: ", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setShowCountry(false);
  };

  const showCountries =
    search !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      : countries;

  const handleShowCountry = (country) => {
    setShowCountry(country);
  };

  return (
    <>
      <div>
        <Search search={search} handleSearch={handleSearch} />
      </div>
      <div>
        {showCountry ? (
          <>
            <ShowCountry country={showCountry} />
          </>
        ) : (
          <ShowCountries
            countries={showCountries}
            handleShowCountry={handleShowCountry}
          />
        )}
      </div>
    </>
  );
};

export default App;
