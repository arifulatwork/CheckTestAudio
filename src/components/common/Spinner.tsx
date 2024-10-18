import { StyleSheet, View, Image, StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const Spinner = ({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        resizeMode="contain"
        style={{ width: '100%', height: '100%' }}
        source={require('assets/Spinner-1s-200px.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});

export default Spinner;
