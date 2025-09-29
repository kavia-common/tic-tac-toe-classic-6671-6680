import React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import Square from './Square';
import WinLine from './WinLine';
import { Player } from '../utils/gameLogic';
import { Colors } from '../theme/colors';

interface BoardProps {
  squares: (Player | null)[];
  onSquarePress: (index: number) => void;
  winner: Player | null;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onSquarePress, winner, winningLine }) => {
  const { width } = useWindowDimensions();
  const boardSize = Math.min(width * 0.8, 300);

  return (
    <View style={[styles.board, { width: boardSize, height: boardSize }]}>
      <WinLine winningLine={winningLine} />
      {squares.map((square, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.square, index < 6 && styles.bottomBorder, index % 3 !== 2 && styles.rightBorder]}
          onPress={() => onSquarePress(index)}
          disabled={square !== null || winner !== null}
        >
          <Square value={square} winner={winner} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  square: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  rightBorder: {
    borderRightWidth: 2,
    borderRightColor: Colors.border,
  },
});

export default Board;
