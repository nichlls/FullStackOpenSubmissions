import { useEffect, useState } from "react";

import axios from "axios";

import Search from "./components/Search";
import ShowCountry from "./components/ShowCountry";
import ShowCountries from "./components/ShowCountries";

const APIKEY = import.meta.env.VITE_WEATHER_APIKEY;

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
