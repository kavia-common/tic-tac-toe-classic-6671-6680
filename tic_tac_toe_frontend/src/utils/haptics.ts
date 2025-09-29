import * as Haptics from 'expo-haptics';

export const playMoveHaptic = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const playWinHaptic = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const playDrawHaptic = async () => {
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
};
