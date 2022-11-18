import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';


import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"
import { StyleSheet } from 'react-native';

import React, { useEffect } from "react";
import useRoute from './router';
import { store } from './redux/store';

export default function App() {
  const routing = useRoute(false);
    const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
 <NavigationContainer>
      {routing}
  </NavigationContainer>
    </Provider>
   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
