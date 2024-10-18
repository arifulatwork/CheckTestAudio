import { Text, Pressable, StyleSheet } from 'react-native';

import { MAIN_BLUE } from '@/Colors';
import typography from '@/commonStyles/Typography';

interface DayProps {
  number?: number;
  isCurrentDate?: boolean;
  isSelected?: boolean;
  onPress?: (value: number) => void;
  disabled?: boolean;
}

const Day = ({
  number,
  isCurrentDate,
  isSelected = false,
  onPress,
  disabled = false,
}: DayProps) => {
  return (
    <Pressable
      style={[
        styles.pressable,
        isSelected ? styles.selectedContainer : null,
        disabled ? styles.disabled : null,
      ]}
      onPress={() => (number !== undefined && !disabled ? onPress && onPress(number) : null)}>
      <Text style={[typography.text, styles.text, isCurrentDate ? typography.bold : null]}>
        {number}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '14.285714285714286%', // One seventh
    alignItems: 'center',
    borderRadius: 100,
    aspectRatio: 1,
    justifyContent: 'center',
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: MAIN_BLUE,
  },
  text: {
    fontSize: 20,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default Day;
