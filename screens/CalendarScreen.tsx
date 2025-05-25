"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [symptoms, setSymptoms] = useState("")
  const [symptomLog, setSymptomLog] = useState<{ [key: string]: string[] }>({
    "2024-01-15": ["Headache", "Fatigue"],
    "2024-01-16": ["Nausea"],
    "2024-01-18": ["Dizziness", "Headache"],
  })

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const handleDatePress = (day: number) => {
    const dateString = formatDate(day)
    setSelectedDate(dateString)
    setModalVisible(true)
  }

  const saveSymptoms = () => {
    if (selectedDate && symptoms.trim()) {
      const symptomArray = symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s)
      setSymptomLog((prev) => ({
        ...prev,
        [selectedDate]: symptomArray,
      }))
      setSymptoms("")
      setModalVisible(false)
      Alert.alert("Success", "Symptoms recorded successfully!")
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.emptyDay} />)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(day)
      const hasSymptoms = symptomLog[dateString]
      const isToday = day === currentDate.getDate()

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.dayCell, isToday && styles.todayCell, hasSymptoms && styles.symptomDay]}
          onPress={() => handleDatePress(day)}
        >
          <Text style={[styles.dayText, isToday && styles.todayText, hasSymptoms && styles.symptomDayText]}>{day}</Text>
          {hasSymptoms && <View style={styles.symptomIndicator} />}
        </TouchableOpacity>,
      )
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Symptom Calendar</Text>
        <Text style={styles.subtitle}>Track your daily symptoms</Text>
      </View>

      <View style={styles.calendarContainer}>
        <View style={styles.monthHeader}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekDays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendar}>{renderCalendar()}</View>
      </View>

      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItem}>
          <View style={styles.todayIndicator} />
          <Text style={styles.legendText}>Today</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={styles.symptomIndicator} />
          <Text style={styles.legendText}>Has symptoms</Text>
        </View>
      </View>

      <View style={styles.recentSymptoms}>
        <Text style={styles.sectionTitle}>Recent Symptoms</Text>
        {Object.entries(symptomLog)
          .sort(([a], [b]) => b.localeCompare(a))
          .slice(0, 5)
          .map(([date, symptoms]) => (
            <View key={date} style={styles.symptomEntry}>
              <Text style={styles.symptomDate}>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
              <Text style={styles.symptomList}>{symptoms.join(", ")}</Text>
            </View>
          ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Record Symptoms</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              {selectedDate &&
                new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </Text>

            <Text style={styles.inputLabel}>Enter symptoms (separate with commas):</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              value={symptoms}
              onChangeText={setSymptoms}
              placeholder="e.g., Headache, Nausea, Fatigue"
              placeholderTextColor="#999"
            />

            <View style={styles.commonSymptoms}>
              <Text style={styles.commonSymptomsTitle}>Common Symptoms:</Text>
              <View style={styles.symptomTags}>
                {["Headache", "Nausea", "Fatigue", "Dizziness", "Stomach pain", "Insomnia"].map((symptom) => (
                  <TouchableOpacity
                    key={symptom}
                    style={styles.symptomTag}
                    onPress={() => {
                      const currentSymptoms = symptoms ? symptoms + ", " : ""
                      setSymptoms(currentSymptoms + symptom)
                    }}
                  >
                    <Text style={styles.symptomTagText}>{symptom}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveSymptoms}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#007AFF",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  calendarContainer: {
    backgroundColor: "white",
    margin: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    width: 40,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  emptyDay: {
    width: "14.28%",
    aspectRatio: 1,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  todayCell: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  todayText: {
    color: "white",
    fontWeight: "bold",
  },
  symptomDay: {
    backgroundColor: "#FFE5E5",
    borderRadius: 20,
  },
  symptomDayText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  symptomIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 6,
    height: 6,
    backgroundColor: "#FF3B30",
    borderRadius: 3,
  },
  legendContainer: {
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  todayIndicator: {
    width: 20,
    height: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  recentSymptoms: {
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
    marginBottom: 15,
    color: "#333",
  },
  symptomEntry: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  symptomDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    width: 60,
  },
  symptomList: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  commonSymptoms: {
    marginBottom: 20,
  },
  commonSymptomsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  symptomTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  symptomTag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  symptomTagText: {
    fontSize: 14,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
})
