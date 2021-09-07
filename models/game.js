const mongoose = require("mongoose");
const Joi = require("joi");
const findOrCreate = require("mongoose-find-or-create");

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  homeImg: {
    type: String,
  },
  awayImg: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
  },
});
gameSchema.plugin(findOrCreate);

const Game = mongoose.model("Game", gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    gameId: Joi.string().required(),
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    homeImg: Joi.string(),
    awayImg: Joi.string(),
    rating: Joi.number().required(),
    date: Joi.date(),
  });
  return schema.validate(game);
}

module.exports.Game = Game;
module.exports.validate = validateGame;
