import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import IconButton from "../../components/Icon";
import { authSignOutUser } from "../../redux/auth/authOperation";

// import { Camera, CameraType } from 'expo-camera';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <View style={styles.innerBoxTextWrap}>
          <Text style={styles.innerBoxText}>Создать публикацию</Text>
        </View>
        <TouchableOpacity onPress={signOut} style={{ marginTop: 10 }}>
          <IconButton type="log-out" onPress={signOut}/>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
      <Text >Profile Screen</Text>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  innerBox: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 11,
    paddingTop: 55,
    borderColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "space-around",
  },
  innerBoxText: {
    marginTop: 16,
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  innerBoxTextWrap: {
    flex: 2,
    alignItems: "center",
    paddingLeft: 30,
  },
});
