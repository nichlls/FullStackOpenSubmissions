import ShowWeather from "./ShowWeather";
const APIKEY = import.meta.env.VITE_WEATHER_APIKEY;

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

export default ShowCountry;
