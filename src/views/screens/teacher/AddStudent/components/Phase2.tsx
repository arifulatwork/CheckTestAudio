import { startOfDay } from 'date-fns';
import { useMemo } from 'react';
import { View, Text } from 'react-native';

import NavButtons from './NavButtons';
import WeekdaySelector from './WeekdaySelector';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import DatePicker from '@/components/common/DatePicker';
import i18n from '@/translations/i18n';

type Props = {
  movePhaseBy: (value: number) => void;
  selectedWeekday: number | undefined;
  setWeekday: (value: number | undefined) => void;
  selectedDate: Date | undefined;
  setDate: (date: Date) => void;
};

const Phase2 = ({ movePhaseBy, selectedWeekday, setWeekday, selectedDate, setDate }: Props) => {
  const formIsValid = useMemo(() => {
    return selectedWeekday !== undefined && selectedDate !== undefined;
  }, [selectedWeekday, selectedDate]);

  const dateDisabled = useMemo(
    () => (day: Date) =>
      day.getDay() !== selectedWeekday || day.getTime() < startOfDay(new Date()).getTime(),
    [selectedWeekday]
  );

  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
      }}>
      <Text style={[typography.h3, spacing.mt1]}>
        {i18n.t('teacher.AddStudent.StudentLessonSchedule')}
      </Text>
      <Text style={[typography.textBig, spacing.mv1]}>
        {i18n.t('teacher.AddStudent.SelectLessonDay')}
      </Text>
      <WeekdaySelector value={selectedWeekday} onSelect={setWeekday} />
      <Text style={[typography.textBig, spacing.mt2]}>
        {i18n.t('teacher.AddStudent.StartingDate')}
      </Text>
      <DatePicker
        dateDisabled={dateDisabled}
        selectedDate={selectedDate}
        onSelectDate={setDate}
        style={[spacing.mt1, { flex: 1 }]}
      />
      <View style={{ flex: 1 }} />
      <NavButtons movePhaseBy={movePhaseBy} enabled={[true, formIsValid]} />
    </View>
  );
};

export default Phase2;
