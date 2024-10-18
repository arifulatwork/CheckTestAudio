import { format } from 'date-fns';
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import Icon from './Icon';

import { MAIN_BLUE } from '@/Colors';
import typography from '@/commonStyles/Typography';

type Props = {
  dateString: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconWidth?: SvgProps['width'];
  iconHeight?: SvgProps['height'];
};

const formatDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy');
};

const DateDisplay = ({ dateString, onPress, style, textStyle, iconHeight, iconWidth }: Props) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icon name="Calendar" width={iconWidth} height={iconHeight} style={[styles.icon]} />
      <Text style={[typography.text, typography.bold, textStyle]}>{formatDate(dateString)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: MAIN_BLUE,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default DateDisplay;
