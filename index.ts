import express from "express";
import { IncomingMessage } from "http";
import morgan from "morgan";

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();
app.use(express.json());

morgan.token(
  "body",
  (req: IncomingMessage & { body: object | undefined }, _res) =>
    JSON.stringify(req.body)
);

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body"
    // { skip: (_req, _res) => process.env.NODE_ENV === "production" }
  )
);

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${
      persons.length
    } people</p><p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((note) => note.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `Person with id=${id} not found`;
    response.status(404).end();
  }
});

const generateId = () => Math.floor(Math.random() * 1000000);

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const isNameUnique = !persons.find((person) => person.name === body.name);

  if (!isNameUnique) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const viteNodeApp = app;
