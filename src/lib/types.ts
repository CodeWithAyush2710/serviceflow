export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Partner = {
  id: string;
  name: string;
  avatarUrl: string;
  serviceCategory: string;
  hourlyRate: number;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
  isOnline: boolean;
};

export type Booking = {
  id: string;
  customerId: string;
  partnerId?: string;
  serviceCategory: string;
  status: 'Pending' | 'Accepted' | 'In-Route' | 'In-Progress' | 'Completed' | 'Cancelled' | 'Timed-Out';
  createdAt: Date;
  updatedAt: Date;
  customerLocation: {
    lat: number;
    lng: number;
  };
  partner?: Partner;
};
