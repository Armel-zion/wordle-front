export type LetterState = "correct" | "present" | "absent";

export interface LetterResult {
  letter: string;
  state: LetterState;
}

export type Attempt = LetterResult[];