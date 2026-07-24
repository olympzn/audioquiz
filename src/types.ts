export interface Level {
  id: string;
  movieTitle: string;
  options: string[];
  audioUrl: string;
  videoUrl: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';
