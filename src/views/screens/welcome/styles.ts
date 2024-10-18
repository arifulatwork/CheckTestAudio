import { StyleSheet } from 'react-native';

import { MAIN_BLUE } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';

const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...spacing.mt1,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  title: {
    ...typography.bold,
    color: MAIN_BLUE,
    fontSize: 40,
  },
});

export default WelcomeStyles;
