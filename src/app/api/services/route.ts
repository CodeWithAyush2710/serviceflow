import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

export async function GET(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type');

        let query = {};
        if (type) {
            query = { type };
        }

        const services = await Service.find(query);
        return NextResponse.json({ success: true, services });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json({ success: true, service });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
