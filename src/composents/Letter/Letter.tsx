import styles from "./Letter.module.css";

type LetterState = "correct" | "present" | "absent" | "";

interface LetterProps {
  letter: string;
  state: LetterState;
}

const Letter = ({ letter, state }: LetterProps) => {
  return (
    <div className={`${styles.letter} ${styles[state]}`}>
      {letter}
    </div>
  );
};

export default Letter;