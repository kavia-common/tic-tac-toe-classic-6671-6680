import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Board from './src/components/Board';
import ScoreBoard from './src/components/ScoreBoard';
import ActionButton from './src/components/ActionButton';
import GameStatus from './src/components/GameStatus';
import { calculateWinner, isBoardFull } from './src/utils/gameLogic';
import { GameState } from './src/types/game';
import { Colors } from './src/theme/colors';
import { playMoveHaptic, playWinHaptic, playDrawHaptic } from './src/utils/haptics';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winningLine: null,
    isGameOver: false,
    score: { X: 0, O: 0 },
  });

  const handleSquarePress = useCallback(async (index: number) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { player: winner, line: winningLine } = calculateWinner(newBoard);
    const isGameOver = winner !== null || isBoardFull(newBoard);

    await playMoveHaptic();
    
    setGameState(prevState => ({
      ...prevState,
      board: newBoard,
      currentPlayer: prevState.currentPlayer === 'X' ? 'O' : 'X',
      winner,
      winningLine,
      isGameOver,
      score: winner
        ? { ...prevState.score, [winner]: prevState.score[winner] + 1 }
        : prevState.score,
    }));
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      board: Array(9).fill(null),
      currentPlayer: prevState.winner || 'X',
      winner: null,
      isGameOver: false,
    }));
  }, []);

  useEffect(() => {
    if (gameState.winner) {
      playWinHaptic();
    } else if (gameState.isGameOver) {
      playDrawHaptic();
    }
  }, [gameState.winner, gameState.isGameOver]);

  const resetScore = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      score: { X: 0, O: 0 },
    }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <ScoreBoard
          score={gameState.score}
          currentPlayer={gameState.currentPlayer}
        />
        <GameStatus
          winner={gameState.winner}
          currentPlayer={gameState.currentPlayer}
          isGameOver={gameState.isGameOver}
        />
        <Board
          squares={gameState.board}
          onSquarePress={handleSquarePress}
          winner={gameState.winner}
          winningLine={gameState.winningLine}
        />
        <View style={styles.buttonContainer}>
          <ActionButton
            title="New Game"
            onPress={resetGame}
            variant="primary"
          />
          <ActionButton
            title="Reset Score"
            onPress={resetScore}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
