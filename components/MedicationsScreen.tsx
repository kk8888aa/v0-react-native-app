"use client"

import { useState } from "react"
import { Info, Clock, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import MedicationDetail from "./MedicationDetail"
import EducationScreen from "./EducationScreen"
import MedicationTracker from "./MedicationTracker"
import Image from "next/image"

export default function MedicationsScreen() {
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [showEducation, setShowEducation] = useState(false)
  const [showTracker, setShowTracker] = useState(false)
  const [trackerMedication, setTrackerMedication] = useState<any>(null)

  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      taken: 15,
      total: 30,
      nextDose: "2:30 PM",
      lowStock: false,
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      taken: 28,
      total: 60,
      nextDose: "6:00 PM",
      lowStock: false,
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      taken: 27,
      total: 30,
      nextDose: "9:00 PM",
      lowStock: true,
    },
  ]

  if (showTracker && trackerMedication) {
    return <MedicationTracker medication={trackerMedication} onBack={() => setShowTracker(false)} />
  }

  if (showEducation && selectedMedication) {
    return <EducationScreen medication={selectedMedication} onBack={() => setShowEducation(false)} />
  }

  if (selectedMedication) {
    return (
      <MedicationDetail
        medication={selectedMedication}
        onBack={() => setSelectedMedication(null)}
        onEducation={() => setShowEducation(true)}
      />
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
            <h1 className="text-2xl font-bold">My Medications</h1>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {medications.some((med) => med.lowStock) && (
        <Alert className="border-[#FFA726] bg-gradient-to-r from-[#FFA726] to-[#FFD54F] text-white">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            Low stock alert: {medications.filter((med) => med.lowStock).length} medication(s) running low
          </AlertDescription>
        </Alert>
      )}

      {/* Medications List */}
      <div className="space-y-4">
        {medications.map((medication) => (
          <Card
            key={medication.id}
            className={`cursor-pointer hover:shadow-md transition-shadow border-0 shadow-lg ${
              medication.lowStock ? "ring-2 ring-[#FFA726]" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-[#202124]">
                      {medication.name} {medication.dosage}
                    </h3>
                    {medication.lowStock && <AlertTriangle className="text-[#FFA726] ml-2" size={20} />}
                  </div>
                  <p className="text-sm text-gray-600">{medication.frequency}</p>
                  {medication.lowStock && <p className="text-sm text-[#FFA726] font-medium">Only 3 pills remaining!</p>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMedication(medication)
                    setShowEducation(true)
                  }}
                >
                  <Info className="text-[#2196F3]" size={20} />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Pills Remaining</p>
                  <Progress
                    value={(medication.taken / medication.total) * 100}
                    className="h-2"
                    style={{
                      background: medication.lowStock ? "#FFA726" : "#2CB397",
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {medication.total - medication.taken} of {medication.total} left
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-500" size={16} />
                  <span className="text-sm text-gray-600">Next dose: {medication.nextDose}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    className="flex-1 bg-[#00C853] hover:bg-[#00A843] text-white"
                    onClick={() => setSelectedMedication(medication)}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark Taken
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#2CB397] text-[#2CB397] hover:bg-[#F5FCFB]"
                    onClick={() => {
                      setTrackerMedication(medication)
                      setShowTracker(true)
                    }}
                  >
                    <BarChart3 size={16} className="mr-2" />
                    Tracker
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
