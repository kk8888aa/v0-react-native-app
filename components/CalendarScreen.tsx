"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [symptomLog, setSymptomLog] = useState<{ [key: string]: string[] }>({
    "2024-01-15": ["Headache", "Fatigue"],
    "2024-01-16": ["Nausea"],
    "2024-01-18": ["Dizziness", "Headache"],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
    setIsDialogOpen(true)
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
      setIsDialogOpen(false)
      alert("Symptoms recorded successfully!")
    }
  }

  const addSymptom = (symptom: string) => {
    const currentSymptoms = symptoms ? symptoms + ", " : ""
    setSymptoms(currentSymptoms + symptom)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(day)
      const hasSymptoms = symptomLog[dateString]
      const isToday = day === currentDate.getDate()

      days.push(
        <button
          key={day}
          onClick={() => handleDatePress(day)}
          className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg relative transition-colors ${
            isToday
              ? "bg-[#2CB397] text-white"
              : hasSymptoms
                ? "bg-[#2CB397]/10 text-[#2CB397] hover:bg-[#2CB397]/20"
                : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {day}
          {hasSymptoms && !isToday && <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#2CB397] rounded-full" />}
        </button>,
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
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <div className="flex items-center mb-2">
          <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
          <h1 className="text-2xl font-bold">Symptom Calendar</h1>
        </div>
        <p className="text-teal-100">Track your daily symptoms</p>
      </div>

      {/* Calendar */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm">
              <ChevronLeft size={20} />
            </Button>
            <CardTitle className="text-lg text-[#202124]">
              {monthNames[currentMonth]} {currentYear}
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronRight size={20} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-base text-[#202124]">Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-[#2CB397] rounded" />
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-[#2CB397]/10 rounded relative">
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#2CB397] rounded-full" />
            </div>
            <span className="text-sm text-gray-600">Has symptoms</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Symptoms */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Recent Symptoms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(symptomLog)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, 5)
            .map(([date, symptoms]) => (
              <div
                key={date}
                className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-sm font-medium text-[#2CB397]">
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-gray-600 text-right flex-1 ml-4">{symptoms.join(", ")}</span>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Symptom Recording Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#202124]">Record Symptoms</DialogTitle>
            <p className="text-sm text-gray-600">
              {selectedDate &&
                new Date(selectedDate).toLocaleDateString("en-US", {
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
                onClick={() => setIsDialogOpen(false)}
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
