# **Rick & Morty API**

This project was based on the [Rick & Morty public API](https://rickandmortyapi.com/api), with the intent of learning to implement the backend of the project (Node.js + Express.js), will also following the correct programming guidelines.

The project serves all the CRUD methods (Create, Read, Update and Delete) for the characters from Rick & Morty.

The project also communicates with MongoDB for data handling. It was also pre-loaded with some data (Manually inserted from the refered public API).

## **Installing project**

In order to run this project, you will need to have Node.js installed on your machine.

If you do, just install all dependecies with the following command:

```sh
npm install
```

## **How to use project**

For the project to start, just run:

```sh
npm start
```

Or if you want to use [nodemon](https://www.npmjs.com/package/nodemon), run:

```sh
npm run startDev
```

The application will then be listing on the localhost (by default port 3000).

Afterwards you can call any available endpoint, like:
http://localhost:3000/api/character
