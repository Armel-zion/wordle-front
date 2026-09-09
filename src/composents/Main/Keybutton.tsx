interface KeyButtonProps {
    letter: string;
    onClick: (letter: string) => void;
} 

export default function KeyButton({letter, onClick} : KeyButtonProps) {
   return  <button onClick={() => onClick(letter)}>{letter}</button>
}