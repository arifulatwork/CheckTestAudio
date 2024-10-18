import { addMonths } from 'date-fns';
import { useMemo, useState } from 'react';
import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet } from 'react-native';

import Month from './Month';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import i18n from '@/translations/i18n';

const DatePicker = ({
  weekStart = 'monday',
  selectedDate,
  onSelectDate,
  style,
  dateDisabled,
}: {
  weekStart?: 'monday' | 'sunday';
  selectedDate?: Date;
  onSelectDate: (val: Date) => void;
  style?: StyleProp<ViewStyle>;
  dateDisabled?: (date: Date) => boolean;
}) => {
  const [viewMonth, setViewMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const days = [
    'weekdays.Mo',
    'weekdays.Tu',
    'weekdays.We',
    'weekdays.Th',
    'weekdays.Fr',
    'weekdays.Sa',
  ];
  const months = [
    'months.january',
    'months.february',
    'months.march',
    'months.april',
    'months.may',
    'months.june',
    'months.july',
    'months.august',
    'months.september',
    'months.october',
    'months.november',
    'months.december',
  ];
  if (weekStart === 'monday') days.push('weekdays.Su');
  if (weekStart === 'sunday') days.unshift('weekdays.Su');

  const changeMonth = useMemo(
    () => (amount: number) => {
      const newDate = addMonths(new Date(`${viewMonth.year}-${viewMonth.month}-01`), amount);
      setViewMonth({
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear(),
      });
    },
    [viewMonth]
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={[typography.h3, typography.left, spacing.mv1, { flex: 1, fontSize: 18 }]}>
          {i18n.t(months[viewMonth.month - 1])} {viewMonth.year}
        </Text>
        <View style={styles.monthControls}>
          <Pressable onPress={() => changeMonth(-1)}>
            <Text style={[spacing.mr2, styles.monthControlsText]}>{'<'}</Text>
          </Pressable>
          <Pressable onPress={() => changeMonth(1)}>
            <Text style={[styles.monthControlsText]}>{'>'}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.weekdaysContainer}>
        {days.map((d) => (
          <View style={styles.weekdaysContainerCell} key={d}>
            <Text style={typography.text}>{i18n.t(d)}</Text>
          </View>
        ))}
      </View>
      <Month
        onSelect={onSelectDate}
        month={viewMonth.month}
        year={viewMonth.year}
        weekStart={weekStart}
        selectedDate={selectedDate}
        dateDisabled={dateDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  header: { flexDirection: 'row' },
  monthControls: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  monthControlsText: {
    ...typography.textBig,
    ...typography.bold,
    fontSize: 30,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cecece',
  },
  weekdaysContainerCell: { width: '14.285714285714286%', alignItems: 'center' },
});

export default DatePicker;
