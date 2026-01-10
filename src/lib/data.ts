import { PlaceHolderImages } from "./placeholder-images";
import type { ServiceCategory, Partner, Booking } from "./types";

export const serviceCategories: ServiceCategory[] = PlaceHolderImages.map(
  (img) => ({
    id: img.id,
    name: img.description.replace(' services', ''),
    description: `Expert ${img.description.toLowerCase()} when you need them.`,
    imageUrl: img.imageUrl,
    imageHint: img.imageHint,
  })
);

export const partners: Partner[] = [
  {
    id: "partner-1",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=partner-1",
    serviceCategory: "Plumbing",
    hourlyRate: 75,
    rating: 4.8,
    location: { lat: 34.06, lng: -118.25 },
    isOnline: true,
  },
  {
    id: "partner-2",
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=partner-2",
    serviceCategory: "Electrical",
    hourlyRate: 85,
    rating: 4.9,
    location: { lat: 34.04, lng: -118.22 },
    isOnline: true,
  },
  {
    id: "partner-3",
    name: "Mike Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=partner-3",
    serviceCategory: "Cleaning",
    hourlyRate: 50,
    rating: 4.7,
    location: { lat: 34.07, lng: -118.28 },
    isOnline: false,
  },
  {
    id: "partner-4",
    name: "Emily Davis",
    avatarUrl: "https://i.pravatar.cc/150?u=partner-4",
    serviceCategory: "Landscaping",
    hourlyRate: 65,
    rating: 4.9,
    location: { lat: 34.03, lng: -118.26 },
    isOnline: true,
  },
];

export const bookings: Booking[] = [
  {
    id: "booking-123",
    customerId: "customer-1",
    partnerId: "partner-1",
    partner: partners[0],
    serviceCategory: "Plumbing",
    status: "In-Route",
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    customerLocation: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: "booking-456",
    customerId: "customer-2",
    serviceCategory: "Electrical",
    status: "Pending",
    createdAt: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    updatedAt: new Date(Date.now() - 1 * 60 * 1000),
    customerLocation: { lat: 34.08, lng: -118.3 },
  },
  {
    id: "booking-789",
    customerId: "customer-3",
    partnerId: "partner-4",
    partner: partners[3],
    serviceCategory: "Landscaping",
    status: "Completed",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
    customerLocation: { lat: 34.01, lng: -118.2 },
  },
];

export const earningsData = [
    { date: "Mon", revenue: 240 },
    { date: "Tue", revenue: 190 },
    { date: "Wed", revenue: 320 },
    { date: "Thu", revenue: 280 },
    { date: "Fri", revenue: 450 },
    { date: "Sat", revenue: 600 },
    { date: "Sun", revenue: 150 },
];
