"use client"

import { ArrowLeft, CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface FundingScreenProps {
  onBack: () => void
}

export default function FundingScreen({ onBack }: FundingScreenProps) {
  const medications = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      interimCoverage: "Active",
      approvalStatus: "Approved",
      approvalProgress: 100,
      monthlyCoPayment: "$15",
      nextReviewDate: "March 15, 2024",
      status: "approved",
    },
    {
      id: 2,
      name: "Metformin 500mg",
      interimCoverage: "Active",
      approvalStatus: "Under Review",
      approvalProgress: 65,
      monthlyCoPayment: "$25",
      nextReviewDate: "February 28, 2024",
      status: "pending",
    },
    {
      id: 3,
      name: "Atorvastatin 20mg",
      interimCoverage: "Pending",
      approvalStatus: "Documentation Required",
      approvalProgress: 30,
      monthlyCoPayment: "TBD",
      nextReviewDate: "February 20, 2024",
      status: "action-required",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-[#00C853] text-white"
      case "pending":
        return "bg-[#FFA726] text-white"
      case "action-required":
        return "bg-[#2196F3] text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={16} />
      case "pending":
        return <Clock size={16} />
      case "action-required":
        return <AlertCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mb-4 -ml-2">
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Funding & Coverage</h1>
        <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
        <p className="text-teal-100">Medication coverage and approval status</p>
      </div>

      {/* Coverage Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <DollarSign className="text-[#FFA726] mr-2" size={20} />
            Coverage Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#F5FCFB] rounded-lg">
              <div className="text-2xl font-bold text-[#00C853]">2</div>
              <div className="text-sm text-[#202124]">Active Coverage</div>
            </div>
            <div className="text-center p-4 bg-[#F5FCFB] rounded-lg">
              <div className="text-2xl font-bold text-[#FFA726]">1</div>
              <div className="text-sm text-[#202124]">Pending Review</div>
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-[#FFA726]/10 to-[#FFD54F]/10 rounded-lg">
            <div className="text-lg font-semibold text-[#202124]">Total Monthly Co-Payment</div>
            <div className="text-2xl font-bold text-[#FFA726]">$40</div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Coverage Details */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#202124]">Medication Coverage Details</h2>

        {medications.map((medication) => (
          <Card key={medication.id} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-[#202124]">{medication.name}</h3>
                  <Badge className={getStatusColor(medication.status)}>
                    {getStatusIcon(medication.status)}
                    <span className="ml-1">{medication.approvalStatus}</span>
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Interim Coverage:</span>
                    <span className="text-sm font-medium text-[#202124]">{medication.interimCoverage}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monthly Co-Payment:</span>
                    <span className="text-sm font-medium text-[#202124]">{medication.monthlyCoPayment}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Review:</span>
                    <span className="text-sm font-medium text-[#202124]">{medication.nextReviewDate}</span>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Approval Progress:</span>
                      <span className="text-sm font-medium text-[#202124]">{medication.approvalProgress}%</span>
                    </div>
                    <Progress value={medication.approvalProgress} className="h-2" />
                  </div>
                </div>

                {medication.status === "action-required" && (
                  <div className="mt-4 p-3 bg-[#2196F3]/10 rounded-lg">
                    <p className="text-sm text-[#2196F3] font-medium">
                      Action Required: Additional documentation needed for approval
                    </p>
                    <Button size="sm" className="mt-2 bg-[#2196F3] hover:bg-[#1976D2] text-white">
                      Upload Documents
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            If you have questions about your coverage or need assistance with the approval process, our support team is
            here to help.
          </p>
          <Button className="w-full bg-[#2CB397] hover:bg-[#229B87] text-white">Contact Coverage Support</Button>
        </CardContent>
      </Card>
    </div>
  )
}
