"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  Shield,
  Bell,
  Lock,
  Download,
  HelpCircle,
  PhoneIcon,
  AlertTriangle,
  LogOut,
  DollarSign,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FundingScreen from "./FundingScreen"
import InsuranceScreen from "./InsuranceScreen"
import Image from "next/image"

export default function ProfileScreen() {
  const [showFunding, setShowFunding] = useState(false)
  const [showInsurance, setShowInsurance] = useState(false)

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("You have been logged out.")
    }
  }

  if (showFunding) {
    return <FundingScreen onBack={() => setShowFunding(false)} />
  }

  if (showInsurance) {
    return <InsuranceScreen onBack={() => setShowInsurance(false)} />
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-[#2CB397] text-white p-6 rounded-b-3xl -mx-4 -mt-4 mb-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Image src="/logo-white.svg" alt="MedTracker Logo" width={32} height={32} className="mr-3" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={40} className="text-white" />
        </div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-teal-100">john.doe@email.com</p>
      </div>

      {/* Personal Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <User className="text-[#2CB397]" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold text-[#202124]">John Doe</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <Mail className="text-[#2CB397]" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-[#202124]">john.doe@email.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 py-3">
            <Phone className="text-[#2CB397]" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-[#202124]">(555) 123-4567</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Healthcare Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Healthcare Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <Stethoscope className="text-[#00C853]" size={20} />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Primary Doctor</p>
              <p className="font-semibold text-[#202124]">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-500">Cardiology Specialist</p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-4 hover:bg-[#F5FCFB]"
            onClick={() => setShowInsurance(true)}
          >
            <Shield className="text-[#2196F3] mr-4 flex-shrink-0" size={20} />
            <div className="text-left flex-1 min-w-0">
              <p className="font-semibold text-[#202124] truncate">Insurance Information</p>
              <p className="text-sm text-gray-600 truncate">Blue Cross Blue Shield - Policy #: BC123456789</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Funding Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <DollarSign className="text-[#FFA726] mr-2" size={20} />
            Funding & Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setShowFunding(true)}
            variant="outline"
            className="w-full justify-start h-auto p-4 border-[#FFA726] text-[#202124] hover:bg-gradient-to-r hover:from-[#FFA726]/10 hover:to-[#FFD54F]/10"
          >
            <div className="text-left flex-1">
              <p className="font-semibold text-[#202124]">Medication Coverage Status</p>
              <p className="text-sm text-gray-600">View interim coverage and approval progress</p>
            </div>
            <ArrowLeft className="text-[#FFA726] rotate-180" size={20} />
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-[#F5FCFB]">
            <Bell className="text-[#FFA726] mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-[#202124]">Notifications</p>
              <p className="text-sm text-gray-600">Manage medication reminders</p>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-[#F5FCFB]">
            <Lock className="text-[#2196F3] mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-[#202124]">Privacy & Security</p>
              <p className="text-sm text-gray-600">Manage your privacy settings</p>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-[#F5FCFB]">
            <Download className="text-[#00C853] mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-[#202124]">Export Data</p>
              <p className="text-sm text-gray-600">Download your medication history</p>
            </div>
          </Button>

          <Button variant="ghost" className="w-full justify-start h-auto p-4 hover:bg-[#F5FCFB]">
            <HelpCircle className="text-[#2196F3] mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-[#202124]">Help & Support</p>
              <p className="text-sm text-gray-600">Get help and contact support</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124]">Emergency Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-red-600 hover:bg-red-700 h-auto p-4">
            <PhoneIcon className="text-white mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-white">Emergency Services</p>
              <p className="text-sm text-red-100">911</p>
            </div>
          </Button>

          <Button className="w-full bg-red-600 hover:bg-red-700 h-auto p-4">
            <AlertTriangle className="text-white mr-4" size={20} />
            <div className="text-left flex-1">
              <p className="font-semibold text-white">Poison Control</p>
              <p className="text-sm text-red-100">1-800-222-1222</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50" onClick={handleLogout}>
        <LogOut size={16} className="mr-2" />
        Log Out
      </Button>

      {/* Footer */}
      <div className="text-center py-6 space-y-1">
        <p className="text-sm font-semibold text-[#202124]">MedTracker v1.0.0</p>
        <p className="text-xs text-gray-500">Your health, simplified</p>
      </div>
    </div>
  )
}
