"use client"

import { useMemo } from "react"
import type { Booking } from "@/lib/types"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface RevenueChartProps {
  bookings: Booking[]
}

export function RevenueChart({ bookings }: RevenueChartProps) {
  const chartData = useMemo(() => {
    const tierRevenue = {
      Basic: 0,
      Premium: 0,
      Executive: 0,
      Team: 0,
    }

    bookings.forEach((booking) => {
      tierRevenue[booking.tier] += booking.price
    })

    return [
      { name: "Basic", revenue: tierRevenue.Basic },
      { name: "Premium", revenue: tierRevenue.Premium },
      { name: "Executive", revenue: tierRevenue.Executive },
      { name: "Team", revenue: tierRevenue.Team },
    ]
  }, [bookings])

  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, booking) => sum + booking.price, 0)
  }, [bookings])

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No revenue data available yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(chartData).map(([_, data]) => (
          <div key={data.name} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">{data.name}</div>
            <div className="text-xl font-bold">${data.revenue.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <div className="text-sm text-gray-500">Total Revenue</div>
        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
