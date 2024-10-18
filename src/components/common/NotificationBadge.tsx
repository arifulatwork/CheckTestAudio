import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';

import typography from '@/commonStyles/Typography';

type Props = {
  style?: StyleProp<ViewStyle>;
  value?: number;
};

const NotificationBadge = ({ value, style }: Props) => {
  if (!value || value <= 0) return null;
  return (
    <View style={[styles.badge, style]}>
      <Text style={(typography.bold, { color: 'white', fontSize: 15 })}>{value}</Text>
    </View>
  );
};

export default NotificationBadge;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'red',
    color: 'white',
    width: 22,
    height: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 0,
  },
});
