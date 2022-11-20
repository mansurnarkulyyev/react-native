import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const [inputIsFocus, setInputIsFocus] = useState("");

  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userName, photoURL } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, userName, photoURL });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TextInput
        style={{
          ...styles.input,
          ...inputIsFocus,
        }}
        placeholder="Адрес электронной почты"
        onFocus={() => {
          setInputIsFocus(styles.isFocused);
        }}
        onChangeText={setComment}
      />
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={createPost}
      >
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
});
