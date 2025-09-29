import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface GameStatusProps {
  winner: string | null;
  currentPlayer: string;
  isGameOver: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, currentPlayer, isGameOver }) => {
  const getMessage = () => {
    if (winner) {
      return `Player ${winner} Wins!`;
    }
    if (isGameOver) {
      return "It's a Draw!";
    }
    return `Player ${currentPlayer}'s Turn`;
  };

  const getMessageColor = () => {
    if (winner) {
      return Colors.success;
    }
    if (isGameOver) {
      return Colors.text;
    }
    return currentPlayer === 'X' ? Colors.primary : Colors.secondary;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: getMessageColor() }]}>
        {getMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameStatus;
