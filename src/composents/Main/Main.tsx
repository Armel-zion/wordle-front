import Section from "../Section/Section";
import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import Message from "../Message/Message";
import mainStyles from "./Main.module.css";
import { useEffect, useState } from "react";


type Attempt = string[];
type LetterState = "correct" | "present" | "absent" | "";

const emptyAttempt: Attempt = ["", "", "", "", ""];
const acceptedWords = ["REACT", "AMOUR", "AVION", "CHIEN"];
const wordToFind = "AMOUR";

const Main = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
  ]);

  const [currentRow, setCurrentRow] = useState(0);
  const [letterStates, setLetterStates] = useState<LetterState[][]>([
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]);
  const [message, setMessage] = useState("");

  const showMessage = (text: string) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const checkAttempt = (attempt: Attempt): LetterState[] => {
    return attempt.map((letter, index) => {
      if (letter === wordToFind[index]) {
        return "correct";
      }

      if (wordToFind.includes(letter)) {
        return "present";
      }

      return "absent";
    });
  };

 const handleEnter = () => {
  const currentAttempt = attempts[currentRow];
  const currentWord = currentAttempt.join("");

  if (currentWord.length < 5) {
    showMessage("Le mot doit contenir 5 lettres.");
    return;
  }

  if (!acceptedWords.includes(currentWord)) {
    showMessage("Ce mot n'est pas dans la liste.");
    return;
  }

  const currentStates = checkAttempt(currentAttempt);

  const nextLetterStates = [...letterStates];
  nextLetterStates[currentRow] = currentStates;

  setLetterStates(nextLetterStates);

  if (currentRow === 5) {
    showMessage("La partie est terminée.");
    return;
  }

  setCurrentRow(currentRow + 1);
  setMessage("");
};

  const handleDelete = () => {
    const currentAttempt = attempts[currentRow];
    const nextAttempt = [...currentAttempt];

    for (let index = nextAttempt.length - 1; index >= 0; index -= 1) {
      if (nextAttempt[index] !== "") {
        nextAttempt[index] = "";

        const nextAttempts = [...attempts];
        nextAttempts[currentRow] = nextAttempt;

        setAttempts(nextAttempts);
        setMessage("");
        return;
      }
    }
  };

  const handleKeyClick = (letter: string) => {
    if (letter === "Entrer") {
      handleEnter();
      return;
    }

    if (letter === "Suppr") {
      handleDelete();
      return;
    }

    const currentAttempt = attempts[currentRow];
    const emptyIndex = currentAttempt.indexOf("");

    if (emptyIndex === -1) {
      return;
    }

    const nextAttempts = [...attempts];
    const nextAttempt = [...currentAttempt];

    nextAttempt[emptyIndex] = letter;
    nextAttempts[currentRow] = nextAttempt;

    setAttempts(nextAttempts);
    setMessage("");
  };

  return (
    <main className={mainStyles.main}>
      {message ? <Message text={message} /> : null}

      <Section className={mainStyles.sectionGrid}>
          <Grid
            attempts={attempts}
            letterStates={letterStates}
          />
      </Section>

      <Section className={mainStyles.sectionKeyboard}>
        <Keyboard onClick={handleKeyClick}/>
      </Section>
    </main>
  );
};

export default Main;