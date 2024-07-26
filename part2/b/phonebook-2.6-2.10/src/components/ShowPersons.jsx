const ShowPersons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowPersons;
