import { PropsWithChildren } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  DimensionValue,
} from 'react-native';

import Icon, { IconProps } from './Icon';

import { MAIN_ORANGE, MAIN_BLUE, WARNING } from '@/Colors';
import typography from '@/commonStyles/Typography';

interface BravoriButtonProps {
  bgColor?: 'primary' | 'secondary' | 'destructive';
  beforeIcon?: IconProps['name'];
  afterIcon?: IconProps['name'];
  onPress?: () => void;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  type?: 'normal' | 'small' | 'round';
  noPadding?: boolean;
  iconSize?: { width?: DimensionValue; height?: DimensionValue };
  inline?: boolean;
}

const BravoriButton = ({
  style,
  bgColor = 'primary',
  children,
  beforeIcon,
  afterIcon,
  onPress,
  enabled = true,
  type = 'normal',
  noPadding = false,
  inline = true,
  iconSize,
  innerStyle,
}: PropsWithChildren<BravoriButtonProps>) => {
  const background = styles[bgColor];

  return (
    <View style={[styles.wrapper, style]}>
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={!enabled}
        style={[
          styles.button,
          background,
          !inline ? { width: '100%' } : null,
          !enabled ? styles.disabled : null,
          type === 'small' ? styles.small : null,
          type === 'round' ? styles.round : null,
          noPadding ? { paddingHorizontal: 0, paddingVertical: 0 } : null,
          innerStyle ? innerStyle : null,
        ]}
        onPress={() => (enabled && onPress ? onPress() : null)}>
        {beforeIcon ? (
          <View
            style={[
              styles.icon,
              type === 'small' ? styles.iconSmall : null,
              iconSize ? iconSize : null,
              children ? { marginRight: 5 } : null,
            ]}>
            <Icon height="100%" width="100%" name={beforeIcon} />
          </View>
        ) : null}

        {children ? (
          <View style={styles.children}>
            <Text style={[styles.text, type === 'small' ? styles.smallText : null]}>
              {children}
            </Text>
          </View>
        ) : null}

        {afterIcon ? (
          <View
            style={[
              styles.icon,
              type === 'small' ? styles.iconSmall : null,
              iconSize ? iconSize : null,
              children ? { marginLeft: 5 } : null,
            ]}>
            <Icon height="100%" width="100%" name={afterIcon} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default BravoriButton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inlineWrapper: {
    flexDirection: 'column',
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  smallText: {
    fontSize: 14,
  },
  children: {
    justifyContent: 'center',
  },
  text: {
    ...typography.h3,
    color: '#fff',
  },
  primary: {
    backgroundColor: MAIN_ORANGE,
  },
  secondary: {
    backgroundColor: MAIN_BLUE,
  },
  destructive: {
    backgroundColor: WARNING,
  },
  disabled: {
    backgroundColor: '#cecece',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
  },
  iconSmall: {
    width: 19,
    height: 19,
  },
  round: {
    borderRadius: 1000,
  },
});
