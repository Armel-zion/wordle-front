import Row from "../Row/Row";
import stylesGrid from "./Grid.module.css";

type Attempt = string[];
type LetterState = "correct" | "present" | "absent" | "";

interface GridProps {
  attempts: Attempt[];
  letterStates: LetterState[][];
}

const Grid = ({ attempts, letterStates }: GridProps) => {
  return (
    <div className={stylesGrid.grid}>
      {attempts.map((attempt, index) => (
        <Row
          key={index}
          mot={attempt}
          states={letterStates[index]}
        />
      ))}
    </div>
  );
};

export default Grid;