import httpContext from "express-http-context";
import express, { Application } from "express";
import cors from "cors";

// Define routes and events
const routes = require("./routes");

// Start Express-js.
const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:3001"
  }
));

// Middleware token verified
app.use(httpContext.middleware);

app.use("/", routes);
// Start listen mode.

export default app;
