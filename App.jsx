import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";

import logo from "./assets/reyahtzee.png";
import Die from "./components/Die";
import RollButton from "./components/RollButton";

import "./App.css";

const App = () => {
  const [dice, setDice] = useState(newDice());
  const [yahtzee, setYahtzee] = useState(false);
  const [rollNumber, setRollNumber] = useState(0);

  // Initial game setup and reset
  function newDice() {
    const allDice = [];

    for (let i = 0; i < 5; i++) {
      const randomRoll = Math.floor(Math.random() * 6 + 1);

      allDice.push({
        id: uuidv4(),
        value: randomRoll,
        isFrozen: false,
      });
    }
    return allDice;
  }

  // Check to see if the user has won
  useEffect(() => {
    const checkYahtzee = dice.every((die) => die.value === dice[0].value);

    if (checkYahtzee) {
      setYahtzee(true);
      toast.success("Winner!", {
        duration: 5000,
        style: {
          padding: "10px 20px 10px 20px",
          fontSize: "20px",
        },
      });
    }

    if (!checkYahtzee && rollNumber > 2) {
      toast.error("Try again!", {
        duration: 5000,
        style: {
          padding: "10px 20px 10px 20px",
          fontSize: "20px",
        },
      });
    }
  }, [dice]);

  // Roll all dice that are not frozen
  function rollDice() {
    if (!yahtzee && rollNumber < 3) {
      // Add 1 to the displayed number of rolls
      setRollNumber((prevRolls) => prevRolls + 1);
      // Roll unfrozen dice
      setDice((unfrozenDice) =>
        unfrozenDice.map((unfrozenDie) =>
          unfrozenDie.isFrozen
            ? unfrozenDie
            : {
                ...unfrozenDie,
                value: Math.ceil(Math.random() * 6),
              }
        )
      );
    } else {
      // Game reset
      setYahtzee(false);
      // New dice for reset
      setDice(newDice());
      // Reset roll number to 0 for new game
      setRollNumber(0);
    }
  }

  return (
    <div className="App h-full flex flex-col justify-between">
      {yahtzee && <Confetti />}
      <Toaster />
      <main className="bg-secondary opacity-95 shadow-2xl min-h-96 max-w-3xl m-auto rounded flex flex-col gap-5 p-12">
        <div>
          <div className="flex justify-center items-center mb-4">
            <img src={logo} />
          </div>
          <p className="text-center text-info text-xl">ROLLS: {rollNumber}</p>
        </div>
        <div className="grid gap-4 grid-cols-5 mt-4">
          {dice.map((die) => (
            <Die
              key={die.id}
              dieId={die.id}
              setDice={setDice}
              diceValue={die.value}
              isFrozen={die.isFrozen}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <RollButton
            yahtzee={yahtzee}
            rollNumber={rollNumber}
            rollDice={() => {
              return rollDice();
            }}
          />
        </div>
        <p className="text-center text-info text-lg mt-10">
          Match all dice in three rolls or less! You can click on a die to
          freeze its value between rolls (Frozen dice turn ice blue).
        </p>
      </main>
    </div>
  );
};

export default App;
