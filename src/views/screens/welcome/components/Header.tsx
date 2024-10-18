import { PropsWithChildren } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import WelcomeStyles from '../styles';

import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <View>
      <View style={WelcomeStyles.contentContainer}>
        <Image style={styles.logo} source={require('assets/logos/Bravori_Logo_cropped.png')} />
      </View>
      <View style={[WelcomeStyles.contentContainer, spacing.mt1]}>
        <Text style={typography.h2}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default Header;
