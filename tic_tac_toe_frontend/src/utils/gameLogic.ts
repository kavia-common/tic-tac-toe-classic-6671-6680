export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];

export interface WinnerInfo {
  player: Player | null;
  line: number[] | null;
}

export const calculateWinner = (squares: BoardState): WinnerInfo => {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a],
        line: [a, c]
      };
    }
  }

  return {
    player: null,
    line: null
  };
};

export const isBoardFull = (squares: BoardState): boolean => {
  return squares.every(square => square !== null);
};
