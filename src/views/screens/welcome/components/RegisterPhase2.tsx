import { KeyboardAvoidingView, Pressable, Text } from 'react-native';

import { FormProps } from '../Register';
import useFormValid from '../lib/useFormValid';
import WelcomeStyles from '../styles';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import BravoriTextbox from '@/components/common/BravoriTextbox';
import i18n from '@/translations/i18n';

interface Props {
  submit: () => void;
  form: FormProps;
  setForm: (value: FormProps) => void;
  isSubmitting: boolean;
  back: () => void;
}

const RegisterPhase2 = ({ submit, form, setForm, isSubmitting, back }: Props) => {
  const [isFormValid, setFormFieldValidity] = useFormValid(['email', 'password', 'password2']);

  const userNameValidation = form.userType === 'Student' ? (str: string) => str.length > 3 : /@/;
  const validationErrorMessage =
    form.userType === 'Student' ? i18n.t('welcome.uniqueNameAlert') : i18n.t('welcome.validEmail');

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={[WelcomeStyles.contentContainer, spacing.mt2]}>
      <BravoriTextbox
        inputValue={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        type="email"
        placeholder={
          form.userType === 'Student'
            ? i18n.t('teacher.AddStudent.Username')
            : i18n.t('welcome.emailAddress')
        }
        iconFocused="EmailSelected"
        iconUnfocused="EmailUnselected"
        validation={userNameValidation}
        errorMessage={validationErrorMessage}
        onValidate={(bool) => setFormFieldValidity('email', bool)}
      />
      <BravoriTextbox
        inputValue={form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
        type="password"
        placeholder={i18n.t('welcome.Password')}
        iconFocused="PasswordSelected"
        iconUnfocused="PasswordUnselected"
        validation={new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')}
        errorMessage={i18n.t('welcome.charactersError')}
        onValidate={(bool) => {
          setFormFieldValidity('password', bool);
          setFormFieldValidity('password2', form.password === form.password2);
        }}
      />
      <BravoriTextbox
        inputValue={form.password2}
        onChangeText={(value) => setForm({ ...form, password2: value })}
        type="password"
        placeholder={i18n.t('welcome.enterPassword')}
        iconFocused="PasswordSelected"
        iconUnfocused="PasswordUnselected"
        validation={(val) => form.password === val}
        errorMessage={i18n.t('welcome.charactersError')}
        onValidate={(bool) => setFormFieldValidity('password2', bool)}
      />

      <BravoriButton enabled={isFormValid && !isSubmitting} style={spacing.mt2} onPress={submit}>
        {i18n.t('welcome.Register')}
      </BravoriButton>

      <Pressable style={spacing.mt2} onPress={back}>
        <Text style={[typography.text, typography.actionColor]}>{i18n.t('general.Back')}</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default RegisterPhase2;
