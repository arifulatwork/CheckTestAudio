import Fi from 'assets/svgs/flags/fi.svg';
import Gb from 'assets/svgs/flags/gb.svg';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { LanguageCode } from '.';

import { MAIN_ORANGE } from '@/Colors';

type Props = {
  lang: LanguageCode;
  selected: LanguageCode;
  onPress: (selected: LanguageCode) => void;
  style?: StyleProp<ViewStyle>;
};

const Flag = ({ lang, style, selected, onPress }: Props) => {
  const props: SvgProps = {
    width: 55,
    height: 55,
    style,
  };

  const component = () => {
    if (lang === 'fi') return <Fi {...props} />;
    if (lang === 'en') return <Gb {...props} />;
    return <Gb {...props} />;
  };

  return (
    <Pressable
      style={[styles.container, selected === lang ? styles.selected : null]}
      onPress={() => onPress(lang)}>
      {component()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 300,
    borderColor: 'rgba(0,0,0,0)',
  },

  selected: {
    borderColor: MAIN_ORANGE,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
  },
});

export default Flag;
