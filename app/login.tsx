import BoldButton from "@/components/BoldButton";
import BorderedButton from "@/components/BorderedButton";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import { saveToken } from "@/data/local/storage";
import { setToken } from "@/data/redux/tokenSlice/slice";
import { loginUser } from "@/data/remote/apiHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
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
import { useDispatch } from "react-redux";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    const result = await loginUser(data);

    if (result.error) {
      setServerError(result.error);
    } else {
      const token = result.token;
      dispatch(setToken(token));

      saveToken(token);
      router.replace("/Home");
    }
  };

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back! Glad to see you, Again!</Text>

        {serverError && <Text style={styles.errorText}>{serverError}</Text>}

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

        <BoldButton buttonText="Login" onPress={handleSubmit(onSubmit)} />

        <Text style={styles.orText}>or</Text>

        <BorderedButton
          buttonText="Register"
          onPress={() => router.push("/register")}
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
    marginBottom: 80,
    marginTop: 60,
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
