import { useEffect, useState } from "react";
import PersonService from "./services/Persons";

import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import ShowPersons from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newQuery, setNewQuery] = useState("");

  useEffect(() => {
    PersonService.get().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };

    PersonService.post(nameObject).then(() => {
      // update display
      setPersons(persons.concat(nameObject));
    });
    setNewName("");
    setNewNumber("");
  };

  const checkIfExists = (value) => {
    if (persons.some((person) => person.name === value)) {
      return true;
    }
  };

  const handleNameChange = (event) => {
    if (checkIfExists(event.target.value)) {
      alert(`${event.target.value} already exists in the phonebook.`);
      setNewName("");
      setNewNumber("");
    } else {
      setNewName(event.target.value);
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQuery = (event) => {
    setNewQuery(event.target.value);
  };

  const showPersons =
    newQuery !== ""
      ? persons.filter((person) =>
          person.name.toLocaleLowerCase().includes(newQuery.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter newQuery={newQuery} handleQuery={handleQuery} />
      </div>
      <div>
        <h2>Add a new</h2>
      </div>
      <AddPerson
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ShowPersons persons={showPersons} />
    </div>
  );
};

export default App;
