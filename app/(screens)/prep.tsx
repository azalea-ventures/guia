import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VideoScreen from "@/components/Video";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("screen");

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
    <ScrollView
      snapToInterval={height}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
      contentContainerStyle={styles.prepContainer}
      disableScrollViewPanResponder={true}
    >
        <View style={styles.childContainer}>
          <Text style={styles.childTitle}>Gather These Things</Text>
          <Checkbox />
          <Checkbox />
          <Checkbox />
          <Checkbox />
        </View>

        <View style={styles.childContainer}>
          <Animated.Image
            style={styles.image}
            // TODO: replace w ref
            source={require("@/assets/images/karen-sewell-yLfsEMVbOWA-unsplash.jpg")}
          />
        </View>

        <View id="VIDEO_VIEW_CONTAINER" style={styles.childContainer}>
          <VideoScreen></VideoScreen>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  prepContainer: {
    display: "flex",
    width: "100%",
    height: "fit-content"
  },
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
