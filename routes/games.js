const express = require("express");
const router = express.Router();
const { Game, validate } = require("../models/game");

router.get("/", async (req, res) => {
  const games = await Game.find({ date: { $lte: new Date() } })
    .sort("-date")
    .limit(100);
  res.send(games);
});

router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (!game) return res.status(404).send("Could not find game with given ID");
  res.send(game);
});

router.put("/upvote/:gameId", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const filter = { gameId: req.params.gameId };
  const update = { $inc: { rating: 1 } };
  Game.findOneAndUpdate(filter, update, function (err, response) {
    if (err) {
      res.json(0);
    } else {
      res.json(response.rating);
    }
  });
});

router.put("/downvote/:gameId", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const filter = { gameId: req.params.gameId };
  const update = { $inc: { rating: -1 } };
  Game.findOneAndUpdate(filter, update, function (err, response) {
    if (err) {
      res.json(0);
    } else {
      res.json(response.rating);
    }
  });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const game = new Game({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    rating: req.body.rating,
    date: req.body.date,
  });
  await game.save();
  res.send(game);
});

module.exports = router;
