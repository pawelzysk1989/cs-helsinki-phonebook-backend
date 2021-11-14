"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
if (process.argv.length < 3) {
    console.log("Please provide the password as an argument: node mongo.js <password>");
    process.exit(1);
}
var password = process.argv[2];
var url = "mongodb+srv://fullstack:" + password + "@cluster0.ria0w.mongodb.net/phonebook-app?retryWrites=true&w=majority";
(0, mongoose_1.connect)(url);
var name = process.argv[3];
var number = process.argv[4];
var personSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
});
var PersonModel = (0, mongoose_1.model)("Person", personSchema);
if (name && number) {
    var person = new PersonModel({
        name: name,
        number: number,
    });
    person.save().then(function (pers) {
        console.log("added " + pers.name + " number " + pers.number + " to phonebook");
        mongoose_1.connection.close();
    });
}
else {
    PersonModel.find({}).then(function (people) {
        console.log("phonebook:");
        people.forEach(function (pers) {
            console.log(pers.name, pers.number);
        });
        mongoose_1.connection.close();
    });
}
