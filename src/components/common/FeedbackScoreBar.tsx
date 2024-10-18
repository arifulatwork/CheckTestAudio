import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MAIN_BLUE, MAIN_ORANGE } from '@/Colors';
import typography from '@/commonStyles/Typography';

interface FeedbackScoreBarProps {
  title: string;
  value: number;
  labelLeft: string;
  labelRight: string;
}

const FeedbackScoreBar: React.FC<FeedbackScoreBarProps> = ({
  title,
  value,
  labelLeft,
  labelRight,
}) => {
  return (
    <View style={[styles.sliderContainer]}>
      <Text style={[typography.text, typography.left, typography.bold]}>{title}</Text>
      <View style={styles.backgroundTrack}>
        <View style={[styles.filledTrack, { width: `${value}%` }]} />
      </View>
      <View style={[styles.textContainer, { marginTop: 5 }]}>
        <Text style={[typography.textSmall, { color: MAIN_ORANGE }]}>{labelLeft}</Text>
        <Text style={[typography.textSmall, { color: MAIN_ORANGE }]}>{labelRight}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  backgroundTrack: {
    height: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
  },
  filledTrack: {
    backgroundColor: MAIN_BLUE,
    height: '100%',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FeedbackScoreBar;
