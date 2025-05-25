import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Handle logout logic here
          Alert.alert("Success", "You have been logged out.")
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="white" />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@email.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="person-outline" size={20} color="#007AFF" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>John Doe</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="mail-outline" size={20} color="#007AFF" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>john.doe@email.com</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="call-outline" size={20} color="#007AFF" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>(555) 123-4567</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Healthcare Information</Text>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="medical-outline" size={20} color="#34C759" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Primary Doctor</Text>
            <Text style={styles.infoValue}>Dr. Sarah Johnson</Text>
            <Text style={styles.infoSubvalue}>Cardiology Specialist</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="shield-outline" size={20} color="#5856D6" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Insurance Provider</Text>
            <Text style={styles.infoValue}>Blue Cross Blue Shield</Text>
            <Text style={styles.infoSubvalue}>Policy #: BC123456789</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="notifications-outline" size={20} color="#FF9500" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingSubtext}>Manage medication reminders</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="lock-closed-outline" size={20} color="#007AFF" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Privacy & Security</Text>
            <Text style={styles.settingSubtext}>Manage your privacy settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="download-outline" size={20} color="#34C759" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Export Data</Text>
            <Text style={styles.settingSubtext}>Download your medication history</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Ionicons name="help-circle-outline" size={20} color="#5856D6" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingSubtext}>Get help and contact support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>

        <TouchableOpacity style={styles.emergencyContact}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="call" size={20} color="white" />
          </View>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyName}>Emergency Services</Text>
            <Text style={styles.emergencyNumber}>911</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyContact}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="medical" size={20} color="white" />
          </View>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyName}>Poison Control</Text>
            <Text style={styles.emergencyNumber}>1-800-222-1222</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>MedTracker v1.0.0</Text>
        <Text style={styles.footerSubtext}>Your health, simplified</Text>
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
    backgroundColor: "#007AFF",
    alignItems: "center",
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoIcon: {
    width: 40,
    alignItems: "center",
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  infoSubvalue: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingIcon: {
    width: 40,
    alignItems: "center",
  },
  settingContent: {
    flex: 1,
    marginLeft: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtext: {
    fontSize: 14,
    color: "#666",
  },
  emergencyContact: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  emergencyIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 15,
  },
  emergencyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 2,
  },
  emergencyNumber: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  logoutButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    padding: 30,
    paddingBottom: 50,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#999",
  },
})
