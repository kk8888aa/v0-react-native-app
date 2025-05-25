"use client"

import { useState } from "react"
import { Pill, Clock, Calendar, Bell, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import NotificationSettings from "./NotificationSettings"
import Image from "next/image"

export default function HomeScreen() {
  const [showSymptomDialog, setShowSymptomDialog] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)
  const [symptoms, setSymptoms] = useState("")
  const [medicationStatus, setMedicationStatus] = useState({
    lisinopril: false,
    metformin: false,
  })

  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const saveSymptoms = () => {
    if (symptoms.trim()) {
      setSymptoms("")
      setShowSymptomDialog(false)
      alert("Symptoms recorded successfully!")
    }
  }

  const addSymptom = (symptom: string) => {
    const currentSymptoms = symptoms ? symptoms + ", " : ""
    setSymptoms(currentSymptoms + symptom)
  }

  const handleMedicationTake = (medication: string) => {
    setMedicationStatus((prev) => ({
      ...prev,
      [medication]: true,
    }))
  }

  if (showNotificationSettings) {
    return <NotificationSettings onBack={() => setShowNotificationSettings(false)} />
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <div className="flex items-center mb-4">
          <Image src="/logo-white.svg" alt="MedTracker Logo" width={40} height={40} className="mr-3" />
          <h1 className="text-2xl font-bold">MedTracker</h1>
        </div>
        <h2 className="text-xl font-semibold mb-1">Good Morning!</h2>
        <p className="text-teal-100">{currentDate}</p>
      </div>

      {/* Today's Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Pill className="text-[#2CB397]" size={24} />
              <span className="text-[#202124]">Medications Taken</span>
            </div>
            <span className="text-xl font-bold text-[#2CB397]">3/4</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="text-[#FFA726]" size={24} />
              <span className="text-[#202124]">Next Dose</span>
            </div>
            <span className="text-xl font-bold text-[#FFA726]">2:30 PM</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-[#202124]">Quick Actions</h2>

        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4 border-[#2CB397] hover:bg-[#F5FCFB]"
          onClick={() => setShowSymptomDialog(true)}
        >
          <Calendar className="text-[#2196F3] mr-3" size={24} />
          <span className="text-[#202124]">Record Symptoms</span>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start h-auto p-4 border-[#2CB397] hover:bg-[#F5FCFB]"
          onClick={() => setShowNotificationSettings(true)}
        >
          <Bell className="text-[#FFA726] mr-3" size={24} />
          <span className="text-[#202124]">Notification Settings</span>
        </Button>
      </div>

      {/* Upcoming Medications */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Upcoming Medications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-semibold text-[#202124]">Lisinopril 10mg</p>
              <p className="text-sm text-gray-600">2:30 PM</p>
            </div>
            {medicationStatus.lisinopril ? (
              <div className="flex items-center text-[#00C853]">
                <CheckCircle size={20} className="mr-2" />
                <span className="font-semibold">Taken</span>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-[#00C853] hover:bg-[#00A843] text-white"
                onClick={() => handleMedicationTake("lisinopril")}
              >
                Take
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-[#202124]">Metformin 500mg</p>
              <p className="text-sm text-gray-600">6:00 PM</p>
            </div>
            {medicationStatus.metformin ? (
              <div className="flex items-center text-[#00C853]">
                <CheckCircle size={20} className="mr-2" />
                <span className="font-semibold">Taken</span>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-[#00C853] hover:bg-[#00A843] text-white"
                onClick={() => handleMedicationTake("metformin")}
              >
                Take
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Symptom Recording Dialog */}
      <Dialog open={showSymptomDialog} onOpenChange={setShowSymptomDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#202124]">Record Symptoms</DialogTitle>
            <p className="text-sm text-gray-600">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="symptoms">Enter symptoms (separate with commas):</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Headache, Nausea, Fatigue"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Common Symptoms:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Headache", "Nausea", "Fatigue", "Dizziness", "Stomach pain", "Insomnia"].map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    size="sm"
                    onClick={() => addSymptom(symptom)}
                    className="text-xs border-[#2CB397] text-[#2CB397] hover:bg-[#F5FCFB]"
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowSymptomDialog(false)}
                className="flex-1 border-[#2CB397] text-[#202124]"
              >
                Cancel
              </Button>
              <Button onClick={saveSymptoms} className="flex-1 bg-[#2CB397] hover:bg-[#229B87] text-white">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
