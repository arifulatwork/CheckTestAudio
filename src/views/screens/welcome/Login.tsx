import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';

import Header from './components/Header';
import { logInUser } from './lib/db';
import useFormValid from './lib/useFormValid';
import WelcomeStyles from './styles';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import BravoriTextbox from '@/components/common/BravoriTextbox';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import i18n from '@/translations/i18n';
import track from '@/utils/analytics';
import { PageParams } from '@/views/navigation';

type LoginPageProps = {
  navigation: NativeStackNavigationProp<PageParams, 'Login'>;
};

const Login = ({ navigation }: LoginPageProps) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [isValid, setFormFieldValidity] = useFormValid(['email', 'password']);

  const logInPress = async () => {
    setLoading(true);
    try {
      await logInUser(form);
      track({ name: 'Sign In' });
    } catch (e) {
      const er = e as FirebaseError;
      Alert.alert(er.message);
    }
    setLoading(false);
  };

  return (
    <ComponentWithBackground type="topbottom" scroll>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[WelcomeStyles.container]}>
          <Header>{i18n.t('welcome.welcomeHeader')}</Header>

          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <View style={[WelcomeStyles.contentContainer]}>
              <Text style={[typography.text]}>{i18n.t('welcome.loginToContinue')}</Text>
              <BravoriTextbox
                inputValue={form.email}
                onChangeText={(val) => setForm({ ...form, email: val })}
                type="email"
                placeholder={i18n.t('welcome.usernameAndEmail')}
                iconFocused="EmailSelected"
                iconUnfocused="EmailUnselected"
                validation={(str) => str.length > 3}
                errorMessage={i18n.t('welcome.validEmail')}
                onValidate={(bool) => setFormFieldValidity('email', bool)}
              />
              <BravoriTextbox
                inputValue={form.password}
                onChangeText={(val) => setForm({ ...form, password: val })}
                type="password"
                placeholder={i18n.t('welcome.Password')}
                iconFocused="PasswordSelected"
                iconUnfocused="PasswordUnselected"
                validation={new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')}
                onValidate={(bool) => setFormFieldValidity('password', bool)}
                errorMessage={i18n.t('welcome.charactersError')}
              />
              <BravoriButton
                style={spacing.mt1}
                bgColor="secondary"
                enabled={isValid && !loading}
                onPress={logInPress}>
                {i18n.t('welcome.Login')}
              </BravoriButton>
              <Pressable style={spacing.mt1} onPress={() => navigation.push('ResetPassword')}>
                <Text style={[typography.text, typography.actionColor]}>
                  {i18n.t('welcome.forgotPassword')}
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
          <View style={[spacing.mb1]}>
            <Text style={typography.h4}>{i18n.t('welcome.newHere')}</Text>
            <Text style={[typography.text, typography.center, spacing.mb1]}>
              {i18n.t('welcome.startYourJourney')}
            </Text>
            <BravoriButton onPress={() => navigation.push('Register')}>
              {i18n.t('welcome.Register')}
            </BravoriButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ComponentWithBackground>
  );
};

export default Login;
