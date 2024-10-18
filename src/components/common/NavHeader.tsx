import HeaderImage from 'assets/svgs/NewUI_Elements/bg/bg_background-gradients_header.svg';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from './Icon';
import ProfilePic from './ProfilePic';

import { MAIN_CONTAINER_BG } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import typography from '@/commonStyles/Typography';

type Props = {
  onBack?: () => void;
  backText?: string;
  profilePic?: string;
  name?: string;
  title?: string;
};

const NavHeader = ({ onBack, backText, profilePic, name, title }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { maxHeight: 80 + insets.top }]}>
      <HeaderImage style={styles.image} preserveAspectRatio="none" width="100%" height="100%" />
      <View style={[styles.content, spacing.ph2, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={[styles.contentRow, styles.contentRowMain]}>
          <TouchableOpacity style={[styles.contentRow, { flex: title ? 1 : 2 }]} onPress={onBack}>
            <Icon name="Back" style={[styles.icon]} />
            <Text style={[typography.text, typography.bold, styles.textStyle]}>{backText}</Text>
          </TouchableOpacity>
          {title ? (
            <View style={{ flex: 1 }}>
              <Text style={[typography.text, typography.bold, typography.center, { fontSize: 18 }]}>
                {title}
              </Text>
            </View>
          ) : null}

          {profilePic ? (
            <View style={styles.image}>
              <ProfilePic style={styles.imageStyle} firebaseUri={profilePic} name={name} />
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '100%',
    backgroundColor: MAIN_CONTAINER_BG,
  },
  icon: {
    marginRight: 8,
  },
  image: {
    flex: 1,
    alignItems: 'flex-end',
    height: 50,
  },
  imageStyle: {
    aspectRatio: 1,
    height: '100%',
  },
  content: {
    position: 'absolute',
    width: '100%',
  },
  textStyle: {
    textDecorationLine: 'underline',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentRowMain: {
    alignItems: 'center',
  },
});

export default NavHeader;
