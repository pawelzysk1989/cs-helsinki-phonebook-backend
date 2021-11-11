require("dotenv").config();

import express from "express";
import { IncomingMessage } from "http";
import morgan from "morgan";

import PersonModel from "./models/person";

const app = express();
app.use(express.json());

morgan.token(
  "body",
  (req: IncomingMessage & { body: object | undefined }, _res) =>
    JSON.stringify(req.body)
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  PersonModel.find({}).then((persons) => res.json(persons));
});

app.get("/info", (req, res) => {
  PersonModel.count({}).then((len) => {
    res.send(`
      <p>Phonebook has info for ${len} people</p><p>${new Date()}</p>`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id: string = request.params.id;

  PersonModel.findById(id).then((person) => {
    response.json(person);
  });

  // response.statusMessage = `Person with id=${id} not found`;
  // response.status(404).end();
});

const generateId = () => Math.floor(Math.random() * 1000000);

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  PersonModel.create(body).then((person) => response.json(person));
});

app.delete("/api/persons/:id", (request, response) => {
  console.log(request.params.id);
  PersonModel.findByIdAndDelete(request.params.id).then((_) => {
    response.status(204).end();
  });
});

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const viteNodeApp = app;
