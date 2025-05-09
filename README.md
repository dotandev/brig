# Brigga
**A Co-working Space Booking System**

A modern, interactive booking system for co-working spaces with membership tiers, visual desk layout, and revenue tracking.

## Features

- Visual desk layout with 10 individual desks and 5 team spaces
- Three membership tiers for individual desks (Basic, Premium, Executive)
- Fixed pricing for team desks
- 10% discount for bookings over 3 hours
- Real-time availability updates
- Booking confirmation with price calculation
- Revenue dashboard with charts

## Pricing Structure

- Individual Desks:
  - Basic: $10/hour
  - Premium: $15/hour
  - Executive: $20/hour
- Team Desks: $25/hour (fixed)
- 10% discount applied for bookings over 3 hours

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for data visualization
- shadcn/ui for UI components
- Canvas Confetti for celebration effects

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Select a desk from the visual layout (green desks are available, red are booked)
2. Choose a membership tier (for individual desks)
3. Set the number of hours you want to book
4. View the calculated price (with discount applied if applicable)
5. Click "Book Now" to confirm your booking
6. View your booking in the "Current Bookings" tab
7. Check the "Revenue Dashboard" to see financial data

## Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
  - `booking/` - Main booking system component
  - `desk/` - Visual representation of desks
  - `revenue/.tsx` - Revenue dashboard with charts
- `lib/` - Utility functions and types
  - `types.ts` - TypeScript interfaces and types
  - `utils.ts` - Helper functions including price calculation

## License

MIT
