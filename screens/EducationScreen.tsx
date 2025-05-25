import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function EducationScreen({ route }: any) {
  const { medication } = route.params

  const educationData = {
    Lisinopril: {
      description: "Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure.",
      uses: [
        "High blood pressure (hypertension)",
        "Heart failure",
        "Prevention of kidney problems in diabetes",
        "Recovery after heart attack",
      ],
      sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue", "Nausea"],
      warnings: [
        "Do not use if pregnant",
        "May cause dizziness when standing up",
        "Avoid potassium supplements",
        "Regular blood pressure monitoring required",
      ],
      interactions: ["NSAIDs (ibuprofen, naproxen)", "Potassium supplements", "Diuretics", "Lithium"],
    },
    Metformin: {
      description: "Metformin is a medication used to treat type 2 diabetes by controlling blood sugar levels.",
      uses: ["Type 2 diabetes", "Prediabetes", "Polycystic ovary syndrome (PCOS)", "Weight management in diabetes"],
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste", "Loss of appetite"],
      warnings: [
        "Take with food to reduce stomach upset",
        "Regular kidney function tests needed",
        "Stop before surgery or imaging with contrast",
        "Monitor for signs of lactic acidosis",
      ],
      interactions: ["Alcohol", "Contrast dyes", "Certain antibiotics", "Heart medications"],
    },
    Atorvastatin: {
      description: "Atorvastatin is a statin medication used to lower cholesterol and reduce cardiovascular risk.",
      uses: [
        "High cholesterol",
        "Prevention of heart disease",
        "Prevention of stroke",
        "Reduction of cardiovascular risk",
      ],
      sideEffects: ["Muscle pain", "Headache", "Nausea", "Diarrhea", "Joint pain"],
      warnings: [
        "Report muscle pain immediately",
        "Regular liver function tests",
        "Avoid grapefruit juice",
        "Take at the same time daily",
      ],
      interactions: ["Grapefruit juice", "Certain antibiotics", "Antifungal medications", "Blood thinners"],
    },
  }

  const info = educationData[medication.name as keyof typeof educationData] || educationData.Lisinopril

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{medication.name} Information</Text>
        <Text style={styles.subtitle}>Important medication details</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What is {medication.name}?</Text>
        <Text style={styles.description}>{info.description}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="medical-outline" size={24} color="#007AFF" />
          <Text style={styles.sectionTitle}>Uses</Text>
        </View>
        {info.uses.map((use, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{use}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="warning-outline" size={24} color="#FF9500" />
          <Text style={styles.sectionTitle}>Common Side Effects</Text>
        </View>
        {info.sideEffects.map((effect, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{effect}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="alert-circle-outline" size={24} color="#FF3B30" />
          <Text style={styles.sectionTitle}>Important Warnings</Text>
        </View>
        {info.warnings.map((warning, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{warning}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="link-outline" size={24} color="#5856D6" />
          <Text style={styles.sectionTitle}>Drug Interactions</Text>
        </View>
        {info.interactions.map((interaction, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{interaction}</Text>
          </View>
        ))}
      </View>

      <View style={styles.disclaimerSection}>
        <Ionicons name="information-circle-outline" size={24} color="#666" />
        <Text style={styles.disclaimer}>
          This information is for educational purposes only. Always consult your healthcare provider for medical advice
          and before making any changes to your medication regimen.
        </Text>
      </View>

      <TouchableOpacity style={styles.contactButton}>
        <Ionicons name="call-outline" size={20} color="white" />
        <Text style={styles.contactButtonText}>Contact Your Doctor</Text>
      </TouchableOpacity>
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 10,
    marginTop: 2,
  },
  listText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#666",
    flex: 1,
  },
  disclaimerSection: {
    backgroundColor: "#f8f9fa",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    marginLeft: 10,
    flex: 1,
    fontStyle: "italic",
  },
  contactButton: {
    backgroundColor: "#34C759",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  contactButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 16,
  },
})
