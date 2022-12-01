import pg from "pg";
import { users } from "./users/users.mjs";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidV4 } from "uuid";
import {
  getUsers,
  getOneUser,
  deleteUser,
  addUser,
  updateUser,
} from "./queries.mjs";

const app = express();

app.get('/', (request, response) => {
  response.send('api exercice')
})

app.use(bodyParser.json());

app.get("/users", getUsers);

app.get("/users/:id", getOneUser);

app.post("/users", addUser);

app.delete("/users/:id", deleteUser);

app.put("/users/:id", updateUser);

app.listen(3001, () => {
  console.log("app is runing");
});
