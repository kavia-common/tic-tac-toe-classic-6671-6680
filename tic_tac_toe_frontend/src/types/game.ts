import { Player } from '../utils/gameLogic';

export interface GameScore {
  X: number;
  O: number;
}

export interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | null;
  isGameOver: boolean;
  score: GameScore;
}
