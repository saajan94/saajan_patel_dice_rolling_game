import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

const Die = ({ dieId, setDice, diceValue, isFrozen }) => {
  // Freeze dice based on ID
  const freezeDice = (currentId) => {
    setDice((unfrozenDice) =>
      unfrozenDice.map((unfrozenDie) =>
        unfrozenDie.id === currentId
          ? { ...unfrozenDie, isFrozen: !unfrozenDie.isFrozen }
          : unfrozenDie
      )
    );
  };

  // Set dice icons
  const diceValueString = (diceNumber) => {
    switch (diceNumber) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      default:
        return faDiceSix;
    }
  };

  return (
    <FontAwesomeIcon
      className={`${
        isFrozen ? "text-success" : "text-accent"
      } w-12 h-12 md:w-24 md:h-24 drop-shadow-lg mx-auto rounded-lg hover:cursor-pointer transform ease-linear`}
      icon={diceValueString(diceValue)}
      data-die-id={dieId}
      onClick={(e) => freezeDice(e.currentTarget.dataset.dieId)}
    />
  );
};

export default Die;
