import { Colors, Typography } from "@/constants/Variables";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { z } from "zod";
import BoldButton from "../BoldButton";
import ControlledInputField from "../ControlledInputField";

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  setDepartureTimeFlexibility: (value: number) => void;
  setDestinationTimeFlexibility: (value: number) => void;
  setDepartureDistanceProximity: (value: number) => void;
  setDestinationDistanceProximity: (value: number) => void;
  onApply: () => void;
};

const filterSchema = z.object({
  departureTimeFlexibility: z.number().min(0).max(1000000),
  destinationTimeFlexibility: z.number().min(0).max(1000000),
  departureDistanceProximity: z.number().min(0).max(100),
  destinationDistanceProximity: z.number().min(0).max(100),
});

type FilterFormValues = z.infer<typeof filterSchema>;

const Filter = ({
  isOpen,
  onClose,
  setDepartureTimeFlexibility,
  setDestinationTimeFlexibility,
  setDepartureDistanceProximity,
  setDestinationDistanceProximity,
  onApply,
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
    onApply();
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <View style={styles.filterContainer}>
                <Text style={styles.title}>Time Flexibility (minutes)</Text>
                <ControlledInputField
                  control={control}
                  name="departureTimeFlexibility"
                  placeholder="Departure"
                  keyboardType="numeric"
                  error={errors.departureTimeFlexibility?.message}
                />
                <ControlledInputField
                  control={control}
                  name="destinationTimeFlexibility"
                  placeholder="Destination"
                  keyboardType="numeric"
                  error={errors.destinationTimeFlexibility?.message}
                />
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.title}>Distance Proximity (km)</Text>
                <ControlledInputField
                  control={control}
                  name="departureDistanceProximity"
                  placeholder="Departure"
                  keyboardType="numeric"
                  error={errors.departureDistanceProximity?.message}
                />
                <ControlledInputField
                  control={control}
                  name="destinationDistanceProximity"
                  placeholder="Destination"
                  keyboardType="numeric"
                  error={errors.destinationDistanceProximity?.message}
                />
              </View>
              <View style={styles.actionContainer}>
                <BoldButton
                  buttonText="Apply"
                  onPress={handleSubmit(onSubmit)}
                  width={100}
                  height={50}
                  buttonStyle={{ backgroundColor: Colors.light.primary }}
                />
                <BoldButton
                  buttonText="Cancel"
                  onPress={() => onClose()}
                  width={100}
                  height={50}
                  buttonStyle={{ backgroundColor: Colors.light.text }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    height: height * 0.7,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-around",
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
});

export default Filter;
