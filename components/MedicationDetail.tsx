"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Book, Bell, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface MedicationDetailProps {
  medication: any
  onBack: () => void
  onEducation: () => void
}

export default function MedicationDetail({ medication, onBack, onEducation }: MedicationDetailProps) {
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
    alert("Medication marked as taken!")
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mb-4 -ml-2">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <div className="flex items-center mb-2">
          <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
          <h1 className="text-2xl font-bold">
            {medication.name} {medication.dosage}
          </h1>
        </div>
        <p className="text-teal-100">{medication.frequency}</p>
      </div>

      {/* Medication Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Tracker</CardTitle>
          <p className="text-sm text-gray-600">Track your daily doses</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyLog.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-[#202124]">{entry.time}</p>
                <p className="text-sm text-gray-600">{entry.date}</p>
              </div>
              <div>
                {entry.taken ? (
                  <div className="flex items-center text-[#00C853]">
                    <CheckCircle size={20} className="mr-2" />
                    <span className="font-semibold">Taken</span>
                  </div>
                ) : (
                  <Button size="sm" onClick={() => markAsTaken(index)}>
                    Mark Taken
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education Button */}
      <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onEducation}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Book className="text-[#2CB397]" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-[#202124]">Learn About This Medication</h3>
              <p className="text-sm text-gray-600">Side effects, interactions, and important information</p>
            </div>
            <ArrowLeft className="text-[#2CB397] rotate-180" size={20} />
          </div>
        </CardContent>
      </Card>

      {/* Medication Details */}
      <Card>
        <CardHeader>
          <CardTitle>Medication Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Dosage:</span>
            <span className="font-semibold text-[#202124]">{medication.dosage}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Frequency:</span>
            <span className="font-semibold text-[#202124]">{medication.frequency}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Pills Remaining:</span>
            <span className="font-semibold text-[#202124]">
              {medication.total - medication.taken} of {medication.total}
            </span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-600">Next Refill:</span>
            <span className="font-semibold text-[#202124]">In 15 days</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full">
          <Bell size={16} className="mr-2" />
          Set Reminder
        </Button>
        <Button variant="outline" className="w-full">
          <Edit size={16} className="mr-2" />
          Edit Medication
        </Button>
      </div>
    </div>
  )
}
