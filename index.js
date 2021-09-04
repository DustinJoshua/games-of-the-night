require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const home = require("./routes/home");
const games = require("./routes/games");
const { cronScheduleApiPull } = require("./apiToDbUpdater");

const uri = process.env.MONGO_URI;
console.log(uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to MongoDB..."))
  .catch(() => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/", home);
app.use("/api/games", games);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
cronScheduleApiPull();
