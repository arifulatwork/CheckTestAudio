import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { MAIN_BLUE } from '@/Colors';

const CircleElement = ({ filled = false }: { filled?: boolean }) => (
  <Svg height="13" width="13" viewBox="0 0 20 20">
    <Circle
      cx="10"
      cy="10"
      r="6"
      stroke={MAIN_BLUE}
      strokeWidth="2"
      fill={filled ? MAIN_BLUE : 'none'}
    />
  </Svg>
);

type Props = {
  numberOfItems: number;
  progress: number;
  style?: StyleProp<ViewStyle>;
};

const ProgressIndicator = ({ numberOfItems, progress, style }: Props) => {
  const items = new Array(numberOfItems).fill(0).map((_, idx) => {
    return <CircleElement filled={progress >= idx} key={idx} />;
  });

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        style,
      ]}>
      {items}
    </View>
  );
};

export default ProgressIndicator;
