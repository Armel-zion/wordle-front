import KeyButton from "../KeyButton/KeyButton";
import type { LetterState } from "../Main/Main";

interface KeyBoardProps {
  onLetterClick: (letter: string) => void;
  keyStates: Record<string, LetterState>;
}

const letters = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
  ["ENTRER", "W", "X", "C", "V", "B", "N", "SUPPR"],
];

export default function KeyBoard({
  onLetterClick,
  keyStates,
}: KeyBoardProps) {
  return (
    <div>
      {letters.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((letter) => (
            <KeyButton
              key={letter}
              letter={letter}
              state={keyStates[letter] ?? ""}
              onClick={onLetterClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}