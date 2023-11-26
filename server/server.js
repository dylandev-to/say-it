const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// Sets up the environment variables.
require("dotenv").config({ path: path.join(__dirname, "environment", ".env") });
console.log("This is *" + process.env.ENV_DEV + "* environment");

// Instantiate an express app.
const app = express();

// Use cookie parser for getting the tokens
app.use(cookieParser())
// Body parser middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));
// Body parser middleware to handle URL encoded data
app.use(express.urlencoded({ extended: true }));
// HTTP request logger middleware and compression middleware to compress responses
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compression());
}

// Set up CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Replace with the actual URL you want to whitelist
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// Initializes the database
require("./environment/database");



// Routes section:

// Simple route for GET request
app.get("/", (req, res) => {
  res.send("Welcome to Say-It! our social media web application");
});
// Using the users route for handing multiple request about users
app.use("/api/users", require("./routes/users.server.route"));
// Using the auth route for handing the auth requests
app.use("/auth", require("./routes/auth.server.route"));
app.use("/api/posts", require("./routes/posts.server.route"))
// End of routes section



// Set the port for the application
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
