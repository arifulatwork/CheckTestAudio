import { KeyboardAvoidingView, Text } from 'react-native';

import WelcomeStyles from '../styles';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import i18n from '@/translations/i18n';

interface Props {
  back: () => void;
}

const ResetPhase2 = ({ back }: Props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={[WelcomeStyles.contentContainer, spacing.mt2]}>
      <Text style={typography.h4}>{i18n.t('welcome.resetLink')}</Text>
      <Text style={typography.h4}>{i18n.t('welcome.checkEmail')}</Text>
      <Text style={typography.h4}>{i18n.t('welcome.emailDoesntArrive')}</Text>

      <BravoriButton style={spacing.mt2} onPress={back}>
        {i18n.t('general.Back')}
      </BravoriButton>
    </KeyboardAvoidingView>
  );
};

export default ResetPhase2;
