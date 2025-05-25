"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Clock, Smartphone, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface NotificationSettingsProps {
  onBack: () => void
}

export default function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    medicationReminders: true,
    refillAlerts: true,
    appointmentReminders: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    reminderSound: "default",
    snoozeTime: "5",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveSettings = () => {
    alert("Notification settings saved successfully!")
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
          <h1 className="text-2xl font-bold">Notification Settings</h1>
        </div>
        <p className="text-teal-100">Manage your medication reminders</p>
      </div>

      {/* Medication Reminders */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Bell className="text-[#2CB397] mr-2" size={20} />
            Medication Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="medication-reminders" className="text-[#202124] font-medium">
                Enable Medication Reminders
              </Label>
              <p className="text-sm text-gray-600">Get notified when it's time to take your medication</p>
            </div>
            <Switch
              id="medication-reminders"
              checked={settings.medicationReminders}
              onCheckedChange={(checked) => handleSettingChange("medicationReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="refill-alerts" className="text-[#202124] font-medium">
                Refill Alerts
              </Label>
              <p className="text-sm text-gray-600">Get notified when medication is running low</p>
            </div>
            <Switch
              id="refill-alerts"
              checked={settings.refillAlerts}
              onCheckedChange={(checked) => handleSettingChange("refillAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="appointment-reminders" className="text-[#202124] font-medium">
                Appointment Reminders
              </Label>
              <p className="text-sm text-gray-600">Get notified about upcoming doctor appointments</p>
            </div>
            <Switch
              id="appointment-reminders"
              checked={settings.appointmentReminders}
              onCheckedChange={(checked) => handleSettingChange("appointmentReminders", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Smartphone className="text-[#2196F3] mr-2" size={20} />
            Notification Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="text-[#202124] font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="text-[#202124] font-medium">
                Email Notifications
              </Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications" className="text-[#202124] font-medium">
                SMS Notifications
              </Label>
              <p className="text-sm text-gray-600">Receive notifications via text message</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sound & Timing */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Volume2 className="text-[#FFA726] mr-2" size={20} />
            Sound & Timing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-[#202124] font-medium">Reminder Sound</Label>
            <Select
              value={settings.reminderSound}
              onValueChange={(value) => handleSettingChange("reminderSound", value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select reminder sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="gentle">Gentle Chime</SelectItem>
                <SelectItem value="urgent">Urgent Beep</SelectItem>
                <SelectItem value="melody">Soft Melody</SelectItem>
                <SelectItem value="vibrate">Vibrate Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-[#202124] font-medium">Snooze Duration</Label>
            <Select value={settings.snoozeTime} onValueChange={(value) => handleSettingChange("snoozeTime", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select snooze duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medication-Specific Settings */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-[#202124] flex items-center">
            <Clock className="text-[#00C853] mr-2" size={20} />
            Medication-Specific Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-[#F5FCFB] rounded-lg">
              <h4 className="font-semibold text-[#202124] mb-2">Lisinopril 10mg</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Daily reminder at 8:00 AM</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="p-3 bg-[#F5FCFB] rounded-lg">
              <h4 className="font-semibold text-[#202124] mb-2">Metformin 500mg</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Twice daily: 8:00 AM, 6:00 PM</span>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="p-3 bg-[#F5FCFB] rounded-lg">
              <h4 className="font-semibold text-[#202124] mb-2">Atorvastatin 20mg</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Daily reminder at 9:00 PM</span>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={saveSettings} className="w-full bg-[#2CB397] hover:bg-[#229B87] text-white py-3">
        Save Notification Settings
      </Button>
    </div>
  )
}
