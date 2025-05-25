import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Today's Summary</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="medical" size={24} color="#007AFF" />
            <Text style={styles.summaryLabel}>Medications Taken</Text>
            <Text style={styles.summaryValue}>3/4</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="time" size={24} color="#FF9500" />
            <Text style={styles.summaryLabel}>Next Dose</Text>
            <Text style={styles.summaryValue}>2:30 PM</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle" size={24} color="#34C759" />
          <Text style={styles.actionText}>Log Medication</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Record Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="notifications-outline" size={24} color="#FF9500" />
          <Text style={styles.actionText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.upcomingCard}>
        <Text style={styles.cardTitle}>Upcoming Medications</Text>

        <View style={styles.medicationItem}>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>Lisinopril 10mg</Text>
            <Text style={styles.medicationTime}>2:30 PM</Text>
          </View>
          <TouchableOpacity style={styles.takeButton}>
            <Text style={styles.takeButtonText}>Take</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.medicationItem}>
          <View style={styles.medicationInfo}>
            <Text style={styles.medicationName}>Metformin 500mg</Text>
            <Text style={styles.medicationTime}>6:00 PM</Text>
          </View>
          <TouchableOpacity style={styles.takeButton}>
            <Text style={styles.takeButtonText}>Take</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    padding: 20,
    backgroundColor: "#007AFF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  summaryCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  summaryRow: {
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
    color: "#666",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  quickActions: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  actionButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  upcomingCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  medicationTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  takeButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  takeButtonText: {
    color: "white",
    fontWeight: "600",
  },
})
