import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import FloatingLabelInput from "@/components/FloatingLabelInput";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleScreenPress = () => {
    Keyboard.dismiss();
    emailInputRef.current?.blur();
    passwordInputRef.current?.blur();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back! Glad to see you, Again!</Text>

        <FloatingLabelInput
          inputRef={emailInputRef}
          placeholder="Email"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />

        <FloatingLabelInput
          inputRef={passwordInputRef}
          placeholder="Password"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/Home")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  loginButtonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  registerButton: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 16,
  },
});
