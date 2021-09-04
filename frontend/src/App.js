import GamesList from "./components/GamesList";
import Navbar from "./components/Header";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <GamesList />
    </div>
  );
}

export default App;
