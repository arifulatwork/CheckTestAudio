import { PropsWithChildren } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import { MAIN_BLUE } from '@/Colors';
import typography from '@/commonStyles/Typography';
import i18n from '@/translations/i18n';

type WeekdayButtonProps = PropsWithChildren<{
  id: number;
  selected: boolean;
  onPress: (value: number) => void;
}>;

type WeekdaySelectorProps = {
  value: number | undefined;
  onSelect: (value: number | undefined) => void;
};

const WeekdayButton = ({ id, selected, children, onPress }: WeekdayButtonProps) => {
  return (
    <Pressable
      style={[styles.button, selected ? styles.buttonSelected : null]}
      onPress={() => onPress(id)}>
      <Text style={[typography.text, styles.text]}>{children}</Text>
    </Pressable>
  );
};

const WeekdaySelector = ({ value, onSelect }: WeekdaySelectorProps) => {
  const onPress = (id: number) => {
    if (id === value) {
      onSelect(undefined);
    } else {
      onSelect(id);
    }
  };

  return (
    <View style={styles.container}>
      <WeekdayButton selected={value === 1} id={1} onPress={onPress}>
        {i18n.t('weekdays.Mo')}
      </WeekdayButton>
      <WeekdayButton selected={value === 2} id={2} onPress={onPress}>
        {i18n.t('weekdays.Tu')}
      </WeekdayButton>
      <WeekdayButton selected={value === 3} id={3} onPress={onPress}>
        {i18n.t('weekdays.We')}
      </WeekdayButton>
      <WeekdayButton selected={value === 4} id={4} onPress={onPress}>
        {i18n.t('weekdays.Th')}
      </WeekdayButton>
      <WeekdayButton selected={value === 5} id={5} onPress={onPress}>
        {i18n.t('weekdays.Fr')}
      </WeekdayButton>
      <WeekdayButton selected={value === 6} id={6} onPress={onPress}>
        {i18n.t('weekdays.Sa')}
      </WeekdayButton>
      <WeekdayButton selected={value === 0} id={0} onPress={onPress}>
        {i18n.t('weekdays.Su')}
      </WeekdayButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 400,
    width: '100%',
  },
  button: {
    backgroundColor: '#989898',
    borderRadius: 100,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: MAIN_BLUE,
  },
  text: {
    color: '#fff',
  },
});

export default WeekdaySelector;
