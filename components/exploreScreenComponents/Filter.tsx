import { Colors, Typography } from "@/constants/Variables";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import BoldButton from "../BoldButton";
import ControlledInputField from "../ControlledInputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({
  departureTimeFlexibility: z.number().min(0).max(60),
  destinationTimeFlexibility: z.number().min(0).max(60),
  departureDistanceProximity: z.number().min(0).max(100),
  destinationDistanceProximity: z.number().min(0).max(100),
});

type FilterFormValues = z.infer<typeof filterSchema>;

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  setDepartureTimeFlexibility: (value: number) => void;
  setDestinationTimeFlexibility: (value: number) => void;
  setDepartureDistanceProximity: (value: number) => void;
  setDestinationDistanceProximity: (value: number) => void;
};

const Filter = ({
  isOpen,
  onClose,
  setDepartureTimeFlexibility,
  setDestinationTimeFlexibility,
  setDepartureDistanceProximity,
  setDestinationDistanceProximity,
}: FilterProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = (data: FilterFormValues) => {
    setDepartureTimeFlexibility(data.departureTimeFlexibility);
    setDestinationTimeFlexibility(data.destinationTimeFlexibility);
    setDepartureDistanceProximity(data.departureDistanceProximity);
    setDestinationDistanceProximity(data.destinationDistanceProximity);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.filterContainer}>
            <Text style={styles.title}>Time Flexibility</Text>
            <ControlledInputField
              control={control}
              name="departureTimeFlexibility"
              placeholder="Departure Time Flexibility (minutes)"
              keyboardType="numeric"
              error={errors.departureTimeFlexibility?.message}
            />
            <ControlledInputField
              control={control}
              name="destinationTimeFlexibility"
              placeholder="Destination Time Flexibility (minutes)"
              keyboardType="numeric"
              error={errors.destinationTimeFlexibility?.message}
            />
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.title}>Distance Proximity</Text>
            <ControlledInputField
              control={control}
              name="departureDistanceProximity"
              placeholder="Departure Distance Proximity (km)"
              keyboardType="numeric"
              error={errors.departureDistanceProximity?.message}
            />
            <ControlledInputField
              control={control}
              name="destinationDistanceProximity"
              placeholder="Destination Distance Proximity (km)"
              keyboardType="numeric"
              error={errors.destinationDistanceProximity?.message}
            />
          </View>
          <BoldButton
            buttonText="Apply"
            onPress={handleSubmit(onSubmit)}
            width={100}
            height={50}
            buttonStyle={{ backgroundColor: Colors.light.primary }}
          />
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    ...Typography.heading1,
  },
});

export default Filter;
