import { useFonts } from 'expo-font';
import React, { createContext, useContext } from 'react';

// Create a React context for fonts
const FontContext = createContext();

// Custom hook to use the FontContext
export const useFontContext = () => useContext(FontContext);

// FontProvider component
export const FontProvider = ({ children }) => {
  // Load fonts using Expo's useFonts hook
  const [fontsLoaded] = useFonts({
    Nunito: require('assets/fonts/Nunito.ttf'),
    'Nunito-Bold': require('assets/fonts/Nunito-Bold.ttf'),
  });

  // Provide the fontsLoaded state to the rest of the app
  return <FontContext.Provider value={{ fontsLoaded }}>{children}</FontContext.Provider>;
};
