"use client"

import { ArrowLeft, Pill, AlertTriangle, AlertCircle, Link, Info, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface EducationScreenProps {
  medication: any
  onBack: () => void
}

export default function EducationScreen({ medication, onBack }: EducationScreenProps) {
  const educationData: { [key: string]: any } = {
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

  const info = educationData[medication.name] || educationData.Lisinopril

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mb-4 -ml-2">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <div className="flex items-center space-x-4">
          <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">{medication.name} Information</h1>
        </div>
        <p className="text-blue-100">Important medication details</p>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>What is {medication.name}?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#202124] leading-relaxed">{info.description}</p>
        </CardContent>
      </Card>

      {/* Uses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="text-[#2CB397] mr-2" size={20} />
            Uses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.uses.map((use: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#2CB397] mr-3 mt-1">•</span>
                <span className="text-[#202124]">{use}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Side Effects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="text-[#FFA726] mr-2" size={20} />
            Common Side Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.sideEffects.map((effect: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#FFA726] mr-3 mt-1">•</span>
                <span className="text-[#202124]">{effect}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="text-red-600 mr-2" size={20} />
            Important Warnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.warnings.map((warning: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-red-600 mr-3 mt-1">•</span>
                <span className="text-[#202124]">{warning}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Drug Interactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="text-[#2196F3] mr-2" size={20} />
            Drug Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {info.interactions.map((interaction: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#2196F3] mr-3 mt-1">•</span>
                <span className="text-[#202124]">{interaction}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="text-gray-500 mt-1" size={20} />
            <p className="text-sm text-gray-600 italic leading-relaxed">
              This information is for educational purposes only. Always consult your healthcare provider for medical
              advice and before making any changes to your medication regimen.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Doctor */}
      <Button className="w-full bg-[#00C853] hover:bg-[#00C853]">
        <Phone size={16} className="mr-2" />
        Contact Your Doctor
      </Button>
    </div>
  )
}
