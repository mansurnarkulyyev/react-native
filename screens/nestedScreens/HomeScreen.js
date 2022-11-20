import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import IconButton from "../../components/Icon";
import db from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperation";

export default function HomeScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
    console.log(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <View style={styles.innerBoxTextWrap}>
          <Text style={styles.innerBoxText}>Публикации</Text>
        </View>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <IconButton type="log-out" onPress={signOut} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image source={{ uri: item.photo }} style={styles.image} />
              <View>
                <Text>{item.comment}</Text>
              </View>
              <Button
                title="Go to map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="Go to Comments"
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "FFF",
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
