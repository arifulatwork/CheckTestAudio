import { StyleSheet } from 'react-native';

import { MAIN_BLUE, WARNING } from '@/Colors';
import formStyle from '@/commonStyles/Form';
import typography from '@/commonStyles/Typography';

const BravoriTextboxStyles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    maxWidth: formStyle.maxFormWidth.maxWidth,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  containerFocused: {
    borderColor: MAIN_BLUE,
  },
  input: {
    ...typography.text,
    height: 50,
    padding: 10,
    fontSize: 20,
    flex: 1,
  },
  highlightedTextContainer: {
    position: 'absolute',
    top: -10,
    left: 25,
    alignItems: 'center',
  },
  underlay: {
    height: 4,
    backgroundColor: '#fff',
    position: 'relative',
    top: -12,
    zIndex: 0,
    width: '120%',
  },
  highlightedText: {
    ...typography.text,
    fontSize: 15,
    zIndex: 1,
  },
  warningText: {
    ...typography.warningColor,
    margin: 5,
  },
  warningBorder: {
    borderColor: WARNING,
  },
  outline: {
    borderColor: '#cecece',
  },
});

export default BravoriTextboxStyles;
