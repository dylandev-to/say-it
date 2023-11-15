const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

// Sets up the environment variables.
require("dotenv").config({ path: path.join(__dirname, "environment", ".env") });
console.log("This is *" + process.env.ENV_DEV + "* environment");

// Instantiate an express app.
const app = express();

// Body parser middleware to parse JSON bodies
app.use(express.json());
// Body parser middleware to handle URL encoded data
app.use(express.urlencoded({ extended: true }));
// HTTP request logger middleware and compression middleware to compress responses
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compression());
}



// Simple route for GET request
app.get("/", (req, res) => {
  res.send("Welcome to Say-It! our social media web application");
});

// Routes section: 

// Using the users route for handing multiple request about users
app.use("/api/users", require("./routes/users.server.route"))
// Using the auth route for handing the auth requests
app.use("/auth", require("./routes/auth.server.route"))

// End of routes section

require("./environment/database")

// Set the port for the application
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
