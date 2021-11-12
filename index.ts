require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
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

app.get("/api/persons", (req, res, next) => {
  PersonModel.find({})
    .then((persons) => res.json(persons))
    .catch((err) => next(err));
});

app.get("/info", (_req, res, next) => {
  PersonModel.count({})
    .then((len) => {
      res.send(`
        <p>Phonebook has info for ${len} people</p><p>${new Date()}</p>`);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (request, response, next) => {
  PersonModel.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  PersonModel.create(body)
    .then((person) => response.json(person))
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  PersonModel.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  })
    .then((person) => response.json(person))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  PersonModel.findByIdAndDelete(request.params.id)
    .then((_) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

const errorMiddleware = (
  error: Error,
  _req: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const viteNodeApp = app;
