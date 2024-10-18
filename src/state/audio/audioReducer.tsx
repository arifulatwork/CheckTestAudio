import { createSlice } from '@reduxjs/toolkit';

//a place where we handle muting the audio,playing,toggleing and pausing the music on any page.
const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    isPlaying: false,
    isMuted: false,
  },
  reducers: {
    playAudio: (state) => {
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
      if (state.isPlaying) {
        state.isPlaying = false;
      }
    },
  },
});

export const { playAudio, pauseAudio, toggleMute } = audioSlice.actions;

export default audioSlice.reducer;
