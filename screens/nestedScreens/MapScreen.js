import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView,{Marker} from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: "",
          longitude: "",
          latitudeDelta: "0.1",
          longitudeDelta:"0.1",
      }}
      >
        <Marker coordinate={{ latitude: "", longitude: "", }} title="Post  photo" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    flex: 1,
    
  },
});
