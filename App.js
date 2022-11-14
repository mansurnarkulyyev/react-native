import {  StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"

import React, { useEffect } from "react";

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';


export default function App() {
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

const AuthStack = createStackNavigator();


  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{headerShown:false,}}
          name="Login" component={LoginScreen} />
        
        <AuthStack.Screen
          options={{headerShown:false,}}
          name="Register" component={RegistrationScreen} />
        
      </AuthStack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
