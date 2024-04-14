import React from "react";

const RollButton = ({ yahtzee, rollDice, rollNumber }) => {
  return (
    <button
      type="button"
      className="btn w-fit bg-accent border-primary text-white py-2 px-6 rounded"
      onClick={rollDice}
    >
      {yahtzee || rollNumber > 2 ? "NEW GAME" : "ROLL"}
    </button>
  );
};

export default RollButton;
