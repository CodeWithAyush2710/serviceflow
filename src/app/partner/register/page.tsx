import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceCategories } from "@/lib/data";
import { Wrench } from "lucide-react";
import Link from "next/link";

export default function PartnerRegistrationPage() {
  return (
    <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-2xl">
            <div className="flex flex-col items-center text-center mb-8">
                <Wrench className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-3xl font-bold tracking-tight font-headline">
                Become a ServiceFlow Partner
                </h2>
                <p className="text-md text-muted-foreground mt-2 max-w-lg">
                    Join our network of skilled professionals. Set your own rates, manage your schedule, and connect with clients in your area.
                </p>
            </div>
            <Card>
                <CardHeader>
                <CardTitle>Partner Registration</CardTitle>
                <CardDescription>
                    Fill out the form below to get started.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                    </div>
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="service-category">Primary Service</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceCategories.map(category => (
                                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hourly-rate">Your Hourly Rate ($)</Label>
                            <Input id="hourly-rate" type="number" placeholder="e.g., 60" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Create Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Button className="w-full max-w-xs">Join the Platform</Button>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Already a partner?{" "}
                        <Link href="/login" className="underline">
                        Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
