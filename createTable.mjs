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

client.query(queryTable, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Table is successfully created");
  client.end();
});

client.connect()
.then(() => console.log("hello there"));
