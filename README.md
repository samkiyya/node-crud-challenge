# Node CRUD Challenge

## Overview

This project implements a simple CRUD API for managing a list of persons using an in-memory database. It serves as a demonstration of RESTful API design using Node.js and Express.

## Implement Simple CRUD API

Your task is to implement a simple CRUD API using an in-memory database underneath.

## Details

1. The task must be solved using only **express** and the provided packages in **package.json**. Any additional libraries and packages **are prohibited**.
2. API path `/person`:
   - **GET** `/person` or `/person/${personId}` should return all persons or a person with the corresponding `personId`.
   - **POST** `/person` is used to create a record about a new person and store it in the database.
   - **PUT** `/person/${personId}` is used to update the record about an existing person.
   - **DELETE** `/person/${personId}` is used to delete the record about an existing person from the database.
3. Persons are stored as `objects` that have the following properties:
   - `id` — unique identifier (`string`, `uuid`) generated on the server side.
   - `name` — person's name (`string`, **required**).
   - `age` — person's age (`number`, **required**).
   - `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**).
4. Requests to non-existing endpoints (e.g., `/some-non/existing/resource`) should be handled.
5. Internal server errors should be handled and processed correctly.
6. Ensure the API is accessible by frontend apps hosted on a different domain (cross-site resource sharing).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/samkiyya/node-crud-challenge.git
   cd node-crud-challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm run start
   ```

2. Use API endpoints with tools like curl or Postman. For example:

   - To get all persons:

     ```bash
     curl http://localhost:3000/person
     ```

   - To create a new person:

     ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "age": 30, "hobbies": ["reading", "gaming"]}' http://localhost:3000/person
     ```

## Testing

This project uses Mocha for testing. To run the tests:

1. Ensure the server is not running or running on a different port to avoid conflicts.

2. Run the tests using:

   ```bash
   npm run test
   ```

This command will execute all the tests defined in the test files, allowing you to verify that your implementation is correct.

## Contributing

Feel free to submit a pull request for any improvements or features you would like to add!
