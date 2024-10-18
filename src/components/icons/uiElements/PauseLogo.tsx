import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

function PauseLogo() {
  return (
    <Svg style={styles.pauseButtonLogo} width="37" height="43" fill="none" viewBox="0 0 37 43">
      <Rect width="12.95" height="43" fill="#7E7E7E" rx="5" />
      <Rect width="12.95" height="43" fill="#5F29C4" rx="5" />
      <Rect width="12.95" height="43" x="24.05" fill="#7E7E7E" rx="5" />
      <Rect width="12.95" height="43" x="24.05" fill="#5F29C4" rx="5" />
    </Svg>
  );
}
const styles = StyleSheet.create({
  pauseButtonLogo: {
    margin: 27,
  },
});

export default PauseLogo;
