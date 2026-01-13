import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { action, mobile, password, role, name, skills, location } = await req.json();

        if (action === 'signup') {
            const existingUser = await User.findOne({ mobile });
            if (existingUser) {
                return NextResponse.json({ error: 'User already exists' }, { status: 400 });
            }

            // In a real app with OTP, we wouldn't need a password, or we'd verify the token.
            // For this MVP without external keys, we use a simple password.
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                mobile,
                role, // 'customer' or 'provider'
                skills: skills || [],
                location: location || {},
                // storing password temporarily for MVP login simulation (schema update needed if strictly following)
                // Note: The User model didn't have password. I will mock auth validation or add it.
                // Let's assume for this "OTP" flow we just trust the input for now or add a password field.
                // Adding a virtual or extra field is tricky if not in schema. 
                // I will update schema or just use mobile for now as "identity" (unsafe but MVP).
                // BETTER: Let's simpler verify "otp" is "1234" for now.
            });

            return NextResponse.json({ success: true, user: newUser });
        } else if (action === 'login') {
            const user = await User.findOne({ mobile });
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            // Simulating OTP check
            if (password !== '1234') { // Mock OTP
                return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
            }

            return NextResponse.json({ success: true, user });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
