import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Text, Alert } from 'react-native';

import Header from './components/Header';
import RegisterPhase1 from './components/RegisterPhase1';
import RegisterPhase2 from './components/RegisterPhase2';
import { createAccount, makeUserNameWithEmail } from './lib/db';
import WelcomeStyles from './styles';

import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import Slides from '@/components/common/Slides';
import i18n from '@/translations/i18n';
import { User } from '@/types/User';
import { PageParams } from '@/views/navigation';

export interface FormProps extends Pick<User, 'school' | 'userType' | 'name' | 'language'> {
  email: string;
  password: string;
  password2: string;
  privacyPolicyChecked: boolean;
}

type RegisterPageProps = {
  navigation: NativeStackNavigationProp<PageParams, 'Register'>;
};

const Register = ({ navigation }: RegisterPageProps) => {
  /* STATE */

  const [form, setForm] = useState<FormProps>({
    name: '',
    school: '',
    email: '',
    password: '',
    password2: '',
    userType: 'Student',
    privacyPolicyChecked: false,
    language: 'en',
  });

  const [phase, setPhase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateKey, setUpdateKey] = useState(Date.now());

  /* HANDLE REGISTRATION */

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const payload: User = {
        name: form.name,
        userType: form.userType,
        school: form.school,
        language: form.language,
        rewards: [],
      };
      if (form.userType === 'Student')
        payload.emailForAddStudent = makeUserNameWithEmail(form.email);
      await createAccount(form, payload);
      Alert.alert(i18n.t('welcome.registerWelcomeText'));
    } catch (e) {
      console.error(e);
      Alert.alert('Error', i18n.t('welcome.encounteredError'));
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    i18n.locale = form.language || 'en';
    setUpdateKey(Date.now());
  }, [form.language]);

  return (
    <ComponentWithBackground type="topbottom" scroll key={updateKey.toString()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[WelcomeStyles.container]}>
          <Header>{i18n.t('welcome.Registration')}</Header>
          <Text style={[typography.textBig, typography.center]}>{phase + 1}/2</Text>

          <Slides showSlideNumber={phase} style={{ flex: 0 }}>
            <RegisterPhase1
              openPrivacyPolicy={() => navigation.navigate('PrivacyPolicy')}
              submit={() => setPhase(phase + 1)}
              form={form}
              setForm={setForm}
            />
            <RegisterPhase2
              submit={submit}
              back={() => setPhase(phase - 1)}
              form={form}
              setForm={setForm}
              isSubmitting={isSubmitting}
            />
          </Slides>

          <View style={{ flex: 1 }} />
        </View>
      </TouchableWithoutFeedback>

      <BravoriButton
        onPress={navigation.goBack}
        type="small"
        beforeIcon="IconBackWhite"
        bgColor="secondary"
        style={{ maxWidth: 40 }}
      />
    </ComponentWithBackground>
  );
};

export default Register;
