import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Home() {
  const {
    handleSetNumCorrect,
    handleSetCurrCategory,

    numCorrect,
  } = useOutletContext();

  return (
    <div className="main-content home-page">
      <h1 className="home-page-h1">Trivia Game</h1>
      <div className="home-page-buttons-container">
        <div className="home-page-buttons">
          <Link to="/Trivia-App/select">
            <button>Lets play</button>
          </Link>
          <Link to="/Trivia-App/results">
            <button
              onClick={() => {
                handleSetNumCorrect(0);
                console.log(numCorrect);
                handleSetCurrCategory("Collective LeaderBoard");
                //handleSetCurrCategory(leaderBoard["Collective LeaderBoard"].name);
              }}
            >
              LeaderBoard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
