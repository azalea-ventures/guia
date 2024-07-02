import {
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { Login } from "@/components/Login";

export default function LoginScreen() {
  return (
    <View>
      <View style={styles.loginContainer}>
        <ImageBackground
          source={require("@/assets/images/Canvas_Bug_Color_RGB.png")}
          resizeMode="cover"
          style={styles.canvasLogo}
        ></ImageBackground>
        <Login></Login>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    height: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  canvasLogo: {
    height: 330,
    width: 330,
    bottom: -200,
    left: -100,
    position: "absolute",
    opacity: 0.25,
  },
});
