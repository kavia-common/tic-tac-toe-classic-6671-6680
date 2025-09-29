import { Audio } from 'expo-av';

// Sound assets need to be imported at build time
const soundAssets = {
  move: require('../../assets/sounds/move.mp3'),
  win: require('../../assets/sounds/win.mp3'),
} as const;

let sounds: { [key: string]: Audio.Sound | null } = {};

export const initSounds = async () => {
  try {
    // Pre-load all sounds
    const moveSound = new Audio.Sound();
    const winSound = new Audio.Sound();
    
    await moveSound.loadAsync(soundAssets.move);
    await winSound.loadAsync(soundAssets.win);
    
    sounds = {
      move: moveSound,
      win: winSound,
    };
  } catch (error) {
    console.log('Error initializing sounds:', error);
  }
};

export const playSound = async (soundName: keyof typeof soundAssets) => {
  try {
    const sound = sounds[soundName];
    if (sound) {
      await sound.stopAsync();
      await sound.setPositionAsync(0);
      await sound.playAsync();
    }
  } catch (error) {
    console.log('Error playing sound:', error);
  }
};

export const cleanupSounds = async () => {
  try {
    for (const sound of Object.values(sounds)) {
      if (sound) {
        await sound.unloadAsync();
      }
    }
    sounds = {};
  } catch (error) {
    console.log('Error cleaning up sounds:', error);
  }
};
