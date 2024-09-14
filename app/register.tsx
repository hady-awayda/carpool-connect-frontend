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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data: FormValues) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (data: FormValues) => {
    // If the form is valid, proceed with navigation or form submission logic
    console.log(data);
    router.push("/UserAddressScreen");
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

        <FloatingLabelInput
          inputRef={emailInputRef}
          placeholder="Phone Number"
          value={email}
          onChangeText={setEmail}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />

        <FloatingLabelInput
          inputRef={phoneInputRef}
          placeholder="Email"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
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
          inputRef={confirmPasswordInputRef}
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
    marginBottom: 10,
    marginTop: 16,
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
    marginBottom: 12,
  },
});
