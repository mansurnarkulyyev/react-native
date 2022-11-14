import React, { useState, useEffect } from "react";
// import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"
// import AppLoading from 'expo-app-loading';
import IconAdd from "../components/icon";

import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";

const initialState = {
  name: "",
  email: "",
  password: "",
};

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
//     "Roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
//   });
// };

export default function RegistrationScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  const [state, setState] = useState(initialState);
  const [nameIsFocus, setNameIsFocus] = useState("");
  const [emailIsFocus, setEmailIsFocus] = useState("");
  const [passIsFocus, setPassIsFocus] = useState("");
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

useEffect(() => {
    const onChange = async () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
      await SplashScreen.preventAutoHideAsync()
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
        // Dimensions.removeEventListener("change", onChange);
      onChange()
    };
}, []);
  
   const keyBoardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log({ state });
    setState(initialState);
  };
  
  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync()
  //   }
  //   prepare();
  // }, []);

 
  // if (!isReady) {
  //    return <AppLoading
  //        startAsync={loadApplication}
  //     onFinish={() => setIsReady(true)}
  //       onError={console.warns}
  //   />
  // }
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <TouchableWithoutFeedback onPress={keyBoardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../assets/image/PhotoBG.jpeg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyBoard ? -230 : 0,
              }}
            >
              <View style={styles.header}>
                <Image />
                <View style={styles.headerImg}>
                  <IconAdd type="add" />
                </View>
              </View>

              <Text style={styles.headerTitle}>Регистрация</Text>
              <View
                style={{
                  width: dimensions,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    ...nameIsFocus,
                  }}
                  placeholder="Логин"
                  activeUnderlineColor="orange"
                  value={state.name}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setNameIsFocus(styles.isFocused);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, name: value }));
                  }}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    ...emailIsFocus,
                  }}
                  placeholder="Адрес электронной почты"
                  keyboardType="email - address"
                  value={state.email}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setEmailIsFocus(styles.isFocused);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({ ...prevState, email: value }));
                  }}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    ...passIsFocus,
                  }}
                  placeholder="Пароль"
                  secureTextEntry={secureTextEntry}
                  value={state.password}
                  onFocus={() => {
                    setIsShowKeyBoard(true);
                    setPassIsFocus(styles.isFocused);
                  }}
                  onBlur={() => {
                    setIsShowKeyBoard(!isShowKeyBoard);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                />
                <Text
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.showPass}
                >
                  Показать
                </Text>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={keyBoardHide}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <Text style={styles.linkPath}>Уже есть аккаунт? Войти</Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header: {
    position: "absolute",
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  headerImg: {
    borderWidth: 1,
    backgroundColor: "#FFF",
    padding: 6,
    borderColor: "#FF6C00",
    borderRadius: 100,
    position: "absolute",
    right: -10,
    bottom: 13,
  },
  icon: {
    width: 25,
    height: 25,
  },
  form: {
    position: "relative",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingTop: 32,
    paddingBottom: 130,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.02,
    color: "#212121",
    marginBottom: 16,
    marginTop: 42,
  },
  input: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
  isFocused: {
    backgroundColor: "#FFF",
    borderColor: "#FF6C00",
  },
  showPass: {
    position: "absolute",
    bottom: 137,
    right: 32,
    fontFamily: "Roboto-medium",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    marginTop: 40,
    marginHorizontal: 16,
    width: "100%",
    padding: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: "19",
    color: "#FFF",
  },
  linkPath: {
    marginTop: 16,
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
