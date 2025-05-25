"use client"

import type React from "react"

import { useState } from "react"
import { Activity, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface AssessmentFormProps {
  onSubmit: () => void
}

export default function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const [formData, setFormData] = useState({
    painLevel: [0],
    hasJointPain: false,
    jointPainLocation: "",
    sideEffects: "",
    optionalNotes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store assessment data (you can send this to your backend)
    console.log("Assessment submitted:", formData)

    setIsSubmitting(false)
    onSubmit()
  }

  const jointPainLocations = [
    "Knees",
    "Hips",
    "Shoulders",
    "Hands/Wrists",
    "Ankles",
    "Back",
    "Neck",
    "Elbows",
    "Multiple locations",
    "Other",
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#2CB397] text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-center mb-2">
            <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
            <h1 className="text-2xl font-bold">Assessment Form</h1>
          </div>
          <p className="text-teal-100 text-center">Help us understand your current health status</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Pain Level */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#202124] flex items-center text-lg">
                <Activity className="text-[#2CB397] mr-2" size={20} />
                Pain Level
              </CardTitle>
              <p className="text-sm text-gray-600">Within the last week, how much pain did you have?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="px-2">
                <Slider
                  value={formData.painLevel}
                  onValueChange={(value) => setFormData({ ...formData, painLevel: value })}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 px-2">
                <span>0 - No pain</span>
                <span className="font-semibold text-[#2CB397]">{formData.painLevel[0]}</span>
                <span>10 - Worst pain</span>
              </div>
            </CardContent>
          </Card>

          {/* Joint Pain */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#202124] flex items-center text-lg">
                <MapPin className="text-[#FFA726] mr-2" size={20} />
                Joint Pain
              </CardTitle>
              <p className="text-sm text-gray-600">Are you currently experiencing joint pain?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="joint-pain" className="text-[#202124] font-medium">
                  Joint Pain
                </Label>
                <Switch
                  id="joint-pain"
                  checked={formData.hasJointPain}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      hasJointPain: checked,
                      jointPainLocation: checked ? formData.jointPainLocation : "",
                    })
                  }
                />
              </div>

              {formData.hasJointPain && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#202124]">Location of joint pain:</Label>
                  <Select
                    value={formData.jointPainLocation}
                    onValueChange={(value) => setFormData({ ...formData, jointPainLocation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {jointPainLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Side Effects */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#202124] text-lg">Side Effects</CardTitle>
              <p className="text-sm text-gray-600">Have you experienced any side effects from medications?</p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.sideEffects}
                onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                placeholder="Describe any side effects you've experienced..."
                className="min-h-[80px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Optional Notes */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-[#202124] text-lg">Optional Notes</CardTitle>
              <p className="text-sm text-gray-600">Anything else you'd like to share?</p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.optionalNotes}
                onChange={(e) => setFormData({ ...formData, optionalNotes: e.target.value })}
                placeholder="Share any additional information..."
                className="min-h-[80px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2CB397] hover:bg-[#229B87] text-white py-3 text-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          {/* Required Notice */}
          <p className="text-xs text-gray-500 text-center">
            This assessment helps us provide better care. Please complete all required fields.
          </p>
        </form>
      </div>
    </div>
  )
}
