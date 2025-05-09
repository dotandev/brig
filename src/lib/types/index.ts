export type DeskType = "individual" | "team"
export type MembershipTier = "Basic" | "Premium" | "Executive" | "Team"

export interface Desk {
  id: number
  type: DeskType
  name: string
  isBooked: boolean
}

export interface Booking {
  id: string
  deskId: number
  hours: number
  tier: MembershipTier
  price: number
  timestamp: Date
}
