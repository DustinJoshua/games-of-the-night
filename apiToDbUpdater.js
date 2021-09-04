const cron = require("node-cron");
const axios = require("axios");
const { Game } = require("./models/game");

//Schedules an Api call to ensure the database is up to date.  This is just a cost reducing measure.
function cronScheduleApiPull() {
  cron.schedule("30 12,14,16,17,18,19,20,21,22,23 * * *", async () => {
    console.log("started cron");
    const options = {
      method: "GET",
      url: "https://api-nba-v1.p.rapidapi.com/games/seasonYear/2021",
      headers: {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_NBA_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const games = response.data.api.games;
        const promises = games.map((gameData) => {
          return {
            gameId: gameData.gameId,
            homeTeam: gameData.hTeam.fullName,
            awayTeam: gameData.vTeam.fullName,
            homeImg: gameData.hTeam.logo,
            awayImg: gameData.vTeam.logo,
            date: gameData.startTimeUTC,
            rating: 0,
          };
        });
        //compares the new array of game objects to the DB and adds new documents if they don't exist already.
        console.log("promises", promises);
        Promise.all(promises).then(function (transformedGames) {
          transformedGames.forEach((game) => {
            Game.findOrCreate(
              { gameId: game.gameId },
              {
                homeTeam: game.homeTeam,
                awayTeam: game.awayTeam,
                homeImg: game.homeImg,
                awayImg: game.awayImg,
                date: game.date,
                // rating: game.rating,
              },
              (err, result) => {
                if (err) {
                  return console.log(err);
                }
              }
            );
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log("cron");
  });
}
module.exports.cronScheduleApiPull = cronScheduleApiPull;
