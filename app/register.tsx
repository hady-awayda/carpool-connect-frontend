// SignupScreen.tsx
import BoldButton from "@/components/BoldButton";
import BorderedButton from "@/components/BorderedButton";
import ControlledInputField from "@/components/ControlledInputField";
import { saveToken } from "@/data/local/storage";
import { setToken } from "@/data/redux/tokenSlice/slice";
import { registerUser } from "@/data/remote/apiHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { z } from "zod";

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignupScreen() {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const result = await registerUser({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    });

    if (result.error) {
      setServerError(result.error);
    } else {
      const token = result.token;

      dispatch(setToken(token));
      saveToken(token);

      router.push("/Home");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>

        {serverError && <Text style={styles.errorText}>{serverError}</Text>}

        <ControlledInputField
          control={control}
          name="name"
          placeholder="Full Name"
          error={errors.name?.message}
        />

        <ControlledInputField
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email?.message}
        />

        <ControlledInputField
          control={control}
          name="phoneNumber"
          placeholder="Phone Number"
          error={errors.phoneNumber?.message}
        />

        <ControlledInputField
          control={control}
          name="password"
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
          error={errors.password?.message}
        />

        <ControlledInputField
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          secureTextEntry
          error={errors.confirmPassword?.message}
        />

        <BoldButton buttonText="Register" onPress={handleSubmit(onSubmit)} />

        <Text style={styles.orText}>or</Text>

        <BorderedButton
          buttonText="Login"
          onPress={() => router.push("/login")}
        />
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
  orText: {
    fontFamily: "Urbanist_400Regular",
    color: "#666",
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
    width: "100%",
    textAlign: "center",
  },
});
