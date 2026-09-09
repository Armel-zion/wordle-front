import KeyButton from "./Keybutton";

interface KeyBoardProps {
    onletterClick: (letter:string) => void; 
}

export default function KeyBoard({onletterClick} : KeyBoardProps) {
    
    const letters = [
        ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
        ["ENTRER", "W", "X", "C", "V", "B", "N", "SUPPR"]
    ] 

    return (
        <div>
            {letters.map((row) => (
                <div>
                    {row.map((letter) => (
                        <KeyButton
                        key={letter}
                        letter={letter}
                        onClick={onletterClick}
                        />
                    ))}
                </div>    
            ))}
        </div>
    );
} 