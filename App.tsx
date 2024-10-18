// Temporary fix for expo@51:
// https://github.com/expo/expo/issues/28618
import 'react-native-reanimated';
//

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { FontProvider } from './src/components/FontLoaderSystem/FontContext';
import BackgroundMusicPlayer from './src/components/common/backgroundMusicStudent';
import store from './src/state/store'; // typescript

import Navigation from '@/views/navigation';

(window.navigator as any).userAgent = 'ReactNative';
export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Nunito: require('assets/fonts/Nunito.ttf'),
    'Nunito-Bold': require('assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ActionSheetProvider>
        <FontProvider>
          <SafeAreaProvider>
            <Navigation />
            <BackgroundMusicPlayer />
          </SafeAreaProvider>
        </FontProvider>
      </ActionSheetProvider>
    </Provider>
  );
}
