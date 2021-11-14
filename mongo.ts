import mongoose, { Schema, model, connect, connection, Model } from 'mongoose';

interface Person {
  name: string;
  number: string;
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.ria0w.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

connect(url);

const name = process.argv[3];
const number = process.argv[4];

const personSchema = new Schema<Person>({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const PersonModel = model<Person>('Person', personSchema);

if (name && number) {
  const person = new PersonModel({
    name,
    number,
  });

  person.save().then((pers) => {
    console.log(`added ${pers.name} number ${pers.number} to phonebook`);
    connection.close();
  });
} else {
  PersonModel.find({}).then((people) => {
    console.log('phonebook:');
    people.forEach((pers) => {
      console.log(pers.name, pers.number);
    });
    connection.close();
  });
}
