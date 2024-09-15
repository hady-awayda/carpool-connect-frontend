import BoldButton from "@/components/BoldButton";
import BorderedButton from "@/components/BorderedButton";
import ControlledInputField from "@/components/ControlledInputField";
import { submitCarDetails } from "@/data/remote/apiHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const schema = z.object({
  manufacturer: z.string().min(2, { message: "Manufacturer is required" }),
  model: z.string().min(2, { message: "Model is required" }),
  year: z
    .string()
    .regex(/^[0-9]{4}$/, { message: "Year must be a 4-digit number" }),
});

type CarDetailsFormValues = z.infer<typeof schema>;

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

      <ControlledInputField
        control={control}
        name="manufacturer"
        placeholder="Manufacturer"
        error={errors.manufacturer?.message}
      />

      <ControlledInputField
        control={control}
        name="model"
        placeholder="Model"
        error={errors.model?.message}
      />

      <ControlledInputField
        control={control}
        name="year"
        placeholder="Year"
        keyboardType="numeric"
        error={errors.year?.message}
      />

      <BoldButton buttonText="Submit" onPress={handleSubmit(onSubmit)} />

      <BorderedButton buttonText="Back" onPress={() => router.back()} />
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
