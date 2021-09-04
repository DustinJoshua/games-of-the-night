import React, { useEffect } from "react";
import GameCard from "./GameCard";
import styles from "./GamesList.module.css";
// import Raptors from "../content/images/Raptors.png";
// import Lakers from "../content/images/Lakers.png";
// import Hawks from "../content/images/Hawks.png";
// import Celtics from "../content/images/Celtics.png";
// import Nets from "../content/images/Nets.png";
// import Hornets from "../content/images/Hornets.png";
// import Bulls from "../content/images/Bulls.png";
// import Knicks from "../content/images/Knicks.png";
import { useState } from "react";
import axios from "axios";
import AppPagination from "./AppPagination";
import { paginate } from "../utils/paginate";
import FilterTeamSelect from "./FilterTeamSelect";

// const DUMMY_GAMES = [
//   {
//     id: 1,
//     homeTeam: "Toronto",
//     awayTeam: "LA",
//     homeImg: Raptors,
//     awayImg: Lakers,
//     rating: 5,
//     date: new Date("2019, 05, 19").toDateString(),
//   },
//   {
//     id: 2,
//     homeTeam: "Atlanta",
//     awayTeam: "Boston",
//     homeImg: Hawks,
//     awayImg: Celtics,
//     rating: 12,
//     date: new Date("2019, 05, 19").toDateString(),
//   },
//   {
//     id: 3,
//     homeTeam: "Charlotte",
//     awayTeam: "Brooklyn",
//     homeImg: Hornets,
//     awayImg: Nets,
//     rating: 2,
//     date: new Date("2019, 05, 18").toDateString(),
//   },
//   {
//     id: 4,
//     homeTeam: "Chicago",
//     awayTeam: "New York",
//     homeImg: Bulls,
//     awayImg: Knicks,
//     rating: -10,
//     date: new Date("2019, 05, 18").toDateString(),
//   },
// ];

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [totalGamesLoaded, setTotalGamesLoaded] = useState(0);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(async () => {
    try {
      const response = await axios.get("/api/games");
      setGames(response.data);
      setTotalGamesLoaded(response.data.length);
    } catch (error) {
      console.error(error);
    }
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
      <div className={styles.container}>
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
