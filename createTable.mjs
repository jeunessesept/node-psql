import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
  user: "jiacintobranducci",
  host: "localhost",
  port: 5432,
  database: "nodepsql_project",
  password: `${process.env.PSQL_PROJECT_KEY}`
});

 const queryTable = `
  CREATE TABLE usersList (
      "id" int,
      "firstName" varchar not null,
      "lastName" varchar  not null,
      "email" varchar not null,
      "ip" varchar 
  );
  `;



client
  .connect()
  .then(() => console.log("hello there"))
  .then(() => client.query('drop table if exists userslist'))
  .then(() => client.query(queryTable))
  .catch((error) => console.error(error))
  .finally(() => client.end())
