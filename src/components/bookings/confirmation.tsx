"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { Desk, MembershipTier } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface BookingConfirmationProps {
  data: {
    desk: Desk
    hours: number
    tier: MembershipTier
    totalPrice: number
  }
  onClose: () => void
}

export function BookingConfirmation({ data, onClose }: BookingConfirmationProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
        >
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Booking Confirmed!</h3>
            <p className="text-gray-500 mt-1">Your workspace has been reserved</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Workspace:</div>
                <div className="font-medium text-right">{data.desk.name}</div>

                <div className="text-gray-500">Type:</div>
                <div className="font-medium text-right capitalize">{data.desk.type}</div>

                <div className="text-gray-500">Membership:</div>
                <div className="font-medium text-right">{data.tier}</div>

                <div className="text-gray-500">Duration:</div>
                <div className="font-medium text-right">
                  {data.hours} hour{data.hours > 1 ? "s" : ""}
                </div>

                <div className="text-gray-500">Total Price:</div>
                <div className="font-bold text-right">${data.totalPrice.toFixed(2)}</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center">
              {data.hours > 3 && (
                <p className="text-green-600 font-medium mb-2">10% discount applied for booking over 3 hours</p>
              )}
              <p>A confirmation has been sent to your email</p>
            </div>

            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
