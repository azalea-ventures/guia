import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Pressable } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Image } from "expo-image";
import { router } from "expo-router";



// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appIsReady, setAppIsReady] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.Text style={[styles.titleText, { opacity: fadeAnim }]}>
        Dinner Placesetting
      </Animated.Text>

      <Pressable onPress={() => {router.replace("/explore")}}>
        <Image
          style={styles.image}
          source={require("@/assets/images/karen-sewell-yLfsEMVbOWA-unsplash.jpg")}
          transition={1000}
        />
      </Pressable>

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
    paddingBottom: 100,
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
