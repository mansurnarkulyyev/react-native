import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import IconButton from "../../components/Icon";
import db from "../../firebase/config";

export default function CreatePostsScreen({ navigation }) {
  const [inputIsFocus, setInputIsFocus] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, userName, photoURL } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("location", location, "commit", comment);

    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Home", { photo });
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const createPost = await db.firestore().collection("posts").add({
      photo,
      comment,
      location: location.coords,
      userId,
      userName,
      photoURL,
    });
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      await db.storage().ref(`postImage/${uniquePostId}`).put(file);

      const processedPhoto = await db
        .storage()
        .ref("postImage")
        .child(uniquePostId)
        .getDownloadURL();

      return processedPhoto;
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <View style={styles.innerBoxTextWrap}>
          <Text style={styles.innerBoxText}>Создать публикацию</Text>
        </View>
        <View style={{ marginTop: 18 }}>
          <IconButton type="arrow-left" />
        </View>
      </View>
      <View style={styles.createPostsContainer}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image source={{ uri: photo }} style={styles.imageContainer} />
            </View>
          )}
          <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
            <IconButton type="camera" />
          </TouchableOpacity>
        </Camera>
        <View>
          <Text style={styles.cameraText}>Загрузите фото</Text>

          <TouchableOpacity style={{ marginTop: 38 }}>
            <TextInput
              style={{
                ...styles.input,
                ...inputIsFocus,
                // ...isShowKeyBoard,
              }}
              placeholder="Адрес электронной почты"
              keyboardType="email - address"
              // value={state.name}
              onFocus={() => {
                // setIsShowKeyBoard(true);
                setInputIsFocus(styles.isFocused);
              }}
              onChangeText={setComment}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  ...styles.input,
                  ...inputIsFocus,
                  ...styles.input2,
                }}
                placeholder="Адрес электронной почты"
                keyboardType="email - address"
                onFocus={() => {
                  setInputIsFocus(styles.isFocused);
                }}
              />
              <View style={{ marginTop: 20, position: "absolute" }}>
                <IconButton type="map" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.7}
            onPress={sendPhoto}
          >
            <Text style={styles.btnTitle}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  createPostsContainer: {
    marginHorizontal: 10,
  },
  camera: {
    height: "42%",
    marginTop: 32,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    flexDirection: "row-reverse",
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
  },
  takePhotoContainer: {
    position: "absolute",
    top: 20,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
  },
  btn: {
    marginTop: 40,
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
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
  input2: {
    paddingLeft: 28,
  },
  isFocused: {
    backgroundColor: "#FFF",
    borderColor: "#FF6C00",
  },
  cameraText: {
    fontFamily: "Roboto-medium",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 10,
  },
});
