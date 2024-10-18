import Checkbox from 'expo-checkbox';
import { useEffect } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, Pressable, View } from 'react-native';

import { FormProps } from '../Register';
import useFormValid from '../lib/useFormValid';
import WelcomeStyles from '../styles';

import { MAIN_ORANGE } from '@/Colors';
import formStyle from '@/commonStyles/Form';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import BravoriTextbox from '@/components/common/BravoriTextbox';
import Language from '@/components/common/Language';
import RadioButtonGroup from '@/components/common/RadioButtonGroup';
import i18n from '@/translations/i18n';
import { User } from '@/types/User';

interface Props {
  submit: () => void;
  form: FormProps;
  setForm: (value: FormProps) => void;
  openPrivacyPolicy: () => void;
}

const RegisterPhase1 = ({ submit, form, setForm, openPrivacyPolicy }: Props) => {
  const radioChoices = [
    {
      id: 'Student',
      label: i18n.t('general.Student'),
      value: 'Student',
    },
    {
      id: 'Teacher',
      label: i18n.t('general.Teacher'),
      value: 'Teacher',
    },
  ];

  const [isFormValid, setFormFieldValidity] = useFormValid(['name', 'school', 'privacyPolicy']);
  useEffect(() => {
    setFormFieldValidity('privacyPolicy', form.privacyPolicyChecked);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={[WelcomeStyles.contentContainer, spacing.mt2]}>
      <Text style={[typography.text, typography.bold, spacing.mb1]}>
        {i18n.t('general.language')}
      </Text>
      <Language
        selected={form.language || 'en'}
        onSelect={(lang) => setForm({ ...form, language: lang })}
      />

      <BravoriTextbox
        inputValue={form.name}
        onChangeText={(val) => setForm({ ...form, name: val })}
        validation={/^\D{2,}$/}
        errorMessage={i18n.t('welcome.nameError')}
        type="text"
        placeholder={i18n.t('welcome.Name')}
        onValidate={(bool) => setFormFieldValidity('name', bool)}
      />

      <BravoriTextbox
        inputValue={form.school}
        onChangeText={(val) => setForm({ ...form, school: val })}
        validation={/^\D{2,}$/}
        errorMessage={i18n.t('welcome.teacherError')}
        type="text"
        placeholder={i18n.t('welcome.schoolTeacher')}
        onValidate={(bool) => setFormFieldValidity('school', bool)}
      />
      <Text style={[typography.textBig, styles.text, spacing.mt1]}>{i18n.t('welcome.IamA')}</Text>
      <RadioButtonGroup
        value={form.userType}
        onSelect={(val) => setForm({ ...form, userType: val as User['userType'] })}
        choices={radioChoices}
        style={[styles.radioGroup, spacing.mt1]}
        layout="row"
      />

      <View style={[{ flexDirection: 'row', width: '100%' }, spacing.mt1]}>
        <Checkbox
          style={[spacing.mr1]}
          value={form.privacyPolicyChecked}
          onValueChange={(bool) => {
            setForm({ ...form, privacyPolicyChecked: bool });
            setFormFieldValidity('privacyPolicy', bool);
          }}
          color={form.privacyPolicyChecked ? MAIN_ORANGE : undefined}
        />
        <Text style={[typography.text]}>{i18n.t('welcome.iAgree')}</Text>
        <Pressable onPress={openPrivacyPolicy}>
          <Text style={[typography.text, typography.actionColor]}>
            {i18n.t('welcome.privacyPolicy')}
          </Text>
        </Pressable>
      </View>

      <BravoriButton enabled={isFormValid} style={spacing.mt2} onPress={submit}>
        {i18n.t('general.Continue')}
      </BravoriButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    width: '100%',
    alignItems: 'flex-start',
  },
  text: {
    width: '100%',
    maxWidth: formStyle.maxFormWidth.maxWidth,
  },
});
export default RegisterPhase1;
