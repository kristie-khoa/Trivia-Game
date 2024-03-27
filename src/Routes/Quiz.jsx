import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonRadio from "../Components/ButtonRadio";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import useDidMountEffect from "../helpers/useDidMountEffect";
import QuestionCard from "./QuestionCard";

function Quiz() {
  let { difficulty } = useParams();
  const { handleSetNumCorrect, user, updateLeaderBoard, currCategory } =
    useOutletContext();
  const [questions, setQuestions] = useState(null);
  const [questionNumIndex, setQuestionNumIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log(currCategory);
    loadQuizData();
  }, []);

  useDidMountEffect(() => {
    setIsLoaded(true);
    console.log(isLoaded);
  }, [questions]);

  const loadQuizData = async () => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple&category=${currCategory.id}`
    );
    setQuestions(response.data.results);
    console.log(response.data.results);
  };

  return (
    <div className="main-content quiz-page">
      <h2>Question {questionNumIndex + 1} of 10</h2>
      {isLoaded ? (
        <QuestionCard
          questions={questions}
          questionNumIndex={questionNumIndex}
          setQuestionNumIndex={setQuestionNumIndex}
          handleSetNumCorrect={handleSetNumCorrect}
          user={user}
          updateLeaderBoard={updateLeaderBoard}
          currCategory={currCategory}
          difficulty={difficulty}
        />
      ) : (
        "loading"
      )}
    </div>
  );
}

export default Quiz;
