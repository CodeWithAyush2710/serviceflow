import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        // Validate required fields
        if (!body.customer || !body.serviceType || !body.date || !body.amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const booking = await Booking.create(body);

        // In a real app, we'd trigger a notification here

        return NextResponse.json({ success: true, booking });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const role = searchParams.get('role'); // 'customer' or 'provider'

        if (!userId || !role) {
            return NextResponse.json({ error: 'UserId and Role required' }, { status: 400 });
        }

        let query = {};
        if (role === 'customer') {
            query = { customer: userId };
        } else if (role === 'provider') {
            query = { provider: userId };
        }

        const bookings = await Booking.find(query).populate('customer').populate('provider').sort({ createdAt: -1 });
        return NextResponse.json({ success: true, bookings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
