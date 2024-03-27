import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

function Root() {
  const categories = [
    { category: "General-Knowledge", apiCategoryID: 9 },
    { category: "Science", apiCategoryID: 17 },
    { category: "History", apiCategoryID: 23 },
    { category: "Film", apiCategoryID: 11 },
    { category: "Music", apiCategoryID: 12 },
    { category: "Sports", apiCategoryID: 21 },
    { category: "Animals", apiCategoryID: 27 },
    { category: "Geography", apiCategoryID: 22 },
  ];

  const categoriesArr = categories.map((category) => {
    return category.category;
  });

  let leaderBoardFrame = { "Collective LeaderBoard": [] };

  for (let i = 0; i < categoriesArr.length; i++) {
    leaderBoardFrame[categoriesArr[i]] = [];
  }
  const [difficulty, setDifficulty] = useState(null); //no cat to start
  const [numCorrect, setNumCorrect] = useState(
    JSON.parse(localStorage.getItem("numCorrect")) || 0
  ); //tracker of how many they got correct so that results page can render
  const [currCategory, setCurrCategory] = useState(
    //the current category so results can render, save to local storage in case they refresh
    JSON.parse(localStorage.getItem("currCategory")) || {
      name: "Collective LeaderBoard",
    }
  );
  const [leaderBoard, setLeaderBoard] = useState(
    //leaderboard of scores
    JSON.parse(localStorage.getItem("leaderBoard")) || leaderBoardFrame
  );
  const [user, setUser] = useState(
    // save username to local storage so they dont have to reselect themselves every time
    JSON.parse(localStorage.getItem("user")) || null
  );
  //   useEffect(() => {
  //     const category = categories.find(
  //       (category) => category.category === "General-Knowled"
  //     );
  //     console.log(!!category);
  //     //   localStorage.clear();
  //   }, []);

  //   useEffect(() => {
  //     localStorage.clear();

  //     //   console.log(profiles);
  //   }, []);

  const handleSetUser = (name) => {
    //set the user/current user.
    localStorage.setItem("user", JSON.stringify(name));
    console.log(`user set to ${name}`);
    setUser(name);
  };

  const updateLeaderBoard = (username, score, category, difficulty) => {
    let leaderBoardClone = { ...leaderBoard };

    const updateCategoryLeaderBoard = (category, name) => {
      let leaderBoardArr = leaderBoardClone[category];

      leaderBoardArr = [
        ...leaderBoardArr,
        {
          username: username,
          score: score,
          category: name || category,
          difficulty: difficulty,
        },
      ].sort((a, b) => b.score - a.score);

      if (leaderBoardArr.length > 10) {
        leaderBoardArr.pop();
      }

      leaderBoardClone[category] = leaderBoardArr;
    };

    updateCategoryLeaderBoard("Collective LeaderBoard", category);
    updateCategoryLeaderBoard(category);

    setLeaderBoard(leaderBoardClone);
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoardClone));

    console.log(leaderBoardClone);
  };

  const handleSetCurrCategory = (categoryName) => {
    //do i need to save to local storage?? check later
    // localStorage.setItem(
    //   "currCategory",
    //   JSON.stringify({ name: name, id: id })
    // );

    const category = categories.find(
      (category) => category.category === categoryName
    );
    if (category) {
      const apiCategoryID = category.apiCategoryID;
      localStorage.setItem(
        "currCategory",
        JSON.stringify({ name: categoryName, id: apiCategoryID })
      );

      setCurrCategory({ name: categoryName, id: apiCategoryID });
    } else {
      localStorage.setItem(
        "currCategory",
        JSON.stringify({ name: categoryName })
      );

      setCurrCategory({ name: categoryName });
    }
  };

  const handleSetNumCorrect = (numCorrect) => {
    console.log(numCorrect);
    localStorage.setItem("numCorrect", JSON.stringify(numCorrect));
    setNumCorrect(numCorrect);
  };

  return (
    <div className="layout">
      <Header user={user} />
      {/* <button onClick={() => updateLeaderBoard("kristie", 5, "Film", "hard")}>
        test
      </button> */}
      <Outlet
        context={{
          categoriesArr,
          categories,
          difficulty,
          setDifficulty,
          numCorrect,
          handleSetNumCorrect,
          setUser,
          leaderBoard,
          updateLeaderBoard,
          handleSetUser,
          user,
          //   profiles,
          //   handleAddProfile,
          currCategory,
          //   setCurrCategory,
          handleSetCurrCategory,
        }}
      />
    </div>
  );
}

export default Root;
