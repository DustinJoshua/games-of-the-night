require("dotenv").config({ path: "./config.env" });
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const games = require("./routes/games");
const { cronScheduleApiPull } = require("./apiToDbUpdater");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to MongoDB..."))
  .catch(() => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/games", games);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
cronScheduleApiPull();
