export type Difficulty = 'facil' | 'medio' | 'dificil';

export interface Level {
  id: string;
  movieTitle: string;
  options: string[];
  audioUrl: string;
  videoUrl: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface Checkpoint {
  category: string;
  difficulty: Difficulty;
  levelIndex: number;
  totalScore: number;
  levelsPassed: number;
  activeLevels: Level[];
}
