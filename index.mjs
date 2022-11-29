import pg from "pg";
import { users } from "./users/users.mjs";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidV4 } from "uuid";

const app = express();

app.use(bodyParser.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const { id, firstName, lastName, ip } = req.body;

  users.push({
    id,
    firstName,
    lastName,
    ip: uuidV4(),
  });

  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  const user = users.find((user) => {
    return user.id === Number(userId);
  });

  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  const user = users.filter((user) => {
    return user.id !== Number(userId);
  });

  res.json(user);
});

app.patch("/users/:id", (req, res) => {
  let userId = req.params.id;
  let { id, firstName, lastName, email, ip } = req.body;

  let u = users.map((user) => {
    if (user.id === userId) {
      return {
        id,
        firstName,
        lastName,
        email,
        ip,
      };
    }
    return user;
  });
  res.json(u);
});

app.listen(3001, () => {
  console.log("app is runing");
});
