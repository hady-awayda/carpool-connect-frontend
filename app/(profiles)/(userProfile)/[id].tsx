import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface UserProfileProps {
  name: string;
  location: string;
  age: number;
  gender: string;
  reputation: number;
  punctuality: number;
  greenStreak: string;
  ecoRank: string;
  car: string;
  year: number;
  color: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  location,
  age,
  gender,
  reputation,
  punctuality,
  greenStreak,
  ecoRank,
  car,
  year,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Direct Message</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Location:</Text> {location}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Age & Gender:</Text> {age}, {gender}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Reputation:</Text> {reputation} Stars{" "}
          <TouchableOpacity style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Reputation Profile</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Punctuality:</Text> {punctuality}%{" "}
          <TouchableOpacity style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Punctuality Details</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>GreenStreak:</Text> {greenStreak}{" "}
          <Text style={styles.smallText}>(24+ months)</Text>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>EcoRank:</Text> {ecoRank}{" "}
          <TouchableOpacity style={styles.inlineButton}>
            <Text style={styles.inlineButtonText}>Carbon Footprint</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Car:</Text> {car}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Year:</Text> {year}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Color:</Text> {color}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 8,
  },
  detailLabel: {
    fontWeight: "bold",
  },
  inlineButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inlineButtonText: {
    fontSize: 12,
    color: "#666",
  },
  smallText: {
    fontSize: 12,
    color: "#666",
  },
});

export default UserProfile;
