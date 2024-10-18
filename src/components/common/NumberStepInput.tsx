import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { MAIN_BLUE } from '@/Colors';
import typography from '@/commonStyles/Typography';

interface NumberStepInputProps {
  label?: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  minValue: number;
  maxValue?: number;
}

const NumberStepInput: React.FC<NumberStepInputProps> = ({
  label,
  value,
  step = 1,
  minValue,
  maxValue,
  onChange,
  style,
}) => {
  const changeText = (text: string) => {
    onChange(parseInt(text, 10));
  };

  return (
    <View style={[style, { flex: 1 }]}>
      <Text style={[typography.text, typography.bold]}>{label}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => onChange(value - step < minValue ? minValue : value - step)}>
          <Text style={styles.buttonText}>-{step === 1 ? null : step}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputBox}
          onChangeText={changeText}
          defaultValue={value.toString()}
          keyboardType="numeric"
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={() => {
            if(value + step < minValue)
            {
              onChange(minValue)
            } else if (maxValue !== undefined && value + step > maxValue)
            {
              onChange(maxValue)
            } 
            else
            {
              onChange(value+step)
            }
          }}>
          <Text style={styles.buttonText}>+{step === 1 ? null : step}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: MAIN_BLUE,
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    ...typography.text,
    ...typography.bold,
    color: '#fff',
  },

  inputBox: {
    borderWidth: 1,
    borderColor: MAIN_BLUE,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
    flex: 2,
    ...typography.text,
    ...typography.bold,
    marginHorizontal: 5,
  },
});

export default NumberStepInput;
