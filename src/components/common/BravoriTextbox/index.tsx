import { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleProp, ViewStyle, DimensionValue } from 'react-native';

import { validateFn } from './logic';
import BravoriTextboxStyles from './styles';

import spacing from '@/commonStyles/Spacing';
import Icon, { IconProps } from '@/components/common/Icon';

export interface BravoriTextBoxProps {
  inputValue: string;
  onChangeText?: (str: string) => void;
  type: 'email' | 'password' | 'text' | 'number';
  placeholder: string;
  validation?: RegExp | ((value: string) => boolean);
  errorMessage?: string;
  iconFocused?: IconProps['name'];
  iconUnfocused?: IconProps['name'];
  style?: StyleProp<ViewStyle>;
  onValidate?: (valid: boolean) => void;
  multiline?: boolean;
  containerHeight?: DimensionValue;
  outlined?: boolean;
  placeholderLong?: string;
}

const BravoriTextbox = ({
  inputValue,
  onChangeText,
  type,
  placeholder,
  validation,
  errorMessage,
  iconFocused,
  iconUnfocused,
  style,
  onValidate,
  multiline = false,
  containerHeight,
  outlined = false,
  placeholderLong,
}: BravoriTextBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showError, setShowError] = useState(false);

  const validate = validateFn(validation, setIsValid, onValidate);

  const emitValue = (val: string) => {
    const newVal = type === 'email' ? val.toLowerCase() : val;
    validate(newVal);
    if (onChangeText) onChangeText(newVal);
  };

  useEffect(() => {
    validate(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setShowError(inputValue.length > 0 && !isFocused && !isValid);
  }, [isFocused]);

  const keyboardType = (() => {
    if (type === 'email') return 'email-address';
    if (type === 'number') return 'number-pad';
    return 'default';
  })();

  const outlinedStyle = outlined && !isFocused && !showError ? BravoriTextboxStyles.outline : null;
  const containerHeightStyle = containerHeight ? { height: containerHeight } : null;
  const warningBorder = !isValid && showError ? BravoriTextboxStyles.warningBorder : null;
  const focusedStyle = isFocused ? BravoriTextboxStyles.containerFocused : null;

  const highlightedText = (
    <View style={BravoriTextboxStyles.highlightedTextContainer}>
      <Text style={BravoriTextboxStyles.highlightedText}>{placeholder}</Text>
      <View style={BravoriTextboxStyles.underlay} />
    </View>
  );

  return (
    <View style={[BravoriTextboxStyles.mainContainer, spacing.mt1, style]}>
      <View
        style={[
          BravoriTextboxStyles.container,
          focusedStyle,
          warningBorder,
          containerHeightStyle,
          outlinedStyle,
        ]}>
        {isFocused || inputValue.length > 0 ? highlightedText : null}

        {isFocused && iconFocused ? <Icon name={iconFocused} /> : null}
        {!isFocused && iconUnfocused ? <Icon name={iconUnfocused} /> : null}
        <TextInput
          value={inputValue}
          secureTextEntry={type === 'password'}
          keyboardType={keyboardType}
          style={[BravoriTextboxStyles.input, containerHeightStyle]}
          placeholder={placeholderLong || placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(val) => emitValue(val)}
          multiline={multiline}
        />
      </View>
      {!isValid && showError ? (
        <View>
          <Text style={BravoriTextboxStyles.warningText}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default BravoriTextbox;
