import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { createSquareAnimation } from '../utils/animations';
import { Player } from '../utils/gameLogic';
import { Colors } from '../theme/colors';

interface SquareProps {
  value: Player | null;
  winner: Player | null;
}

const Square: React.FC<SquareProps> = ({ value, winner }) => {
  const isWinningSquare = value && winner === value;
  const animation = useRef(createSquareAnimation());

  useEffect(() => {
    if (value) {
      animation.current.animate();
    }
  }, [value]);

  return (
    <Animated.View style={[styles.square, animation.current.style]}>
      <Animated.Text style={[
        styles.text,
        { color: value === 'X' ? Colors.primary : Colors.secondary },
        isWinningSquare && styles.winningText
      ]}>
        {value}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  square: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  winningText: {
    fontSize: 44,
    textShadowColor: Colors.success,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

export default Square;
