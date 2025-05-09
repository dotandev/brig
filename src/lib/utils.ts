import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DeskType, MembershipTier } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculatePrice(deskType: DeskType, tier: MembershipTier, hours: number): number {
  let hourlyRate = 0

  if (deskType === "individual") {
    switch (tier) {
      case "Basic":
        hourlyRate = 10
        break
      case "Premium":
        hourlyRate = 15
        break
      case "Executive":
        hourlyRate = 20
        break
      default:
        hourlyRate = 10
    }
  } else {
    hourlyRate = 25
  }

  let totalPrice = hourlyRate * hours

  if (hours > 3) {
    totalPrice = totalPrice * 0.9
  }

  return totalPrice
}
