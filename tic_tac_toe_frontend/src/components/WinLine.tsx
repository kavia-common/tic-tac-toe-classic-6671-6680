import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

interface WinLineProps {
  winningLine: number[] | null;
}

const WinLine: React.FC<WinLineProps> = ({ winningLine }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (winningLine) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 30,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [winningLine]);

  if (!winningLine) return null;

  const getLineStyle = () => {
    const [a, b] = winningLine;
    const isHorizontal = Math.abs(a - b) === 1;
    const isVertical = Math.abs(a - b) === 3;
    const isDiagonal = Math.abs(a - b) === 4 || Math.abs(a - b) === 2;

    const baseStyle = {
      position: 'absolute' as const,
      backgroundColor: Colors.success,
      opacity: opacityAnim,
    };

    if (isHorizontal) {
      return {
        ...baseStyle,
        height: 4,
        width: '90%',
        top: `${Math.floor(a / 3) * 33.33 + 16.665}%`,
        transform: [{ scaleX: scaleAnim }],
      };
    }
    if (isVertical) {
      return {
        ...baseStyle,
        width: 4,
        height: '90%',
        left: `${(a % 3) * 33.33 + 16.665}%`,
        transform: [{ scaleY: scaleAnim }],
      };
    }
    if (isDiagonal) {
      const isMainDiagonal = a === 0 || a === 8;
      return {
        ...baseStyle,
        width: 4,
        height: '120%',
        top: '-10%',
        left: '50%',
        transform: [
          { rotate: isMainDiagonal ? '45deg' : '-45deg' },
          { scaleY: scaleAnim },
        ],
      };
    }
    return baseStyle;
  };

  return <Animated.View style={[styles.line, getLineStyle()]} />;
};

const styles = StyleSheet.create({
  line: {
    borderRadius: 2,
  },
});

export default WinLine;
