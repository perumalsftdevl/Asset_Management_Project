import pgPromise from "pg-promise";

// Initialize pg-promise
const pgp = pgPromise();

const obj = {
  host: "localhost", // server name or IP address
  port: 5432,
  database: "ams1",
  user: "postgres",
  password: "123456",
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

// Create the database instance
const db = pgp(obj);
db.connect()
  .then((obj) => {
    obj.done(); // success, release connection
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("ERROR:", error.message || error);
  });

export default db;
