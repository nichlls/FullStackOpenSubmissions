const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());

morgan.token("content", (request) => JSON.stringify(request.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :content"
  )
);

app.use(cors());

app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-1256",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const date = new Date();

  response.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    persons = persons.filter((person) => person.id !== id);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  // const maxId =
  //   persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  // return String(maxId + 1);

  let id = Math.random(1000) * 100;
  id = Math.floor(id).toString();
  return id;
};

app.post("/api/persons", (request, response) => {
  const data = request.body;

  const person = {
    id: generateId(),
    name: data.name,
    number: data.number,
  };

  if (persons.some((existingPerson) => existingPerson.name === person.name)) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  if (!person.name) {
    return response.status(400).json({ error: "Name must be supplied" });
  }

  if (!person.number) {
    return response.status(400).json({ error: "Number must be supplied" });
  }

  persons = persons.concat(person);

  response.json(person);
});

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const data = request.body;

  let person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).json({ error: "Person not found" });
  }

  if (!data.name) {
    return response.status(400).json({ error: "Name must be supplied" });
  }

  if (!data.number) {
    return response.status(400).json({ error: "Number must be supplied" });
  }

  person = {
    ...person,
    name: data.name,
    number: data.number,
  };

  persons = persons.map((p) => (p.id !== id ? p : person));

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
