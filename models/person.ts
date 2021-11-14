import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { Person } from '../types/Person';

const url = process.env.MONGODB_URI ?? '';

console.log('connecting to', url);
mongoose
  .connect(url)
  .then((_) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema<Person>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        const numberOfDigits = (value.match(/\d+/g) ?? []).reduce(
          (sum, curr) => sum + curr,
        ).length;
        return numberOfDigits >= 8;
      },
      message: (props) =>
        `Phone number must have at least 8 digits. Value sent: ${props.value}`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

export default mongoose.model('Person', personSchema);
