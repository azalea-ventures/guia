import React, { useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from 'expo-av';
import VideoScreen from "@/components/Video";


const { height } = Dimensions.get("window");

function Checkbox() {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.checkboxContainer}>
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => setChecked(!checked)}
      >
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </Pressable>
      <Text style={[styles.checkboxText]}>Item</Text>
    </View>
  );
}

export default function ItemChecklist() {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <Animated.ScrollView
      snapToInterval={height}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
    >
      {/* ~~~PLACE ADDITIONAL CHILD CONTAINERS IN HERE AS NEEDED~~~ */}
      {/* Note that all child views below use the childContainer style. Be sure to do the same */}
      <Animated.View style={styles.childContainer}>
        <Text style={styles.childTitle}>Gather These Things</Text>
        {/* TODO: map the checkboxes */}
        <Checkbox />
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </Animated.View>

      <Animated.View style={styles.childContainer}>
        <Animated.Image
          style={styles.image}
          // TODO: replace w ref
          source={require("@/assets/images/karen-sewell-yLfsEMVbOWA-unsplash.jpg")}
        />
      </Animated.View>

      <Animated.View style={styles.childContainer}>
        <VideoScreen></VideoScreen>
      </Animated.View>

    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({

  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  checkboxBase: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "coral",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },
  checkboxText: {
    paddingLeft: 32,
    fontSize: 32,
  },
  childContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height,
  },
  childTitle: {
    marginVertical: 24,
    fontWeight: "bold",
    fontSize: 24,
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginLeft: 32,
  },
});
