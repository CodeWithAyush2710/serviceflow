# **App Name**: ServiceFlow

## Core Features:

- Dual Dashboard: Customer dashboard for service browsing and Partner dashboard for managing listings and availability.
- Real-time Geo-Matching: Utilize Google Maps API and GeoFirestore to display nearby Service Partners and send Firebase Cloud Messages to the nearest partners when a customer books.
- Live Tracking System: Implement an 'Uber-style' tracking screen using Google Maps, updating partner locations in real-time.
- Booking Workflow State Machine: State machine to track the booking progress, 'Pending' -> 'Accepted' -> 'In-Route' -> 'In-Progress' -> 'Completed'.
- Automated Booking Timeout: Firebase Cloud Functions to automatically handle booking timeouts if no partner accepts within 2 minutes.
- Secure Payment Processing: Process payments securely via Firebase Cloud Functions.
- Partner Registration Flow: Enable partners to register, upload their service category, and set hourly rates.

## Style Guidelines:

- Primary color: Soft blue (#A0D2EB) to evoke trust and reliability.
- Background color: Very light blue (#F0F8FF), nearly white.
- Accent color: Muted green (#A9DFBF) to signal availability and positive actions.
- Body and headline font: 'PT Sans', a humanist sans-serif that combines a modern look and a little warmth or personality
- Use clear, intuitive icons from a consistent set (e.g. Material Design Icons) to represent services, actions, and status updates.
- Employ a clean, mobile-responsive layout using Tailwind CSS with a focus on clear hierarchy and easy navigation.
- Use subtle animations (e.g., smooth transitions, loading spinners) to enhance the user experience and provide feedback on interactions.