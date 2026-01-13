import BookingForm from '@/components/BookingForm';

// In Next.js App Router, params are passed as props to the page component
// But for client components inside it or if we make this async, we handle it differently.
// Let's make it a server component that passes params to client form or just use it directly.
// Note: params is a Promise in latest Next.js versions often, but usually just props in slightly older 13/14.
// Let's assume standard props handling for now.

export default async function ServiceBookingPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;

    // Basic validation of type
    const validTypes = ['Laborer', 'Halwai', 'Barber'];
    const serviceType = validTypes.includes(type) ? type as 'Laborer' | 'Halwai' | 'Barber' : 'Laborer';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-bold text-[#003366] mb-6">{serviceType} Service</h1>
                        <div className="prose text-gray-600">
                            <p className="text-lg mb-4">
                                {serviceType === 'Laborer' && "Find skilled daily wage laborers, masons, and helpers for your construction or shifting needs."}
                                {serviceType === 'Halwai' && "Book professional cooks for your events, parties, or restaurant staffing needs."}
                                {serviceType === 'Barber' && "Get professional grooming services delivered to your doorstep with hygiene assurance."}
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Verified Professionals</li>
                                <li>Fair & Transparent Pricing</li>
                                <li>On-time Service Guarantee</li>
                                <li>Insurance Cover Available</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <BookingForm serviceType={serviceType} />
                    </div>
                </div>
            </div>
        </div>
    );
}
