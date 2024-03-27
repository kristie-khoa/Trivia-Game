import React, { useState, useEffect } from "react";

function ButtonRadio({
  buttonColors,
  currSelected,
  optionsArr,
  onClick,
  setHasOneActive,
  type,
  correctAnswerIndex,
}) {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(
    optionsArr.indexOf(currSelected)
  );
  let buttons = null;

  const handleSelect = (index) => {
    setSelectedButtonIndex(index);
    if (setHasOneActive) {
      setHasOneActive(true);
    }
    if (onClick) {
      onClick(optionsArr[index]); //of the given array, the value at the index of the button
    }
  };

  if (optionsArr) {
    if (type === "answer") {
      buttons = optionsArr.map((option, index) => {
        return (
          <button
            key={index}
            className={
              selectedButtonIndex === -1
                ? "unselected-button"
                : selectedButtonIndex === index && index !== correctAnswerIndex
                ? "incorrect"
                : index === correctAnswerIndex
                ? "correct"
                : "unselected-button"
            }
            onClick={() => handleSelect(index)}
            disabled={selectedButtonIndex === -1 ? false : true}
          >
            {option}
          </button>
        );
      });
    } else {
      buttons = optionsArr.map((option, index) => {
        return (
          <button
            key={index}
            className={`${buttonColors ? `${buttonColors[index]}` : ""}${" "}${
              selectedButtonIndex === index
                ? "selected-button"
                : "unselected-button"
            }`}
            onClick={() => handleSelect(index)}
          >
            {option}
          </button>
        );
      });
    }
  }

  return <div className="button-group">{buttons}</div>;
}

export default ButtonRadio;
