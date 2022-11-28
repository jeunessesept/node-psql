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
      "firstName" varchar (10) not null,
      "lastName" varchar (20) not null,
      "email" varchar not null,
      "ip" varchar (30)
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
