import { FIREBASE_AUTH } from 'firebaseConfig';
import { useState } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { View, Text, StyleSheet, Alert } from 'react-native';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';
import BravoriButton from '@/components/common/BravoriButton';
import ComponentWithBackground from '@/components/common/ComponentWithBackground';
import i18n from '@/translations/i18n';

const NavigationError = () => {
  const [signOut] = useSignOut(FIREBASE_AUTH);
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setLoading(true);
    const success = await signOut();
    if (success) {
      Alert.alert(i18n.t('components.navigationError.signOutAlert'));
    }
    setLoading(false);
  };

  return (
    <ComponentWithBackground type="none" scroll={false}>
      <View style={styles.container}>
        <Text style={typography.h4}>
          {i18n.t('components.navigationError.navigationErrorText')}
        </Text>
        <BravoriButton style={spacing.mt2} onPress={onPress} enabled={!loading}>
          {i18n.t('components.navigationError.signOut')}
        </BravoriButton>
      </View>
    </ComponentWithBackground>
  );
};

export default NavigationError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
