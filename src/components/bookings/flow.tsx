"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookingForm } from "../bookings/form"
import { DeskLayout } from "../desk/layout"
import { RevenueChart } from "../revenue/revenue"
import { BookingConfirmation } from "./confirmation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Booking, Desk, MembershipTier } from "@/lib/types"
import { calculatePrice } from "@/lib/utils"
import confetti from "canvas-confetti"

export function BookingSystem() {
  const [desks, setDesks] = useState<Desk[]>([])
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationData, setConfirmationData] = useState<{
    desk: Desk
    hours: number
    tier: MembershipTier
    totalPrice: number
  } | null>(null)

  useEffect(() => {
    const initialDesks: Desk[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? "individual" : "team",
      name: i < 10 ? `Desk ${i + 1}` : `Team Space ${i - 9}`,
      isBooked: false,
    }))
    setDesks(initialDesks)
  }, [])

  const handleDeskSelect = (desk: Desk) => {
    if (desk.isBooked) return
    setSelectedDesk(desk)
  }

  const handleBooking = (hours: number, tier: MembershipTier) => {
    if (!selectedDesk) return

    const price = calculatePrice(selectedDesk.type, tier, hours)

    const newBooking: Booking = {
      id: Date.now().toString(),
      deskId: selectedDesk.id,
      hours,
      tier,
      price,
      timestamp: new Date(),
    }

    setDesks(desks.map((desk) => (desk.id === selectedDesk.id ? { ...desk, isBooked: true } : desk)))

    setBookings([...bookings, newBooking])

    setConfirmationData({
      desk: selectedDesk,
      hours,
      tier,
      totalPrice: price,
    })
    setShowConfirmation(true)
    setSelectedDesk(null)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const closeConfirmation = () => {
    setShowConfirmation(false)
    setConfirmationData(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bukola Workspaces</h1>
        <p className="text-lg text-gray-600">Book your perfect workspace today</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Desk Layout</h2>
            <DeskLayout desks={desks} selectedDesk={selectedDesk} onDeskSelect={handleDeskSelect} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book a Desk</h2>
            {selectedDesk ? (
              <BookingForm selectedDesk={selectedDesk} onBooking={handleBooking} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Please select a desk from the layout</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <Tabs defaultValue="bookings">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Current Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Current Bookings</h2>
            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">Desk</th>
                      <th className="py-2 text-left">Hours</th>
                      <th className="py-2 text-left">Membership</th>
                      <th className="py-2 text-left">Price</th>
                      <th className="py-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => {
                      const desk = desks.find((d) => d.id === booking.deskId)
                      return (
                        <tr key={booking.id} className="border-b">
                          <td className="py-2">{desk?.name}</td>
                          <td className="py-2">{booking.hours}</td>
                          <td className="py-2">{booking.tier}</td>
                          <td className="py-2">${booking.price.toFixed(2)}</td>
                          <td className="py-2">{booking.timestamp.toLocaleTimeString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-4 text-gray-500">No bookings yet</p>
            )}
          </TabsContent>
          <TabsContent value="revenue" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Revenue Dashboard</h2>
            <RevenueChart bookings={bookings} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {showConfirmation && confirmationData && (
        <BookingConfirmation data={confirmationData} onClose={closeConfirmation} />
      )}
    </div>
  )
}
