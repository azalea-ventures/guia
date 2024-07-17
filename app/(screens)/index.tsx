import { useRef, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { router, Stack } from "expo-router";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);
  const fadeAnimActivity = useRef(new Animated.Value(0)).current;
  const fadeAnimMain = useRef(new Animated.Value(0)).current;
  const fadeAnimImage = useRef(new Animated.Value(0)).current;

  Animated.sequence([
    //fade in activity image
    Animated.timing(fadeAnimImage, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    //fade in main text
    Animated.timing(fadeAnimMain, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    //fade in activity title
    Animated.timing(fadeAnimActivity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    //fade out main text
    Animated.timing(fadeAnimMain, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
    //fade out activity title
    Animated.timing(fadeAnimActivity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),
    //fade out activity image
    Animated.timing(fadeAnimImage, {
      toValue: 0,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }),
  ]).start(() => {
    router.replace("/prep_splash");
  });

  // TODO: here we replace hardcoded text with stateful refs
  return (
    <View id="INDEX_CONTAINER" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Animated.Text style={[styles.titleText, { opacity: fadeAnimMain }]}>
          Family Activities, Day 3
        </Animated.Text>

        <Animated.Text
          style={[styles.titleText, { opacity: fadeAnimActivity }]}
        >
          Dinner Placesetting
        </Animated.Text>

        <Animated.Image
          style={[styles.image, { opacity: fadeAnimImage }]}
          // TODO: replace w ref
          source={require("@/assets/images/karen-sewell-yLfsEMVbOWA-unsplash.jpg")}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 500,
    paddingBottom: 75,
  },
});

export function Authenticate() {
  // TODO: move below code to another file and call here
  // const code = window.location.href.split("code=")[1];
  // console.log("CODE: " + code)
  // if (code){
  //   //get auth token from LMS
  //   const options = {
  //     grant_type: "authorization_code",
  //     client_id: "10000000000001",
  //     client_secret: "EvHrGhGFUGRE28FwXMJfFFxFLJx2rL34E7MtLQx4FaFeXCf3D6AxAYMULA7UWZPt",
  //     redirect_uri: "https://nqqaa1k-anonymous-8081.exp.direct/",
  //     code: code,
  //   }
  //   axios.post("https://eduspec-canvas.eastus.cloudapp.azure.com/login/oauth2/token", options)
  //   .then((response) => {
  //     console.log("TOKEN: " + JSON.stringify(response.data))
  //   })
  // }
}
