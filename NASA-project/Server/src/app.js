const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./Routers/api");

//request will come to express and data is checked wether it is on json or not. and goes through express router;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Setting Logging MiddleWare Morgan

app.use(morgan("combined"));

//if we do this cors will allow all the request for any origin.
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
//all routes are handled on Routers folder
app.use("/v1", api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
