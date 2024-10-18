import { StyleSheet } from 'react-native';

import { TEXT_BODY, MAIN_BLUE, ACTION, WARNING } from '@/Colors';

const FONTS = {
  Regular: 'Nunito',
  Bold: 'Nunito-Bold',
};

const baseStyle = StyleSheet.create({
  text: {
    color: TEXT_BODY,
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
});

const typography = StyleSheet.create({
  h1: {
    ...baseStyle.text,
    fontFamily: FONTS.Bold,
    fontSize: 40,
    color: MAIN_BLUE,
    textAlign: 'center',
  },
  h2: {
    ...baseStyle.text,
    fontFamily: FONTS.Bold,
    fontSize: 30,
    textAlign: 'center',
  },
  h3: {
    ...baseStyle.text,
    fontFamily: FONTS.Bold,
    fontSize: 22,
    textAlign: 'center',
  },
  h4: {
    ...baseStyle.text,
    fontSize: 22,
    textAlign: 'center',
  },
  textBig: {
    ...baseStyle.text,
    fontSize: 20,
  },
  text: {
    ...baseStyle.text,
    fontSize: 16,
  },
  textSmall: {
    ...baseStyle.text,
  },
  center: {
    textAlign: 'center',
  },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },
  actionColor: {
    color: ACTION,
  },
  warningColor: {
    color: WARNING,
  },
  bold: {
    fontFamily: FONTS.Bold,
  },
});

export default typography;
