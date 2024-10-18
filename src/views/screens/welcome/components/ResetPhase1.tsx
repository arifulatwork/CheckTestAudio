import { KeyboardAvoidingView, Text } from 'react-native';

import useFormValid from '../lib/useFormValid';
import WelcomeStyles from '../styles';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import BravoriTextbox from '@/components/common/BravoriTextbox';
import i18n from '@/translations/i18n';

interface Props {
  submit: () => void;
  email: string;
  setEmail: (value: string) => void;
}

const ResetPhase1 = ({ submit, email, setEmail }: Props) => {
  const [isFormValid, setFormFieldValidity] = useFormValid(['email']);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={[WelcomeStyles.contentContainer, spacing.mt2]}>
      <Text style={typography.h4}>{i18n.t('welcome.enterEmail')}</Text>
      <Text style={typography.h4}>{i18n.t('welcome.resetLink')}</Text>
      <BravoriTextbox
        inputValue={email}
        onChangeText={(val) => setEmail(val)}
        type="email"
        placeholder={i18n.t('welcome.Email')}
        iconFocused="EmailSelected"
        iconUnfocused="EmailUnselected"
        validation={/@/}
        errorMessage={i18n.t('welcome.validEmail')}
        onValidate={(bool) => setFormFieldValidity('email', bool)}
      />

      <BravoriButton enabled={isFormValid} style={spacing.mt2} onPress={submit}>
        {i18n.t('welcome.Submit')}
      </BravoriButton>
    </KeyboardAvoidingView>
  );
};

export default ResetPhase1;
