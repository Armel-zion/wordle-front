import Letter from "../Letter/Letter";
import stylesRow from "./Row.module.css";

type LetterState = "correct" | "present" | "absent" | "";

interface RowProps {
  mot: string[];
  states: LetterState[];
}

const Row = ({ mot, states }: RowProps) => {
  return (
    <div className={stylesRow.row}>
      {mot.map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          state={states[index]}
        />
      ))}
    </div>
  );
};

export default Row;