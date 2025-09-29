import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { GameScore } from '../types/game';
import { Colors } from '../theme/colors';

interface ScoreBoardProps {
  score: GameScore;
  currentPlayer: 'X' | 'O';
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, currentPlayer }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [score]);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <View style={[styles.playerScore, currentPlayer === 'X' && styles.activePlayer]}>
          <Text style={[styles.playerText, { color: Colors.primary }]}>Player X</Text>
          <Animated.Text style={[
            styles.scoreText,
            { color: Colors.primary, transform: [{ scale: scaleAnim }] }
          ]}>
            {score.X}
          </Animated.Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.playerScore, currentPlayer === 'O' && styles.activePlayer]}>
          <Text style={[styles.playerText, { color: Colors.secondary }]}>Player O</Text>
          <Animated.Text style={[
            styles.scoreText,
            { color: Colors.secondary, transform: [{ scale: scaleAnim }] }
          ]}>
            {score.O}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerScore: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  activePlayer: {
    backgroundColor: `${Colors.primary}10`,
  },
  playerText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: Colors.border,
    marginHorizontal: 20,
  },
});

export default ScoreBoard;
