import styles from "./KeyButton.module.css";
import type { LetterState } from "../Main/Main";

interface KeyButtonProps {
  letter: string;
  state: LetterState;
  onClick: (letter: string) => void;
}

export default function KeyButton({
  letter,
  state,
  onClick,
}: KeyButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.keyButton} ${styles[state]}`}
      onClick={() => onClick(letter)}
    >
      {letter}
    </button>
  );
}