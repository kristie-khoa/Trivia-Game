import React, { useState, useEffect } from "react";
import ButtonRadio from "../Components/ButtonRadio";
import { Link } from "react-router-dom";

function QuestionCard({
  questions,
  questionNumIndex,
  setQuestionNumIndex,
  handleSetNumCorrect,
  user,
  updateLeaderBoard,
  currCategory,
  difficulty,
}) {
  const currQuestionObject = questions[questionNumIndex];
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(
    Math.floor(Math.random() * 4)
  );
  const answersArr = [...currQuestionObject["incorrect_answers"]].toSpliced(
    correctAnswerIndex,
    0,
    currQuestionObject["correct_answer"]
  );
  const [isNextBtn, setIsNextBtn] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);

  useEffect(() => {
    console.log("when is this happening");
    setCorrectAnswerIndex(Math.floor(Math.random() * 4));
  }, [questionNumIndex]);

  const checkAnswer = (guess) => {
    console.log(`guess is ${guess}`);
    console.log(`answer is ${answersArr[correctAnswerIndex]}`);
    if (guess === answersArr[correctAnswerIndex]) {
      setNumCorrect(numCorrect + 1);
    }
    setIsNextBtn(true);
  };

  return (
    <>
      <h1>{currQuestionObject["question"]}</h1>

      <div className="card-container answer-container">
        <ButtonRadio
          type="answer"
          key={questionNumIndex}
          correctAnswerIndex={correctAnswerIndex}
          optionsArr={answersArr}
          onClick={(x) => {
            checkAnswer(x);
          }}
        />
      </div>
      {questionNumIndex < 9 ? (
        <div className="next-question-button next-button-container">
          <button
            className={`next-button ${isNextBtn ? "active" : "disabled"}`}
            disabled={isNextBtn ? false : true}
            onClick={() => {
              setQuestionNumIndex(questionNumIndex + 1);
              setIsNextBtn(false);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div className=" results-button next-button-container">
          <Link to="/results">
            <button
              className={`next-button ${isNextBtn ? "active" : "disabled"}`}
              onClick={() => {
                updateLeaderBoard(
                  user,
                  numCorrect,
                  currCategory.name,
                  difficulty
                );
                handleSetNumCorrect(numCorrect);
              }}
              disabled={isNextBtn ? false : true}
            >
              Results
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default QuestionCard;
