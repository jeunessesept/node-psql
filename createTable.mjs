import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
  user: "nodepsql_project_admin",
  host: "localhost",
  port: 5432,
  database: "nodepsql_project",
  password: `${process.env.PSQL_PROJECT_KEY}`
});

 const queryTable = `
  CREATE TABLE if not exists usersList (
      "id" serial,
      "firstName" varchar not null,
      "lastName" varchar  not null,
      "email" varchar not null,
      "ip" varchar 
  );
  `;



client
  .connect()
  .then(() => console.log("hello there"))
  .then(() => client.query('drop table if exists userslist'))  //=> plus besoin de cette ligne si "create table IF NOT EXISTS dans queryTable"
  .then(() => client.query(queryTable))
  .catch((error) => console.error(error))
  .finally(() => client.end())
