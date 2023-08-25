const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");
const express = require("express");
const app = express();

const PORT = 3000;

//new ssl certificate for development can be generated using openssl
// openssl req -x509 -newkey ras:4096 -nodes -keyout key.pem -out cert.pem days 365
// generating self certified certificate

app.use(helmet());
const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});
app.get("/secret", (req, res) => {
  return res.json({ message: "secret" });
});
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
