import { useEffect, useState } from "react";

import axios from "axios";

const Search = ({ search, handleSearch }) => {
  return (
    <div>
      <p>
        Find countries <input value={search} onChange={handleSearch}></input>
      </p>
    </div>
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
    </div>
  );
};

const ShowCountries = ({ countries }) => {
  try {
    if (countries.length >= 10) {
      return <p>Too many matches, include more characters</p>;
    } else if (countries.length === 1) {
      return <ShowCountry country={countries[0]} />;
    } else {
      return (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("erorr when fetching: ", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const showCountries =
    search !== ""
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      : countries;

  return (
    <>
      <div>
        <Search search={search} handleSearch={handleSearch} />
      </div>
      <div>
        <ShowCountries countries={showCountries} />
      </div>
    </>
  );
};

export default App;
