"use client"

import { useState, useEffect } from "react"
import { Home, Pill, Calendar, User } from "lucide-react"
import HomeScreen from "@/components/HomeScreen"
import MedicationsScreen from "@/components/MedicationsScreen"
import CalendarScreen from "@/components/CalendarScreen"
import ProfileScreen from "@/components/ProfileScreen"
import AssessmentForm from "@/components/AssessmentForm"

export default function MedicationTracker() {
  const [activeTab, setActiveTab] = useState("home")
  const [showAssessment, setShowAssessment] = useState(false)

  useEffect(() => {
    // Check if assessment has been completed in this session
    const assessmentCompleted = sessionStorage.getItem("assessmentCompleted")
    if (!assessmentCompleted) {
      setShowAssessment(true)
    }
  }, [])

  const handleAssessmentSubmit = () => {
    // Mark assessment as completed for this session
    sessionStorage.setItem("assessmentCompleted", "true")
    setShowAssessment(false)
    setActiveTab("home")
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />
      case "medications":
        return <MedicationsScreen />
      case "calendar":
        return <CalendarScreen />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-[#F5FCFB] flex flex-col max-w-md mx-auto">
      {/* Assessment Form Modal - Non-dismissible */}
      {showAssessment && <AssessmentForm onSubmit={handleAssessmentSubmit} />}

      {/* Main Content - Disabled when assessment is showing */}
      <div className={`flex-1 pb-20 ${showAssessment ? "pointer-events-none opacity-50" : ""}`}>{renderScreen()}</div>

      {/* Bottom Navigation - Disabled when assessment is showing */}
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 ${showAssessment ? "pointer-events-none opacity-50" : ""}`}
      >
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === "home" ? "text-[#2CB397]" : "text-[#202124]"
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("medications")}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === "medications" ? "text-[#2CB397]" : "text-[#202124]"
            }`}
          >
            <Pill size={24} />
            <span className="text-xs mt-1">Medications</span>
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === "calendar" ? "text-[#2CB397]" : "text-[#202124]"
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === "profile" ? "text-[#2CB397]" : "text-[#202124]"
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
