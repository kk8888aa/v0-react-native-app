"use client"

import { useState } from "react"
import { ArrowLeft, Brain, TrendingUp, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface MedicationTrackerProps {
  medication?: any
  onBack: () => void
}

export default function MedicationTracker({ medication, onBack }: MedicationTrackerProps) {
  const [dailyTracking, setDailyTracking] = useState<boolean[]>(new Array(7).fill(false))
  const [weeklyReflection, setWeeklyReflection] = useState("")

  const toggleDay = (index: number) => {
    const newTracking = [...dailyTracking]
    newTracking[index] = !newTracking[index]
    setDailyTracking(newTracking)
  }

  const medicationName = medication ? `${medication.name} ${medication.dosage}` : "Medication"

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mb-4 -ml-2">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{medicationName} Tracker</h1>
        <p className="text-teal-100">Track your weekly progress</p>
      </div>

      {/* AI Summary Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-[#2CB397]/10 to-[#00C853]/10">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Brain className="text-[#2CB397] mr-2" size={24} />
            AI Insights & Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="text-[#00C853] mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-[#00C853]">85%</div>
              <div className="text-sm text-[#202124]">Adherence Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Calendar className="text-[#2196F3] mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-[#2196F3]">12</div>
              <div className="text-sm text-[#202124]">Day Streak</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-[#202124] mb-2 flex items-center">
              <CheckCircle2 className="text-[#00C853] mr-2" size={16} />
              Weekly Summary
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Great progress this week! You've maintained consistent timing with your {medicationName} doses. Your
              adherence has improved by 15% compared to last week. Consider setting a daily reminder for your evening
              dose to maintain this positive trend.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-[#202124] mb-2">💡 AI Recommendation</h3>
            <p className="text-sm text-gray-600">
              Based on your tracking pattern, taking your medication right after breakfast seems to work best for you.
              Continue this routine for optimal results.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Week Header */}
      <div className="bg-gradient-to-r from-[#FFA726] to-[#FFD54F] text-white p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">Week 1</h2>
        <p className="text-white/90">Check off the numbered circles as you take your medication each day</p>
      </div>

      {/* Daily Medication Tracking */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Daily Medication Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4 mb-6">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => toggleDay(index)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-colors ${
                    dailyTracking[index]
                      ? "bg-[#00C853] border-[#00C853] text-white"
                      : "border-[#2CB397] text-[#2CB397] hover:bg-[#F5FCFB]"
                  }`}
                >
                  {dailyTracking[index] ? "✓" : index + 1}
                </button>
                <span className="text-sm text-[#202124] font-medium">Day {index + 1}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#F5FCFB] p-4 rounded-lg">
            <p className="text-[#202124] text-center">
              What is your plan this week with regards to taking your {medicationName}?
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Reflection */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Weekly Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#202124]">
              Are you incorporating your {medicationName} into your routine?
            </h3>
            <RadioGroup value={weeklyReflection} onValueChange={setWeeklyReflection}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" className="border-[#2CB397] text-[#2CB397]" />
                <Label htmlFor="yes" className="text-[#202124]">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" className="border-[#2CB397] text-[#2CB397]" />
                <Label htmlFor="no" className="text-[#202124]">
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="sometimes" className="border-[#2CB397] text-[#2CB397]" />
                <Label htmlFor="sometimes" className="text-[#202124]">
                  Sometimes
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">This Week's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#2CB397] mb-2">{dailyTracking.filter(Boolean).length}/7</div>
            <p className="text-[#202124]">Days completed this week</p>
            <div className="mt-4 bg-[#F5FCFB] rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#2CB397] to-[#00C853] h-3 rounded-full transition-all duration-300"
                style={{ width: `${(dailyTracking.filter(Boolean).length / 7) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full bg-[#2CB397] hover:bg-[#229B87] text-white py-3">Save Weekly Progress</Button>
    </div>
  )
}
