import { users } from "./users/users.mjs";
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


//  const queryUsers = ` 
//      insert into userslist (id, firstName, lastName, email, ip)
//      values (1, 'Jiacinto', 'Branducci', 'bjzjz', '12343332')
//  `;

const dropTable = `drop table if exists userslist;`

client.query(dropTable, (err, res) => {
    if (err){
        console.error(err);
        return;
    }
    console.log("drop with success");
    client.end();
})


// client.query(queryUsers, (err, res) => {
//    if (err) {
//      console.error(err);
//      return;
//    }
//    console.log("add with success");
//    client.end();
//  });

client.connect()
.then(() => console.log("hello there"));
