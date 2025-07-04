const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const locations = JSON.parse(fs.readFileSync("locations.json", "utf8"));
let index = 0;

app.get("/location", (req, res) => {
  const location = locations[index];
  index = (index + 1) % locations.length;
  res.json(location);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
