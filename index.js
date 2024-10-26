const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

/*
Middleware for CORS and body parsing with JSON content type support for requests and responses respectively (app.use(cors()) and app.use(bodyParser.json()))
*/

app.use(cors());
app.use(bodyParser.json());

// In-memory database for storing person objects
let persons = [
  {
    id: "1",
    name: "Sam",
    age: "26",
    hobbies: [],
  },
]; //This is your in memory database

app.set("db", persons);
//TODO: Implement crud of person

/*
joi validation schema for person object with name, age and hobbies fields with validation rules and custom error messages for each field.
*/
const personSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  age: Joi.number().integer().min(0).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be a non-negative number",
    "any.required": "Age is required",
  }),
  hobbies: Joi.array().items(Joi.string()).required().messages({
    "array.base": "Hobbies must be an array",
    "any.required": "Hobbies are required",
  }),
});

// Middleware for validating person input data with the personSchema Joi schema.
const validatePerson = (req, res, next) => {
  const { error } = personSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};

// Routes
// GET route to retrieve all persons
app.get("/person", (req, res) => {
  res.json(Array.from(app.get("db")));
});

// GET route to retrieve a person by id
app.get("/person/:id", (req, res) => {
  const person = app.get("db").find((p) => p.id === req.params.id);

  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }

  res.json(person);
});

// POST route to create a new person
app.post("/person", validatePerson, (req, res) => {
  const id = uuidv4();
  const person = {
    id,
    ...req.body,
  };

  persons.push(person);
  res.status(200).json(person);
});

// PUT route to update an existing person by id
app.put("/person/:id", validatePerson, (req, res) => {
  const id = req.params.id;
  const personIndex = app.get("db").findIndex((p) => p.id === id);

  if (personIndex === -1) {
    return res.status(404).json({ error: "Person not found" });
  }

  const updatedPerson = {
    id,
    ...req.body,
  };

  persons[personIndex] = updatedPerson;
  res.json(updatedPerson);
});

// DELETE route to remove an existing person by id
app.delete("/person/:id", (req, res) => {
  const id = req.params.id;
  const personIndex = app.get("db").findIndex((p) => p.id === id);

  if (personIndex === -1) {
    return res.status(404).json({ error: "Person not found" });
  }

  persons.splice(personIndex, 1);
  res.status(204).send();
});

// Handle non-existing routes with a 404 status code
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error handling middleware to catch all errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server if the module is run directly (not imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
