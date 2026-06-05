export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const DIFFICULTIES: readonly Difficulty[] = ['EASY', 'MEDIUM', 'HARD'];

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  EASY: 'Einfach',
  MEDIUM: 'Mittel',
  HARD: 'Schwer',
};
