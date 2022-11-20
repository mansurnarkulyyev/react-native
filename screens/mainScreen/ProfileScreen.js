import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/Icon";
import { authSignOutUser } from "../../redux/auth/authOperation";
import db from "../../firebase/config";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
    console.log(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../assets/image/PhotoBG.jpeg")}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.innerBox}>
              <View style={styles.header}>
                <Image />
                <View style={styles.headerImg}>
                  <IconButton type="add" />
                </View>
              </View>
              <TouchableOpacity onPress={signOut} style={styles.logOutIcon}>
                <IconButton type="log-out" onPress={signOut} />
              </TouchableOpacity>
              <View style={styles.innerBoxTextWrap}>
                <Text style={styles.innerBoxText}>Profile</Text>
              </View>
              <View>
                <FlatList
                  data={userPosts}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                      <Image
                        source={{ uri: item.photo }}
                        style={styles.image}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  innerBox: {
    marginTop: 147,
    position: "relative",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingTop: 82,
  },
  logOutIcon: {
    position: "absolute",
    right: "3.5%",
    marginTop: 10,
  },
  innerBoxText: {
    marginTop: 16,
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  innerBoxTextWrap: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.02,
    color: "#212121",
    marginBottom: 32,
  },
  postContainer: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 375,
    height: 200,
    borderRadius: 8,
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
});
