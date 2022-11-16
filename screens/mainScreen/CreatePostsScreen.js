import React, { useState } from "react";
import { View, StyleSheet,Image } from "react-native";

import { Camera } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import IconButton from "../../components/Icon";

export default function CreatePostsScreen() {

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => { 
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);

    console.log(photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View>
          <Image source={{uri:photo}} />
        </View>
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
           <IconButton type="camera" />
         </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  camera: {
    height: 240,
    marginTop: 120,
    borderWidth: 1,
    backgroundColor:"#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems:"center"
  },
  snapContainer: {
    marginTop: 90,
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
   borderColor:"rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    
  },
  
});
