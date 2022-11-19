import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList,Image, Button } from "react-native";
import IconButton from "../../components/Icon";

export default function HomeScreen({ route,navigation }) {
  

  const [posts, setPosts] = useState([]);
  // console.log("route.params", route.params);
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
//  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.innerBox}>
        <View style={styles.innerBoxTextWrap}>
          <Text style={styles.innerBoxText}>Публикации</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <IconButton type="log-out" />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList data={posts} keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image source={{ uri: item.photo }}
              style={styles.image}
              />
              <Text>{item}</Text>
            </View>
          )}
        />
      </View>
      <Button title="Go to map" onPress={()=> navigation.navigate("Map")}/>
      <Button title="Go to Comments" onPress={()=> navigation.navigate("Comments")}/>
     
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
    // marginHorizontal:10
  },
  image: {
    width: 375,
    height: 200,
    borderRadius:8
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


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// export default function HomeScreen({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
