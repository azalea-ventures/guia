import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Button,
  Alert,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";

export function Login() {
  const [backgroundColor, setBackgroundColor] = useState(''); //TODO: use theme colors from parent state (theme)
  const [isDisabled, setIsDisabled] = useState(true)

  const isValidEmailFormat = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setBackgroundColor("coral");
      setIsDisabled(true)
    } else {
      setBackgroundColor("transparent");
      setIsDisabled(false)
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: "75%",
      maxWidth: 400
    },
    titleText: {
        marginBottom: 36,
        color: "black"
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    emailInput: {
      backgroundColor: backgroundColor,
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ThemedText type="title" style={styles.titleText}>Login with Canvas</ThemedText>
      <TextInput
        placeholder="Email"
        inputMode="email"
        onChangeText={(text) => {
          isValidEmailFormat(text);
        }}
        style={[styles.textInput, styles.emailInput]}
      ></TextInput>
      <TextInput placeholder="Password" style={styles.textInput}></TextInput>
      <View style={styles.btnContainer}>
        <Button
          title="Login"
          disabled={isDisabled}
          onPress={() => {
            Alert.alert("Logged in");
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
