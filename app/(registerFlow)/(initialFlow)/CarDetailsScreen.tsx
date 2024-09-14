import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitCarDetails } from "@/data/remote/apiHandler";
import FloatingLabelInput from "@/components/FloatingLabelInput";

const schema = z.object({
  manufacturer: z.string().min(2, { message: "Manufacturer is required" }),
  model: z.string().min(2, { message: "Model is required" }),
  year: z
    .string()
    .regex(/^[0-9]{4}$/, { message: "Year must be a 4-digit number" }),
});

type CarDetailsFormValues = {
  manufacturer: string;
  model: string;
  year: string;
};

export default function CarDetailsScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CarDetailsFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: CarDetailsFormValues) => {
    const result = await submitCarDetails(data);

    if (result.error) {
      console.log(result.error);
    } else {
      console.log("Car details submitted successfully");
      router.push("/CarpoolWithSmokersScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car details</Text>

      <Controller
        control={control}
        name="manufacturer"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            placeholder="Manufacturer"
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            setSecureTextEntry={() => {}}
          />
        )}
      />
      {errors.manufacturer && (
        <Text style={styles.errorText}>{errors.manufacturer.message}</Text>
      )}

      <Controller
        control={control}
        name="model"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            placeholder="Model"
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            setSecureTextEntry={() => {}}
          />
        )}
      />
      {errors.model && (
        <Text style={styles.errorText}>{errors.model.message}</Text>
      )}

      <Controller
        control={control}
        name="year"
        render={({ field: { onChange, value } }) => (
          <FloatingLabelInput
            placeholder="Year"
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            setSecureTextEntry={() => {}}
            keyboardType="numeric"
          />
        )}
      />
      {errors.year && (
        <Text style={styles.errorText}>{errors.year.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    borderColor: "#333",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    marginTop: 20,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
