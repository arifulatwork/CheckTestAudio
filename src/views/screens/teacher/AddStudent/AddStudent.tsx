import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Keyboard, Alert } from 'react-native';

import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Phase3 from './components/Phase3';
import { addStudentForTeacher } from './lib/db';

import useUser from '@/commonHooks/useUser';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import ProgressIndicator from '@/components/common/ProgressIndicator';
import Slides from '@/components/common/Slides';
import i18n from '@/translations/i18n';
import { PageParams } from '@/views/navigation';

type AddStudentProps = {
  navigation: NativeStackNavigationProp<PageParams, 'AddStudent'>;
};

export type AddStudentForm = {
  email: string;
  weekday: number | undefined;
  date: Date | undefined;
  time: {
    hour: number;
    minute: number;
    duration: number;
  };
};

const AddStudent = ({ navigation }: AddStudentProps) => {
  const [phase, setPhase] = useState(0);
  const [form, setForm] = useState<AddStudentForm>({
    email: '',
    weekday: undefined,
    date: new Date(),
    time: {
      hour: 9,
      minute: 0,
      duration: 30,
    },
  });

  const { firebaseUser, bravoriUser } = useUser();

  useEffect(() => {
    if (form.weekday !== form.date?.getDay()) setForm({ ...form, date: undefined });
  }, [form.date]);

  const movePhaseBy = async (num: number) => {
    const target = phase + num;
    if (target < 0) {
      navigation.goBack();
      return;
    }

    setPhase(target);

    if (target === 3) {
      if (form.weekday === undefined || form.date === undefined || !firebaseUser) return;

      try {
        // form has been submitted
        await addStudentForTeacher(
          {
            email: form.email,
            currentUserId: firebaseUser.uid,
            lessonPayload: {
              day: form.weekday,
              startDate: format(form.date, 'yyyy-MM-dd'),
              time: form.time,
            },
          },
          bravoriUser?.school || ''
        );
        Alert.alert(
          i18n.t('teacher.AddStudent.studentAdded'),
          `${i18n.t('teacher.AddStudent.Student')} ${form.email} ${i18n.t('teacher.AddStudent.Added')}!`
        );
        navigation.navigate('StudentList');
      } catch (e) {
        const er = e as Error;
        Alert.alert(er.message);
        setPhase(0);
      }
    }
  };

  return (
    <Pressable style={[spacing.pa2, styles.container]} onPress={Keyboard.dismiss}>
      <Text style={[typography.h2]}>{i18n.t('teacher.AddStudent.AddNewStudent')}</Text>

      <ProgressIndicator numberOfItems={3} progress={phase} style={[spacing.mt1]} />
      <Slides showSlideNumber={phase}>
        <Phase1
          movePhaseBy={movePhaseBy}
          email={form.email}
          setEmail={(email) => setForm({ ...form, email })}
        />
        <Phase2
          movePhaseBy={movePhaseBy}
          selectedWeekday={form.weekday}
          selectedDate={form.date}
          setWeekday={(weekday) => setForm({ ...form, weekday })}
          setDate={(date) => setForm({ ...form, date })}
        />
        <Phase3
          movePhaseBy={movePhaseBy}
          time={form.time}
          onTimeChange={(time) => setForm({ ...form, time })}
        />
        <View>
          <Text>
            {i18n.t('general.Loading')} {i18n.t('general.PleaseWait')}
          </Text>
        </View>
      </Slides>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddStudent;
