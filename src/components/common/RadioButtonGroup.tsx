import { useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import { MAIN_BLUE } from '@/Colors';
import formStyle from '@/commonStyles/Form';
import typography from '@/commonStyles/Typography';

interface Choice {
  id: string;
  label: string;
  value: string;
}

interface Props {
  style?: StyleProp<ViewStyle>;
  choices: Choice[];
  layout?: 'row' | 'column';
  onSelect?: (val: string) => void;
  value?: string;
}

const RadioButtonGroup = ({ style, choices, layout = 'column', onSelect, value }: Props) => {
  const radioButtons = useMemo(() => choices.map((c) => ({ ...c, ...styles.radio })), [choices]);

  return (
    <RadioGroup
      containerStyle={[styles.container, style]}
      radioButtons={radioButtons}
      selectedId={value}
      onPress={onSelect}
      layout={layout}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: formStyle.maxFormWidth.maxWidth,
  },
  radio: {
    borderColor: MAIN_BLUE,
    color: MAIN_BLUE,
    labelStyle: typography.textBig,
  },
});

export default RadioButtonGroup;
