const Search = ({ search, handleSearch }) => {
  return (
    <p>
      Find countries <input value={search} onChange={handleSearch}></input>
    </p>
  );
};

export default Search;
