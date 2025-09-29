import { Animated } from 'react-native';

export const createSquareAnimation = () => {
  const scaleAnim = new Animated.Value(0);
  
  const animate = () => {
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 4,
    }).start();
  };

  const style = {
    transform: [
      {
        scale: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  return { animate, style };
};

export const createWinnerAnimation = () => {
  const opacityAnim = new Animated.Value(0);
  
  const animate = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const style = {
    opacity: opacityAnim,
  };

  return { animate, style };
};
