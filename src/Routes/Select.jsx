import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonRadio from "../Components/ButtonRadio";
import { useOutletContext } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const categoryButtonColors = [
  "pink",
  "green",
  "peach",
  "purple",
  "orange",
  "blue",
  "lime",
  "indigo",
];

const profileButtonColors = [
  "purple",
  "lime",
  "pink",
  "green",
  "peach",

  "orange",
  "blue",

  "indigo",
];

const difficultyButtonColors = ["green", "orange", "pink"];

function Select() {
  const {
    user,
    // profiles,
    difficulty,
    currCategory,
    handleSetUser,
    handleSetCurrCategory,
    categories,
    setDifficulty,
  } = useOutletContext();
  const [isCatSelected, setIsCatSelected] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addProfileInput, setAddProfileInput] = useState("");

  const [profiles, setProfiles] = useState(
    //save usernames so they can quick select
    JSON.parse(localStorage.getItem("profiles")) || ["+ new"]
  );

  const categoryArr = categories.map((category) => {
    return category.category;
  });

  //   useEffect(() => {
  //     localStorage.clear();
  //     console.log(user);
  //   }, []);

  const handleAddProfile = (name) => {
    //add profile to local storage and state when submitted and fn is called. FORMAT is an array of names.
    let profilesTemp = [...profiles];
    profilesTemp.unshift(name);
    localStorage.setItem("profiles", JSON.stringify(profilesTemp));
    setProfiles(profilesTemp);
  };

  const newUserBox = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSetUser(addProfileInput);
        handleAddProfile(addProfileInput);
        setIsFormOpen(false);
        setAddProfileInput("");
        console.log(addProfileInput);
      }}
    >
      <input
        type="text"
        placeholder="username"
        value={addProfileInput}
        onChange={(e) => setAddProfileInput(e.target.value)}
      />
      <button
        className="form-button"
        disabled={addProfileInput ? false : true}
        type="submit"
      >
        <FaCheck />
      </button>
    </form>
  );

  const handleProfileOnClick = (value) => {
    if (value === "+ new") {
      setIsFormOpen(true);
    } else {
      handleSetUser(value);
    }
  };

  return (
    <div className="main-content select-page">
      <h2>Hey There!</h2>
      <h1>Select Your Quiz</h1>
      <div className="card-container select-page">
        <div className="category-select">
          <h3>Category:</h3>
          <ButtonRadio
            buttonColors={categoryButtonColors}
            optionsArr={categoryArr}
            onClick={handleSetCurrCategory}
            setHasOneActive={setIsCatSelected}
          />
        </div>
        <div className="right-side-card-container">
          <div className="difficulty-select">
            <h3>Difficulty:</h3>
            <ButtonRadio
              buttonColors={difficultyButtonColors}
              optionsArr={["Easy", "Medium", "Hard"]}
              onClick={setDifficulty}
            />
          </div>
          <div className="profile-select">
            <h3>User:</h3>
            <div>
              {isFormOpen && newUserBox}
              <ButtonRadio
                key={user}
                buttonColors={profileButtonColors}
                currSelected={user}
                optionsArr={profiles}
                onClick={handleProfileOnClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="next-button-container">
        <Link
          to={
            user && difficulty && isCatSelected
              ? `/${difficulty.toLowerCase()}/${currCategory.name.toLowerCase()}`
              : null
          }
        >
          <button
            className="next-button"
            disabled={user && difficulty && isCatSelected ? false : true}
          >
            Let's Go!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Select;
