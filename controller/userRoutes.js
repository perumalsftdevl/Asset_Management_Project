import Express from "express";
import db from "../config/db.js"; // Import your database configuration

const router = Express.Router();

router.get("/getUsers", async (req, res) => {
  const { searchparams = "", sortby = "employee_id", sort = "asc" } = req.query;

  // Define the columns to search
  const searchColumns = [
    "first_name",
    "last_name",
    "email",
    "job_title",
    "department",
  ];

  // Build the WHERE clause
  const whereClause = searchColumns
    .map((column) => `${column} ILIKE $1`) /// insensitive search
    .join(" OR ");

  // Construct the SQL query
  const query = `
    SELECT * FROM employee_master
    WHERE ${whereClause}
    ORDER BY ${sortby} ${sort}`;

  try {
    // Execute the query
    const result = await db.query(query, [`%${searchparams}%`]);
    res.send(result); // Send the result back to the client
  } catch (error) {
    res.status(500).send({ msg: error.message || error }); // Handle errors
  }
});

export default router;
