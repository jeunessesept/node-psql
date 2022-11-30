import { request, response } from "express";
import pg from "pg";

const pool = new pg.Pool({
  user: "nodepsql_project_admin",
  host: "localhost",
  port: 5432,
  database: "nodepsql_project",
  password: `${process.env.PSQL_PROJECT_KEY}`,
});

export const getUsers = (request, response) => {
  pool.query("SELECT * FROM userslist", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getOneUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    `select * from userslist where id = $1`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const addUser = (request, response) => {
    const { id, firstName, lastName, email, ip } = request.body;
    pool.query(
        'insert into userslist values ($1, $2, $3, $4, $5) returning *',
        [
            id,
            firstName,
            lastName,
            email,
            ip
        ],
        (error, results) => {
            if(error) throw error;
            response.status(201).send("user added")
        }
    )

}

export const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(
        'delete from userslist where id = $1',
        [id],
        (error, results) => {
            if (error){
                throw error;
            }
            response.status(200).json(`User deleted with ID: ${id}`)
        }
    )
}

export const updateUser = (request, response) => {
    const id = parseInt(request, response);
    const { firstName } = request.body;

    pool.query(
        'update userslist set firstName = $1  where id = $2',
        [
            firstName,
            id
        ],
        (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).send(`User modified`)
        }
    )
} 