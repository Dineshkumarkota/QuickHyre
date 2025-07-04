const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Serve static files (HTML, CSS, JS) from the frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

const locations = JSON.parse(fs.readFileSync("locations.json", "utf8"));
let index = 0;

app.get("/location", (req, res) => {
  const location = locations[index];
  index = (index + 1) % locations.length;
  res.json(location);
});

// Serve index.html at root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
