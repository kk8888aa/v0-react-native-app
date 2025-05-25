"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function MedicationDetailScreen({ route, navigation }: any) {
  const { medication } = route.params
  const [dailyLog, setDailyLog] = useState([
    { time: "8:00 AM", taken: true, date: "Today" },
    { time: "2:30 PM", taken: false, date: "Today" },
    { time: "8:00 AM", taken: true, date: "Yesterday" },
    { time: "2:30 PM", taken: true, date: "Yesterday" },
  ])

  const markAsTaken = (index: number) => {
    const newLog = [...dailyLog]
    newLog[index].taken = true
    setDailyLog(newLog)
    Alert.alert("Success", "Medication marked as taken!")
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.medicationName}>
          {medication.name} {medication.dosage}
        </Text>
        <Text style={styles.frequency}>{medication.frequency}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication Tracker</Text>
        <Text style={styles.sectionSubtitle}>Track your daily doses</Text>

        {dailyLog.map((entry, index) => (
          <View key={index} style={styles.logEntry}>
            <View style={styles.logInfo}>
              <Text style={styles.logTime}>{entry.time}</Text>
              <Text style={styles.logDate}>{entry.date}</Text>
            </View>
            <View style={styles.logStatus}>
              {entry.taken ? (
                <View style={styles.takenIndicator}>
                  <Ionicons name="checkmark-circle" size={24} color="#34C759" />
                  <Text style={styles.takenText}>Taken</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.takeButton} onPress={() => markAsTaken(index)}>
                  <Text style={styles.takeButtonText}>Mark Taken</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.educationButton}
          onPress={() => navigation.navigate("Education", { medication })}
        >
          <Ionicons name="book-outline" size={24} color="#007AFF" />
          <View style={styles.educationInfo}>
            <Text style={styles.educationTitle}>Learn About This Medication</Text>
            <Text style={styles.educationSubtitle}>Side effects, interactions, and important information</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Dosage:</Text>
          <Text style={styles.detailValue}>{medication.dosage}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Frequency:</Text>
          <Text style={styles.detailValue}>{medication.frequency}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Pills Remaining:</Text>
          <Text style={styles.detailValue}>
            {medication.total - medication.taken} of {medication.total}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Next Refill:</Text>
          <Text style={styles.detailValue}>In 15 days</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="notifications-outline" size={20} color="white" />
          <Text style={styles.primaryButtonText}>Set Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="create-outline" size={20} color="#007AFF" />
          <Text style={styles.secondaryButtonText}>Edit Medication</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 60,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  frequency: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  logEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logInfo: {
    flex: 1,
  },
  logTime: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  logDate: {
    fontSize: 14,
    color: "#666",
  },
  logStatus: {
    alignItems: "flex-end",
  },
  takenIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  takenText: {
    color: "#34C759",
    fontWeight: "600",
    marginLeft: 5,
  },
  takeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  takeButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  educationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  educationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  educationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionSection: {
    margin: 15,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
})
