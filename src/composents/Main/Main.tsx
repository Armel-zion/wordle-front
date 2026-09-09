import { useEffect, useState } from "react";
import Section from "../Section/Section";
import Grid from "../Grid/Grid";
import KeyBoard from "../Keyboard/Keyboard";
import Message from "../Message/Message";
import mainStyles from "./Main.module.css";

type Attempt = string[];
export type LetterState = "correct" | "present" | "absent" | "";

interface WordResponse {
  word: string;
  language: string;
  date: string;
}

const emptyAttempt: Attempt = ["", "", "", "", ""];

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
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
    [...emptyAttempt],
  ]);

  const [keyStates, setKeyStates] = useState<Record<string, LetterState>>(
    {}
  );

  const [wordToFind, setWordToFind] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // "playing" = le joueur peut jouer
  // "won" = gagné
  // "lost" = perdu
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  useEffect(() => {
    const getWord = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/word?lang=fr`,
          {
            headers: {
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Impossible de récupérer le mot.");
        }

        const data: WordResponse = await response.json();

        setWordToFind(data.word.toUpperCase());
      } catch {
        setMessage("Erreur : le mot du jour n'a pas pu être chargé.");
      } finally {
        setIsLoading(false);
      }
    };

    getWord();
  }, []);

  const showMessage = (text: string) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const checkAttempt = (attempt: Attempt): LetterState[] => {
    const states: LetterState[] = ["", "", "", "", ""];
    const remainingLetters = wordToFind.split("");

    // Les lettres bien placées : vert
    attempt.forEach((letter, index) => {
      if (letter === wordToFind[index]) {
        states[index] = "correct";
        remainingLetters[index] = "";
      }
    });

    // Les lettres présentes : jaune, sinon gris
    attempt.forEach((letter, index) => {
      if (states[index] === "correct") {
        return;
      }

      const availableIndex = remainingLetters.indexOf(letter);

      if (availableIndex !== -1) {
        states[index] = "present";
        remainingLetters[availableIndex] = "";
      } else {
        states[index] = "absent";
      }
    });

    return states;
  };

  const updateKeyboardStates = (
    attempt: Attempt,
    states: LetterState[]
  ) => {
    setKeyStates((previousKeyStates) => {
      const nextKeyStates = { ...previousKeyStates };

      attempt.forEach((letter, index) => {
        const newState = states[index];
        const oldState = nextKeyStates[letter];

        if (newState === "correct") {
          nextKeyStates[letter] = "correct";
        } else if (newState === "present" && oldState !== "correct") {
          nextKeyStates[letter] = "present";
        } else if (newState === "absent" && oldState === undefined) {
          nextKeyStates[letter] = "absent";
        }
      });

      return nextKeyStates;
    });
  };

  const handleEnter = () => {
    const currentAttempt = attempts[currentRow];
    const currentWord = currentAttempt.join("");

    // On refuse une ligne incomplète
    if (currentWord.length < 5) {
      showMessage("Le mot doit contenir 5 lettres.");
      return;
    }

    const currentStates = checkAttempt(currentAttempt);

    setLetterStates((previousLetterStates) => {
      const nextLetterStates = [...previousLetterStates];
      nextLetterStates[currentRow] = currentStates;
      return nextLetterStates;
    });

    updateKeyboardStates(currentAttempt, currentStates);

    // Victoire
    if (currentWord === wordToFind) {
      setGameStatus("won");
      showMessage("Bravo, vous avez trouvé le mot !");
      return;
    }

    // Défaite : sixième ligne, donc index 5
    if (currentRow === 5) {
      setGameStatus("lost");
      showMessage(`Partie terminée. Le mot était ${wordToFind}.`);
      return;
    }

    // On passe à la ligne suivante
    setCurrentRow(currentRow + 1);
  };

  const handleDelete = () => {
    const currentAttempt = attempts[currentRow];
    const nextAttempt = [...currentAttempt];

    for (let index = nextAttempt.length - 1; index >= 0; index -= 1) {
      if (nextAttempt[index] !== "") {
        nextAttempt[index] = "";

        setAttempts((previousAttempts) => {
          const nextAttempts = [...previousAttempts];
          nextAttempts[currentRow] = nextAttempt;
          return nextAttempts;
        });

        setMessage("");
        return;
      }
    }
  };

  const handleKeyClick = (letter: string) => {
    // Après victoire ou défaite, les touches ne font plus rien
    if (gameStatus !== "playing") {
      return;
    }

    if (letter === "ENTRER") {
      handleEnter();
      return;
    }

    if (letter === "SUPPR") {
      handleDelete();
      return;
    }

    const currentAttempt = attempts[currentRow];
    const emptyIndex = currentAttempt.indexOf("");

    // La ligne contient déjà 5 lettres
    if (emptyIndex === -1) {
      return;
    }

    setAttempts((previousAttempts) => {
      const nextAttempts = [...previousAttempts];
      const nextAttempt = [...previousAttempts[currentRow]];

      nextAttempt[emptyIndex] = letter;
      nextAttempts[currentRow] = nextAttempt;

      return nextAttempts;
    });

    setMessage("");
  };

  if (isLoading) {
    return (
      <main className={mainStyles.main}>
        <p>Chargement du mot du jour...</p>
      </main>
    );
  }

  return (
    <main className={mainStyles.main}>
      {message ? <Message text={message} /> : null}

      <Section className={mainStyles.sectionGrid}>
        <Grid attempts={attempts} letterStates={letterStates} />
      </Section>

      <Section className={mainStyles.sectionKeyboard}>
        <KeyBoard
          onLetterClick={handleKeyClick}
          keyStates={keyStates}
        />
      </Section>
    </main>
  );
};

export default Main;