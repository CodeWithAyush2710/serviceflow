'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import MapComponent from '@/components/map-component';
import { bookings, partners } from '@/lib/data';
import type { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Circle, Dot, Loader, Truck, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const bookingStatuses: Booking['status'][] = ['Pending', 'Accepted', 'In-Route', 'In-Progress', 'Completed'];

const statusIcons: Record<Booking['status'], React.ReactNode> = {
  Pending: <Loader className="h-5 w-5 animate-spin" />,
  Accepted: <CheckCircle className="h-5 w-5 text-primary" />,
  'In-Route': <Truck className="h-5 w-5 text-primary" />,
  'In-Progress': <Wrench className="h-5 w-5 text-primary" />,
  Completed: <CheckCircle className="h-5 w-5 text-green-500" />,
  Cancelled: <Circle className="h-5 w-5 text-destructive" />,
  'Timed-Out': <Circle className="h-5 w-5 text-destructive" />,
};

export default function BookingTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [booking, setBooking] = useState<Booking | undefined>(
    bookings.find((b) => b.id === id)
  );

  // Simulate real-time partner location updates
  const [partnerLocation, setPartnerLocation] = useState(booking?.partner?.location);

  useEffect(() => {
    if (booking?.status === 'In-Route' && booking.partner) {
      const interval = setInterval(() => {
        setPartnerLocation((prev) => {
          if (!prev) return booking.partner?.location;
          // Simulate movement towards customer
          return {
            lat: prev.lat + (booking.customerLocation.lat - prev.lat) * 0.1,
            lng: prev.lng + (booking.customerLocation.lng - prev.lng) * 0.1,
          };
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [booking]);


  if (!booking) {
    notFound();
  }

  const currentStatusIndex = bookingStatuses.indexOf(booking.status);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold font-headline mb-2">Tracking Your Service</h1>
            <p className="text-muted-foreground mb-6">Booking ID: {booking.id}</p>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border shadow-lg">
            <MapComponent
              center={booking.customerLocation}
              markers={partnerLocation ? [partnerLocation, booking.customerLocation] : [booking.customerLocation]}
              zoom={13}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                {bookingStatuses.map((status, index) => (
                  <div key={status} className="flex items-start pb-8">
                    <div className="absolute left-0 flex flex-col items-center">
                        <div className={cn(
                            "flex items-center justify-center h-12 w-12 rounded-full",
                            index <= currentStatusIndex ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                            {statusIcons[status as keyof typeof statusIcons] || <Dot />}
                        </div>
                       {index < bookingStatuses.length - 1 && <div className={cn("w-0.5 h-8 mt-1", index < currentStatusIndex ? "bg-primary" : "bg-border")}></div>}
                    </div>
                    <div className="ml-8">
                        <h3 className={cn("font-semibold", index <= currentStatusIndex ? "text-foreground" : "text-muted-foreground")}>{status}</h3>
                        <p className="text-sm text-muted-foreground">
                            {index === currentStatusIndex && `Current status as of ${new Date().toLocaleTimeString()}`}
                             {index < currentStatusIndex && `Completed`}
                        </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {booking.partner ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Partner</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={booking.partner.avatarUrl} />
                  <AvatarFallback>{booking.partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{booking.partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{booking.partner.serviceCategory}</p>
                  <p className="text-sm font-semibold text-primary">Rating: {booking.partner.rating}/5</p>
                </div>
                 <Button variant="outline" className="ml-auto">Contact</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
                <CardHeader>
                    <CardTitle>Finding a Partner</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">We are currently searching for the best-rated available partner for you. You will be notified once someone accepts.</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
