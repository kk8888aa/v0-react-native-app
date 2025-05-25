import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function MedicationsScreen({ navigation }: any) {
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      taken: 15,
      total: 30,
      nextDose: "2:30 PM",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      taken: 28,
      total: 60,
      nextDose: "6:00 PM",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      taken: 12,
      total: 30,
      nextDose: "9:00 PM",
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Medications</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {medications.map((medication) => (
        <TouchableOpacity
          key={medication.id}
          style={styles.medicationCard}
          onPress={() => navigation.navigate("MedicationDetail", { medication })}
        >
          <View style={styles.medicationHeader}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>
                {medication.name} {medication.dosage}
              </Text>
              <Text style={styles.frequency}>{medication.frequency}</Text>
            </View>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => navigation.navigate("Education", { medication })}
            >
              <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>Pills Remaining</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(medication.taken / medication.total) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {medication.total - medication.taken} of {medication.total} left
            </Text>
          </View>

          <View style={styles.nextDoseSection}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.nextDoseText}>Next dose: {medication.nextDose}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.trackButton}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text style={styles.buttonText}>Mark Taken</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 8,
  },
  medicationCard: {
    backgroundColor: "white",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  frequency: {
    fontSize: 14,
    color: "#666",
  },
  infoButton: {
    padding: 5,
  },
  progressSection: {
    marginBottom: 15,
  },
  progressLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
  },
  nextDoseSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  nextDoseText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
  },
  trackButton: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 5,
  },
  skipButton: {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  skipButtonText: {
    color: "#666",
    fontWeight: "600",
  },
})
