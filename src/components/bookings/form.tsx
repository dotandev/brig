"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Desk, MembershipTier } from "@/lib/types"
import { calculatePrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio"
import { Slider } from "@/components/ui/slider"

interface BookingFormProps {
  selectedDesk: Desk
  onBooking: (hours: number, tier: MembershipTier) => void
}

export function BookingForm({ selectedDesk, onBooking }: BookingFormProps) {
  const [hours, setHours] = useState(1)
  const [tier, setTier] = useState<MembershipTier>(selectedDesk.type === "individual" ? "Basic" : "Team")

  const handleHoursChange = (value: number[]) => {
    setHours(value[0])
  }

  const handleTierChange = (value: string) => {
    setTier(value as MembershipTier)
  }

  const price = calculatePrice(selectedDesk.type, tier, hours)
  const hasDiscount = hours > 3

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{selectedDesk.name}</h3>
        <p className="text-sm text-gray-500">{selectedDesk.type === "individual" ? "Individual Desk" : "Team Space"}</p>
      </div>

      {selectedDesk.type === "individual" && (
        <div className="space-y-3">
          <Label>Membership Tier</Label>
          <RadioGroup value={tier} onValueChange={handleTierChange} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Basic" id="basic" />
              <Label htmlFor="basic" className="flex justify-between w-full">
                <span>Basic</span>
                <span className="font-medium">$10/hr</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Premium" id="premium" />
              <Label htmlFor="premium" className="flex justify-between w-full">
                <span>Premium</span>
                <span className="font-medium">$15/hr</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Executive" id="executive" />
              <Label htmlFor="executive" className="flex justify-between w-full">
                <span>Executive</span>
                <span className="font-medium">$20/hr</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {selectedDesk.type === "team" && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <span>Team Space</span>
            <span className="font-medium">$25/hr</span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between">
          <Label>Hours: {hours}</Label>
          {hasDiscount && <span className="text-sm text-green-600 font-medium">10% Discount Applied</span>}
        </div>
        <Slider value={[hours]} min={1} max={8} step={1} onValueChange={handleHoursChange} />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1 hour</span>
          <span>8 hours</span>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total Price:</span>
          <motion.span key={price} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-xl font-bold">
            ${price.toFixed(2)}
          </motion.span>
        </div>
        <Button onClick={() => onBooking(hours, tier)} className="w-full">
          Book Now
        </Button>
      </div>
    </motion.div>
  )
}
