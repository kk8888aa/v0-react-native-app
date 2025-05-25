import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "./screens/HomeScreen"
import MedicationsScreen from "./screens/MedicationsScreen"
import MedicationDetailScreen from "./screens/MedicationDetailScreen"
import EducationScreen from "./screens/EducationScreen"
import CalendarScreen from "./screens/CalendarScreen"
import ProfileScreen from "./screens/ProfileScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MedicationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedicationsList" component={MedicationsScreen} options={{ title: "Medications" }} />
      <Stack.Screen
        name="MedicationDetail"
        component={MedicationDetailScreen}
        options={{ title: "Medication Details" }}
      />
      <Stack.Screen name="Education" component={EducationScreen} options={{ title: "Medication Info" }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Medications") {
              iconName = focused ? "medical" : "medical-outline"
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-outline"
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline"
            } else {
              iconName = "home-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Medications" component={MedicationsStack} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
