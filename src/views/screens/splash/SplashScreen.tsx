import { View, Image, StyleSheet } from 'react-native';

import screenStyle from '@/commonStyles/Screen';

const SplashScreen = () => {
  return (
    <View style={[styles.container, screenStyle.background]}>
      <Image style={styles.logo} source={require('assets/logos/Bravori_Logo_cropped.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
