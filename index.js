"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteNodeApp = void 0;
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var person_1 = __importDefault(require("./models/person"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
morgan_1.default.token("body", function (req, _res) {
    return JSON.stringify(req.body);
});
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(express_1.default.static("dist"));
app.get("/api/persons", function (req, res, next) {
    person_1.default.find({})
        .then(function (persons) { return res.json(persons); })
        .catch(function (err) { return next(err); });
});
app.get("/info", function (_req, res, next) {
    person_1.default.count({})
        .then(function (len) {
        res.send("\n        <p>Phonebook has info for " + len + " people</p><p>" + new Date() + "</p>");
    })
        .catch(function (err) { return next(err); });
});
app.get("/api/persons/:id", function (request, response, next) {
    person_1.default.findById(request.params.id)
        .then(function (person) {
        response.json(person);
    })
        .catch(function (err) { return next(err); });
});
app.post("/api/persons", function (request, response, next) {
    var body = request.body;
    person_1.default.create(body)
        .then(function (person) { return response.json(person); })
        .catch(function (err) { return next(err); });
});
app.put("/api/persons/:id", function (request, response, next) {
    var body = request.body;
    var id = request.params.id;
    person_1.default.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    })
        .then(function (person) { return response.json(person); })
        .catch(function (err) { return next(err); });
});
app.delete("/api/persons/:id", function (request, response, next) {
    person_1.default.findByIdAndDelete(request.params.id)
        .then(function (_) {
        response.status(204).end();
    })
        .catch(function (err) { return next(err); });
});
var errorMiddleware = function (error, _req, response, next) {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};
app.use(errorMiddleware);
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
exports.viteNodeApp = app;
