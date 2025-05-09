"use client"

import { motion } from "framer-motion"
import type { Desk } from "@/lib/types"

interface DeskLayoutProps {
  desks: Desk[]
  selectedDesk: Desk | null
  onDeskSelect: (desk: Desk) => void
}

export function DeskLayout({ desks, selectedDesk, onDeskSelect }: DeskLayoutProps) {
  const individualDesks = desks.filter((desk) => desk.type === "individual")
  const teamDesks = desks.filter((desk) => desk.type === "team")

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">Individual Desks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {individualDesks.map((desk) => (
            <DeskItem
              key={desk.id}
              desk={desk}
              isSelected={selectedDesk?.id === desk.id}
              onSelect={() => onDeskSelect(desk)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-gray-700">Team Spaces</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {teamDesks.map((desk) => (
            <DeskItem
              key={desk.id}
              desk={desk}
              isSelected={selectedDesk?.id === desk.id}
              onSelect={() => onDeskSelect(desk)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface DeskItemProps {
  desk: Desk
  isSelected: boolean
  onSelect: () => void
}

function DeskItem({ desk, isSelected, onSelect }: DeskItemProps) {
  return (
    <motion.div
      whileHover={{ scale: desk.isBooked ? 1 : 1.05 }}
      whileTap={{ scale: desk.isBooked ? 1 : 0.95 }}
      onClick={desk.isBooked ? undefined : onSelect}
      className={`
        relative aspect-square rounded-lg flex items-center justify-center cursor-pointer
        ${
          desk.isBooked
            ? "bg-gray-200 cursor-not-allowed"
            : isSelected
              ? "bg-purple-100 border-2 border-purple-500"
              : "bg-white border border-gray-200 hover:border-purple-300"
        }
      `}
    >
      <div className="text-center">
        <div className={`text-sm font-medium ${desk.isBooked ? "text-gray-500" : "text-gray-700"}`}>{desk.name}</div>
        {desk.isBooked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Booked</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
