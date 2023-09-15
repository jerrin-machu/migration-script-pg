const express = require("express");
const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "socialnetwork",
  user: "postgres",
  password: "password",
});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/posts", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM posts");

  res.send(`
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>lng</th>
                <th>lat</th>
            </tr>
        </thead>
        <tbody>

        ${rows
          .map((row) => {
            return `
            
            <tr>
                <td>${row.id}</td>
                <td>${row.loc.x}</td>
                <td>${row.loc.y}</td>
            </tr>
            `;
          })
          .join("")}
            
        <tbody>
        
        </table>

        <form method="POST">
            <h3>Add a new post</h3>
            <div>
                <label>lng</label>
                <input name="lng" />
            
            </div>
            <div>
                <label>lat</label>
                <input name="lat" />
            </div>

            <button type="submit"> Create Post  </button>
        </form>
        
        
        `);
});

app.post("/posts", async (req, res) => {
  const { lng, lat } = req.body;
  await pool.query("INSERT INTO posts (loc) VALUES ($1);", [
    `(${lat}, ${lng} )`,
  ]);
  res.redirect("/posts");
});

app.listen(3005, () => console.log("Server started on port 3005"));
