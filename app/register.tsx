import FloatingLabelInput from "@/components/FloatingLabelInput";
import { registerUser } from "@/data/remote/apiHandler"; // Import the register function
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
      router.push("/UserAddressScreen");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Create account</Text>

        {serverError && <Text style={styles.errorText}>{serverError}</Text>}

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              setSecureTextEntry={() => {}}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              setSecureTextEntry={() => {}}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              placeholder="Phone Number"
              value={value}
              onChangeText={onChange}
              secureTextEntry={false}
              setSecureTextEntry={() => {}}
            />
          )}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry}
              setSecureTextEntry={setSecureTextEntry}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <FloatingLabelInput
              placeholder="Confirm Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              setSecureTextEntry={() => {}}
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmit(onSubmit)}
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
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
    width: "100%",
    textAlign: "center",
  },
});
