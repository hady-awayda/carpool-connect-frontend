import FloatingLabelInput from "@/components/FloatingLabelInput";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function SignupScreen() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleScreenPress = () => {
    Keyboard.dismiss();
    emailInputRef.current?.blur();
    passwordInputRef.current?.blur();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>

        <FloatingLabelInput
          inputRef={nameInputRef}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <FloatingLabelInput
          inputRef={passwordInputRef}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />
        <FloatingLabelInput
          inputRef={passwordInputRef}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            router.push("/HowOftenScreen");
          }}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
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
  registerButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  loginButton: {
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
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loginButtonText: {
    fontFamily: "Urbanist_700Bold",
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 16,
  },
});
