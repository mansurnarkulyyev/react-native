import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import ProfileScreen from './screens/mainScreen/ProfileScreen';
import PostsScreen from "./screens/mainScreen/PostsScreen";
import CreatePostsScreen from './screens/mainScreen/CreatePostsScreen';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { View,StyleSheet } from "react-native";


export default function useRoute(isAuth,navigation) {
  if (!isAuth) {
    return (
       <AuthStack.Navigator >
         <AuthStack.Screen
          options={{headerShown:false,}}
          name="Login" component={LoginScreen} />
        
        <AuthStack.Screen
          options={{headerShown:false,}}
          name="Register" component={RegistrationScreen} />
      </AuthStack.Navigator>
    )
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false,}} >
      <MainTab.Screen name="Posts" component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => 
            <View style={[ focused ? styles.bottomButton : styles.bottomButton2]}>
              <Ionicons name="grid-outline"  size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)" } />
            </View>
              }}
               />
      <MainTab.Screen name="CreatePosts" component={CreatePostsScreen}
      options={{
                headerShown: false,
        tabBarIcon: ({ focused, size, color }) => 
            <View style={[ focused ? styles.bottomButton : styles.bottomButton2]}>
               <AntDesign name="plus"  size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)" } />
            </View>
              }}/> 
      <MainTab.Screen name="Profile" component={ProfileScreen}
       options={{
                headerShown: false,
         tabBarIcon: ({ focused, size, color }) => 
             <View style={[ focused ? styles.bottomButton : styles.bottomButton2]}>
               <Feather name="user"  size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)" } />
            </View>
              }}/>
      {/* <MainTab.Screen name="Home" component={HomeScreen}/>
        <MainTab.Screen name="Map" component={MapScreen}/> */}
    </MainTab.Navigator>
  )
};

const styles = StyleSheet.create({
  bottomButton: {
   backgroundColor: "#FF6C00",
   borderRadius: 20,
   padding: 7,
   width: 70,
   marginTop: 9,
   alignItems: "center",
  },
  bottomButton2: {
   padding: 7,
   width: 70,
   marginTop: 9,
   alignItems: "center",
  },
});