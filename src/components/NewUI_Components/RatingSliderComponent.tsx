import Slider from '@react-native-community/slider';
import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

import { MAIN_ORANGE, MAIN_BLUE } from '../../Colors';
import { BadEmoji } from '../../components/icons/Emojis/BadEmoji';
import { GoodEmoji } from '../../components/icons/Emojis/GoodEmoji';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
interface RatingSliderProps {
  title: string;
  value: number;
  style?: StyleProp<ViewStyle>;
  onChange: (value: number) => void;
  sliderText: string[];
}

const RatingSlider: React.FC<RatingSliderProps> = ({ title, value, style, sliderText, onChange }) => {
  return (
    <View style={style}>
      <Text style={typography.textBig}>{title}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View>
          <BadEmoji style={spacing.pv1} height={36} width={52} />
        </View>
        <Slider
          style={{ width: '100%', flex: 1 }}
          minimumValue={0}
          maximumValue={100}
          value={value}
          step={1}
          onValueChange={onChange}
          thumbTintColor={MAIN_ORANGE}
          minimumTrackTintColor={MAIN_BLUE}
        />
        <View>
          <GoodEmoji style={spacing.pv1} height={36} width={52} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[typography.textSmall, { color: MAIN_ORANGE }]}> {sliderText[0]}</Text>
        <Text style={[typography.textSmall, { color: MAIN_ORANGE }]}>{sliderText[1]}</Text>
      </View>
    </View>
  );
};
export default RatingSlider;
