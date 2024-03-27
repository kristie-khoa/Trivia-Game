import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import LeaderBoard from "./LeaderBoard";
import ButtonRadio from "../../Components/ButtonRadio";

function Results() {
  const { leaderBoard, categoriesArr, currCategory, numCorrect } =
    useOutletContext();
  const [currCategoryName, setCurrCategoryName] = useState(currCategory.name);

  useEffect(() => {
    console.log(!null);
  }, []);

  const resultMessage = (
    <p>
      {numCorrect === 10
        ? "Perfect Score!"
        : numCorrect > 6
        ? "Great!"
        : numCorrect > 3
        ? "Good Effort!"
        : "You Can Do Better Than That!"}
    </p>
  );

  return (
    <div className="main-content results-page">
      <div className="result-message-container">
        {numCorrect ? (
          <>
            <h2>You scored {numCorrect}/10</h2>
            <h2>{resultMessage}</h2>
          </>
        ) : null}
      </div>
      <div className="leaderboard-categories">
        <ButtonRadio
          optionsArr={["Collective LeaderBoard", ...categoriesArr]}
          onClick={setCurrCategoryName}
          currSelected={currCategoryName}
        />
      </div>

      <LeaderBoard
        leaderBoard={leaderBoard}
        currCategoryName={currCategoryName}
      />

      <div className="next-button-container">
        <Link to="/Trivia-Game/">
          <button className="next-button">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Results;
