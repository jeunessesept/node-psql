import { users } from "./users/users.mjs";
import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
  user: "jiacintobranducci",
  host: "localhost",
  port: 5432,
  database: "nodepsql_project",
  password: `${process.env.PSQL_PROJECT_KEY}`,
});

client
  .connect()
  .then(() =>
    users.forEach((user) => {
      let { id, firstName, lastName, email, ip } = user;
      client.query("insert into userslist values ($1, $2, $3, $4, $5)", [
        id,
        firstName,
        lastName,
        email,
        ip,
      ]);
    })
  )

  .then(() => client.query("select * from userslist"))
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());
