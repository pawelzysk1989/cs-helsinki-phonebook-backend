export type Person = {
  name: string;
  number: string;
};

export const isPerson = (candidate: any): candidate is Person => {
  return "name" in candidate && "number" in candidate;
};

const apply =
  <T>(val: T) =>
  <R>(fn: (x: T) => R) =>
    fn(val);

type Validator = (person: Person) => string | null;

const isEmpty = (value: string) => value === "";

const validateName = (person: Person) =>
  isEmpty(person.name) ? "Name cannot be empty" : null;

const validateNumber = (person: Person) =>
  isEmpty(person.number) ? "Number cannot be empty" : null;

const validators: Validator[] = [validateName, validateNumber];

export const validate = (person: Person): string | null | undefined =>
  validators.map(apply(person)).find(Boolean);
