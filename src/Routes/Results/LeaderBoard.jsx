import React, { useState, useEffect } from "react";

function LeaderBoard({ leaderBoard, currCategoryName }) {
  const currLeaderBoard = leaderBoard[currCategoryName];
  const [fillerRows, setFillerRows] = useState(null);

  useEffect(() => {
    if (currLeaderBoard.length < 10) {
      setFillerRows(
        new Array(10 - currLeaderBoard.length).fill(
          <div>
            <p>--</p>
            <p>--</p>
            <p>--</p>
            <p>--</p>
          </div>
        )
      );
    } else if (fillerRows) {
      setFillerRows(null);
    }
  }, [currLeaderBoard]);

  const scores = currLeaderBoard.map((score, index) => {
    return (
      <div key={index}>
        <p>{score.username}</p>
        <p>{score.category}</p>
        <p>{score.difficulty}</p>
        <p>{score.score}</p>
      </div>
    );
  });

  return (
    <div className="card-container leaderboard">
      <h1>{currCategoryName}</h1>
      <div className="leaderboard-scores">
        <div className="leaderboard-labels">
          <p>Username:</p>
          <p>Category:</p>
          <p>Difficulty:</p>
          <p>Score:</p>
        </div>
        {scores}
        {fillerRows}
      </div>
    </div>
  );
}

export default LeaderBoard;
