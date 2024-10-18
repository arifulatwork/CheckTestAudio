import { KeyboardAvoidingView, Text, View } from 'react-native';

import NavButtons from './NavButtons';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriTextbox from '@/components/common/BravoriTextbox';
import i18n from '@/translations/i18n';
import useFormValid from '@/views/screens/welcome/lib/useFormValid';

type Props = {
  movePhaseBy: (value: number) => void;
  email: string;
  setEmail: (value: string) => void;
};

const Phase1 = ({ movePhaseBy, email, setEmail }: Props) => {
  const [isValid, setIsValid] = useFormValid(['email']);
  const formatEmail = (email: string) => {
    setEmail(email.toLowerCase().trim());
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={170}
      behavior="padding"
      style={{
        height: '100%',
        alignItems: 'center',
      }}>
      <Text style={[typography.text, spacing.mv1]}>{i18n.t('teacher.AddStudent.AddStudent')}</Text>
      <BravoriTextbox
        inputValue={email}
        onChangeText={formatEmail}
        placeholder={i18n.t('teacher.AddStudent.Username')}
        type="email"
        validation={/[a-zA-Z1-9.]{4,}/}
        errorMessage={i18n.t('teacher.AddStudent.ErrorMessage')}
        onValidate={(valid) => setIsValid('email', valid)}
      />
      <View style={{ flex: 1 }} />
      <NavButtons movePhaseBy={movePhaseBy} enabled={[true, isValid]} />
    </KeyboardAvoidingView>
  );
};

export default Phase1;
