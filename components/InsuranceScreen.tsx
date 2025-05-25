"use client"

import { useState } from "react"
import { ArrowLeft, Shield, Save, User, CreditCard, Building, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface InsuranceScreenProps {
  onBack: () => void
}

export default function InsuranceScreen({ onBack }: InsuranceScreenProps) {
  const [insuranceInfo, setInsuranceInfo] = useState({
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC123456789",
    groupNumber: "GRP001",
    memberID: "MEM123456",
    subscriberName: "John Doe",
    relationshipToSubscriber: "self",
    effectiveDate: "2024-01-01",
    copayAmount: "$25",
    deductible: "$1,500",
    outOfPocketMax: "$5,000",
  })

  const handleInputChange = (field: string, value: string) => {
    setInsuranceInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    alert("Insurance information updated successfully!")
    onBack()
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
          <h1 className="text-2xl font-bold">Insurance Information</h1>
        </div>
        <p className="text-teal-100">Manage your insurance details</p>
      </div>

      {/* Primary Insurance Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Shield className="text-[#2196F3] mr-2" size={20} />
            Primary Insurance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="provider">Insurance Provider</Label>
            <Input
              id="provider"
              value={insuranceInfo.provider}
              onChange={(e) => handleInputChange("provider", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="policy">Policy Number</Label>
              <Input
                id="policy"
                value={insuranceInfo.policyNumber}
                onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="group">Group Number</Label>
              <Input
                id="group"
                value={insuranceInfo.groupNumber}
                onChange={(e) => handleInputChange("groupNumber", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="member">Member ID</Label>
            <Input
              id="member"
              value={insuranceInfo.memberID}
              onChange={(e) => handleInputChange("memberID", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subscriber Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <User className="text-[#2CB397] mr-2" size={20} />
            Subscriber Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subscriber">Subscriber Name</Label>
            <Input
              id="subscriber"
              value={insuranceInfo.subscriberName}
              onChange={(e) => handleInputChange("subscriberName", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="relationship">Relationship to Subscriber</Label>
            <Select
              value={insuranceInfo.relationshipToSubscriber}
              onValueChange={(value) => handleInputChange("relationshipToSubscriber", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="dependent">Dependent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="effective">Effective Date</Label>
            <Input
              id="effective"
              type="date"
              value={insuranceInfo.effectiveDate}
              onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Coverage Details */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <CreditCard className="text-[#FFA726] mr-2" size={20} />
            Coverage Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="copay">Copay Amount</Label>
              <Input
                id="copay"
                value={insuranceInfo.copayAmount}
                onChange={(e) => handleInputChange("copayAmount", e.target.value)}
                className="mt-1"
                placeholder="$25"
              />
            </div>
            <div>
              <Label htmlFor="deductible">Annual Deductible</Label>
              <Input
                id="deductible"
                value={insuranceInfo.deductible}
                onChange={(e) => handleInputChange("deductible", e.target.value)}
                className="mt-1"
                placeholder="$1,500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="out-of-pocket">Out-of-Pocket Maximum</Label>
            <Input
              id="out-of-pocket"
              value={insuranceInfo.outOfPocketMax}
              onChange={(e) => handleInputChange("outOfPocketMax", e.target.value)}
              className="mt-1"
              placeholder="$5,000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Insurance Card Upload */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Building className="text-[#00C853] mr-2" size={20} />
            Insurance Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-[#2CB397] rounded-lg p-6 text-center">
            <Building className="text-[#2CB397] mx-auto mb-2" size={32} />
            <p className="text-[#202124] font-medium mb-1">Upload Insurance Card</p>
            <p className="text-sm text-gray-600 mb-4">Take a photo or upload an image of your insurance card</p>
            <Button variant="outline" className="border-[#2CB397] text-[#2CB397] hover:bg-[#F5FCFB]">
              Choose File
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Hash className="text-[#00C853] mr-2" size={20} />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-[#00C853]/10 rounded-lg">
            <div>
              <p className="font-semibold text-[#202124]">Insurance Verified</p>
              <p className="text-sm text-gray-600">Last verified: January 15, 2024</p>
            </div>
            <div className="w-3 h-3 bg-[#00C853] rounded-full"></div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSave} className="w-full bg-[#2CB397] hover:bg-[#229B87] text-white py-3">
        <Save size={16} className="mr-2" />
        Save Insurance Information
      </Button>
    </div>
  )
}
