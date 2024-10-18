import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Alert } from 'react-native';

import Header from './components/Header';
import ResetPhase1 from './components/ResetPhase1';
import ResetPhase2 from './components/ResetPhase2';
import { resetPassword } from './lib/db';
import WelcomeStyles from './styles';

import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import Slides from '@/components/common/Slides';
import i18n from '@/translations/i18n';

const ResetPassword = () => {
  /* STATE */

  const [phase, setPhase] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <ComponentWithBackground type="topbottom" scroll={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[WelcomeStyles.container]}>
          <Header>{i18n.t('general.Welcome')}!</Header>

          <Slides showSlideNumber={phase} style={{ flex: 0 }}>
            <ResetPhase1
              submit={() => {
                setPhase(phase + 1);
                resetPassword({ email });
                Alert.alert(i18n.t('welcome.resetLinkAlert'));
              }}
              email={email}
              setEmail={setEmail}
            />
            <ResetPhase2 back={() => setPhase(phase - 1)} />
          </Slides>

          <View style={{ flex: 1 }} />
        </View>
      </TouchableWithoutFeedback>
    </ComponentWithBackground>
  );
};

export default ResetPassword;
