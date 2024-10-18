import BottomBackground from 'assets/svgs/NewUI_Elements/bg/bg_background-gradients_bottom.svg';
import TopBackground from 'assets/svgs/NewUI_Elements/bg/bg_background-gradients_top.svg';
import { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NavHeader from './NavHeader';
import Spinner from './Spinner';

import { MAIN_CONTAINER_BG } from '@/Colors';
import spacing from '@/commonStyles/Spacing';
import { User } from '@/types/User';
interface ComponentWithBackgroundProps {
  type: 'none' | 'top' | 'topbottom' | 'header';
  scroll: boolean;
  onBack?: () => void;
  goBackText?: string;
  fullScreenLoading?: boolean;
  user?: User | null;
  title?: string;
}

export default function ComponentWithBackground({
  children,
  type,
  scroll = true,
  onBack,
  goBackText,
  fullScreenLoading = false,
  user,
  title,
}: PropsWithChildren<ComponentWithBackgroundProps>) {
  const insets = useSafeAreaInsets();

  const topBg = <TopBackground style={{ ...styles.bg }} preserveAspectRatio="none" width="100%" />;
  const bottomBg = (
    <BottomBackground style={{ ...styles.bottomBg }} preserveAspectRatio="none" width="100%" />
  );
  const getView = (children: ReactNode) => {
    return scroll ? (
      <ScrollView
        bounces={false}
        style={styles.mainContainer}
        contentContainerStyle={styles.mainContainer}>
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.mainContainer]}>{children}</View>
    );
  };

  const topBgs = {
    none: <></>,
    top: topBg,
    topbottom: topBg,
    header: (
      <NavHeader
        profilePic={user?.profilePhoto}
        name={user?.name}
        onBack={onBack}
        backText={goBackText}
        title={title}
      />
    ),
  };

  const bottomBgs = {
    none: <></>,
    top: <></>,
    topbottom: bottomBg,
    header: <></>,
  };

  const topPadding = type !== 'header' ? { paddingTop: Math.max(insets.top, 16) } : null;

  const content = fullScreenLoading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner />
    </View>
  ) : (
    children
  );

  const kids = (
    <>
      {topBgs[type]}
      <View style={[styles.container, topPadding]}>{content}</View>
      {bottomBgs[type]}
    </>
  );

  return getView(kids);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...spacing.ph2,
    ...spacing.pb2,
  },
  bg: {
    position: 'absolute',
    zIndex: -1,
    minHeight: 250,
  },
  bottomBg: {
    zIndex: -1,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  mainContainer: {
    backgroundColor: MAIN_CONTAINER_BG,
    flexGrow: 1,
  },
});
