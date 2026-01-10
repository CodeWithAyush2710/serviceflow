'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { partners, bookings, earningsData } from "@/lib/data";
import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, DollarSign, Users, Wrench } from "lucide-react";

const currentPartner = partners[0];

export default function PartnerDashboard() {
  const upcomingBookings = bookings.filter(b => (b.status === 'Accepted' || b.status === 'In-Route') && b.partnerId === currentPartner.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome, {currentPartner.name}!</h1>
          <p className="text-muted-foreground">Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="online-status" checked={currentPartner.isOnline} />
          <label htmlFor="online-status" className="font-medium">{currentPartner.isOnline ? "Online" : "Offline"}</label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPartner.rating}/5.0</div>
            <p className="text-xs text-muted-foreground">Across all completed jobs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Weekly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                    <AreaChart data={earningsData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area dataKey="revenue" type="natural" fill="var(--color-primary)" fillOpacity={0.4} stroke="var(--color-primary)" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>You have {upcomingBookings.length} upcoming jobs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map(booking => (
                <div key={booking.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${booking.customerId}`} alt="Avatar" />
                    <AvatarFallback>{booking.customerId.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{booking.serviceCategory} Request</p>
                    <p className="text-sm text-muted-foreground">Due: {format(booking.createdAt, "PPpp")}</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="ml-auto">
                    <Link href={`/booking/${booking.id}/track`}>
                      Track
                    </Link>
                  </Button>
                </div>
              ))}
              {upcomingBookings.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No upcoming bookings.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
