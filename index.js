"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteNodeApp = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var persons = [
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
var app = (0, express_1.default)();
app.use(express_1.default.json());
morgan_1.default.token("body", function (req, _res) {
    return JSON.stringify(req.body);
});
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms :body"
// { skip: (_req, _res) => process.env.NODE_ENV === "production" }
));
app.use(express_1.default.static("dist"));
app.get("/api/persons", function (req, res) {
    res.json(persons);
});
app.get("/info", function (req, res) {
    res.send("\n    <p>Phonebook has info for " + persons.length + " people</p><p>" + new Date() + "</p>");
});
app.get("/api/persons/:id", function (request, response) {
    var id = Number(request.params.id);
    var person = persons.find(function (note) { return note.id === id; });
    if (person) {
        response.json(person);
    }
    else {
        response.statusMessage = "Person with id=" + id + " not found";
        response.status(404).end();
    }
});
var generateId = function () { return Math.floor(Math.random() * 1000000); };
app.post("/api/persons", function (request, response) {
    var body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number is missing",
        });
    }
    var isNameUnique = !persons.find(function (person) { return person.name === body.name; });
    if (!isNameUnique) {
        return response.status(400).json({ error: "name must be unique" });
    }
    var person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };
    persons = persons.concat(person);
    response.json(person);
});
app.delete("/api/persons/:id", function (request, response) {
    var id = Number(request.params.id);
    persons = persons.filter(function (person) { return person.id !== id; });
    response.status(204).end();
});
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
exports.viteNodeApp = app;
