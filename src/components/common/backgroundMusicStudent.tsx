import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SpeakerLogoMuted } from '../icons/uiElements/SpeakerLogoMuted';
import { SpeakerLogoUnmuted } from '../icons/uiElements/SpeakerLogoUnmuted';

import { MAIN_ORANGE } from '@/Colors';
import { toggleMute } from '@/state/audio/audioReducer';
import { RootState } from '@/state/store';

const BackgroundMusicPlayer: React.FC = () => {
  const dispatch = useDispatch();

  // Use RootState to specify the type of state
  const { isPlaying, isMuted } = useSelector((state: RootState) => state.audio);

  useEffect(() => {
    const playOrPauseAudio = async () => {
      if (!isPlaying && !isMuted) {
        await Audio.setIsEnabledAsync(true); // Re-enable audio
        // Play
        const { sound } = await Audio.Sound.createAsync(require('assets/music/MainBGM.mp3'));
        await sound.playAsync();
        console.log('PLAYING');
      } else {
        // Pause
        console.log('PAUSE');
        await Audio.setIsEnabledAsync(false); // Temporarily disable audio to pause
      }
    };

    playOrPauseAudio();

    return () => {
      // Cleanup logic if we need it later on goes here.
    };
  }, [isPlaying, isMuted]);

  return (
    <View style={styles.muteButton}>
      {isMuted ? (
        <SpeakerLogoMuted onPress={() => dispatch(toggleMute())} />
      ) : (
        <SpeakerLogoUnmuted onPress={() => dispatch(toggleMute())} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  muteButton: {
    bottom: 23,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: MAIN_ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    zIndex: 2,
    position: 'absolute',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 3, height: 3 },
  },
});

export default BackgroundMusicPlayer;
