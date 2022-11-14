import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  Button,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  console.log(navigation);
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
  const [emailIsFocus, setEmailIsFocus] = useState("");
  const [passIsFocus, setPassIsFocus] = useState("");
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
        // Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyBoardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log({ state });
    setState(initialState);
  };
 
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
              <Text style={styles.headerTitle}>Войти</Text>
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
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.showPass}
                >
                  <Text>Показать</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.7}
                  onPress={keyBoardHide}
                >
                  <Text style={styles.btnTitle}>Войти</Text>
                </TouchableOpacity>

               <TouchableOpacity style={styles.linkText} onPress={() => navigation.navigate("Register")}>
                  <Text >Нет аккаунта?{" "}
                    <Text>
                     Зарегистрироваться
                    </Text>
                  </Text>
                </TouchableOpacity>
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
    fontFamily: "Roboto-Bold",
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
  linkText: {
    marginTop: 16,
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
