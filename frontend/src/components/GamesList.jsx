import React, { useEffect } from "react";
import GameCard from "./GameCard";
import { useState } from "react";
import axios from "axios";
import AppPagination from "./AppPagination";
import { paginate } from "../utils/paginate";
import FilterTeamSelect from "./FilterTeamSelect";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: "900px",
    alignContent: "center",
    margin: "auto",
    paddingTop: "1rem",
    backgroundImage:
      "linear-gradient(to right, rgb(61, 5, 61), rgb(114, 40, 184), rgb(61, 5, 61))",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    borderRadius: "8px 8px 0px 0px",
  },
}));

const GamesList = () => {
  const [games, setGames] = useState([]);
  // const [totalGamesLoaded, setTotalGamesLoaded] = useState(0);
  const [gamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("");

  const classes = useStyles();

  // useEffect(async () => {
  //   try {
  //     const response = await axios.get("/api/games");
  //     setGames(response.data);
  //     // setTotalGamesLoaded(response.data.length);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/games");
      setGames(response.data);
      // setTotalGamesLoaded(response.data.length);
    }
    fetchData();
  }, []);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredGames =
    selectedTeam === ""
      ? games
      : games.filter(
          (g) => g.homeTeam === selectedTeam || g.awayTeam === selectedTeam
        );

  const paginatedGames = paginate(filteredGames, currentPage, gamesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <FilterTeamSelect
        onTeamChange={handleTeamChange}
        selectedTeam={selectedTeam}
      />
      <div className={classes.container}>
        {paginatedGames.map((game) => (
          <GameCard
            key={game.gameId}
            gameId={game.gameId}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            homeImg={game.homeImg}
            awayImg={game.awayImg}
            rating={game.rating}
            date={game.date}
          />
        ))}
      </div>
      <AppPagination
        totalGames={filteredGames.length}
        pageSize={gamesPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default GamesList;
