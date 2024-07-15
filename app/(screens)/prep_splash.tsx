import { useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { router } from "expo-router";

export default function PrepScreen() {
  const fadeAnimTitle = useRef(new Animated.Value(0)).current;

  Animated.sequence([
    //fade in title
    Animated.timing(fadeAnimTitle, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }),
    //fade out  title
    Animated.timing(fadeAnimTitle, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }),
  ]).start(() => {
    router.replace("/prep");
  });

  // TODO: here we replace hardcoded text with stateful refs
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.Text style={[styles.titleText, { opacity: fadeAnimTitle}]}>
        Prep!
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 76,
    fontWeight: 500,
    paddingBottom: 100,
  },
});
