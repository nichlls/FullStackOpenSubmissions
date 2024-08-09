import ShowCountry from "./ShowCountry";

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

export default ShowCountries;
