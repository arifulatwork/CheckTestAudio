import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

import NavButtons from './NavButtons';
import { AddStudentForm } from '../AddStudent';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import i18n from '@/translations/i18n';

const padLeft = (numberStr: string) => (numberStr.length === 1 ? '0' + numberStr : numberStr);

type Props = {
  movePhaseBy: (phase: number) => void;
  onTimeChange: (time: AddStudentForm['time']) => void;
  time: AddStudentForm['time'];
};

const Phase3 = ({ movePhaseBy, time, onTimeChange }: Props) => {
  const hours = new Array(24)
    .fill(0)
    .map((_, idx) => (
      <Picker.Item label={padLeft(idx.toString())} value={idx} key={'hour' + idx} />
    ));

  const minutes = [0, 15, 30, 45].map((item) => (
    <Picker.Item label={padLeft(item.toString())} value={item} key={'min' + item} />
  ));

  const durations = [15, 30, 45, 60, 90, 120].map((item) => (
    <Picker.Item label={padLeft(item.toString())} value={item} key={'dur' + item} />
  ));

  return (
    <View
      style={[spacing.pt2, { justifyContent: 'flex-end', height: '100%', alignItems: 'center' }]}>
      <Text style={[typography.h3]}>{i18n.t('teacher.AddStudent.SelectLessonTime')}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 400 }}>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={time.hour}
            onValueChange={(itemValue) => onTimeChange({ ...time, hour: itemValue })}>
            {hours}
          </Picker>
        </View>
        <View>
          <Text style={[typography.h3]}>:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Picker
            selectedValue={time.minute}
            onValueChange={(itemValue) => onTimeChange({ ...time, minute: itemValue })}>
            {minutes}
          </Picker>
        </View>
      </View>
      <Text style={[typography.h3]}>{i18n.t('teacher.AddStudent.SelectLessonDuration')}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 400 }}>
        <View style={{ flex: 2 }}>
          <Picker
            selectedValue={time.duration}
            onValueChange={(itemValue) => onTimeChange({ ...time, duration: itemValue })}>
            {durations}
          </Picker>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[typography.h4]}>{i18n.t('general.Minutes')}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <NavButtons movePhaseBy={movePhaseBy} enabled={[true, true]} />
    </View>
  );
};

export default Phase3;
