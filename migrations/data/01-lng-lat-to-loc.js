const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "socialnetwork",
  user: "postgres",
  password: "password",
});

pool
  .query(
    `
    UPDATE posts SET loc = POINT(lat,lng) WHERE loc IS NULL;

`
  )
  .then(() => {
    console.log("Update completed");
    pool.end();
  })
  .catch((err) => {
    console.log(error);
  });
