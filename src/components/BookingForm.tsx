"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
    serviceType: 'Laborer' | 'Halwai' | 'Barber';
}

export default function BookingForm({ serviceType }: BookingFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        date: '',
        duration: 1, // days or shifts
        address: '',
        description: '',
        insurance: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // In a real app, we'd get this from context/auth
    const [userId, setUserId] = useState<string | null>(null);

    const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let customerId = "65a123bcde45678901234567"; // Fallback mock ID

    if (storedUserStr) {
        try {
            const storedUser = JSON.parse(storedUserStr);
            if (storedUser._id) {
                customerId = storedUser._id;
            }
        } catch (e) {
            console.error("Failed to parse user", e);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock auth check - assuming we saved it in localStorage for MVP
        // If not, we should redirect to login. 
        // For now, let's assume we can book without auth or link it later? 
        // No, prompt requires auth. Let's assume a hardcoded or stored user for now.
        // But since we can't easily access localStorage in SSR initial render, we do it in useEffect or event.

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer: customerId, // Should come from Auth
                    serviceType,
                    date: formData.date,
                    status: 'pending',
                    amount: calculatePrice(),
                    paymentStatus: 'pending',
                    description: formData.description,
                    address: formData.address,
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Booking failed');

            router.push('/dashboard/customer'); // Redirect to dashboard
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculatePrice = () => {
        // Basic logic based on prompt
        let base = 0;
        if (serviceType === 'Laborer') base = 500 * formData.duration;
        if (serviceType === 'Halwai') base = 1000 * formData.duration;
        if (serviceType === 'Barber') base = 250; // flat visit
        return base + (formData.insurance ? 20 : 0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-[#003366] mb-4">Book {serviceType}</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00A896] focus:border-[#00A896]"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
            </div>

            {serviceType !== 'Barber' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Duration ({serviceType === 'Halwai' ? 'Shifts' : 'Days'})</label>
                    <input
                        type="number"
                        min="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00A896] focus:border-[#00A896]"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">Location / Address</label>
                <textarea
                    required
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00A896] focus:border-[#00A896]"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Requirements / Description</label>
                <textarea
                    rows={2}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00A896] focus:border-[#00A896]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="flex items-center">
                <input
                    id="insurance"
                    type="checkbox"
                    className="h-4 w-4 text-[#00A896] focus:ring-[#00A896] border-gray-300 rounded"
                    checked={formData.insurance}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.checked })}
                />
                <label htmlFor="insurance" className="ml-2 block text-sm text-gray-900">
                    Add Insurance (+₹20)
                </label>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-lg font-bold text-[#003366]">Total: ₹{calculatePrice()}</div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#003366] hover:bg-[#002244] text-white py-2 px-6 rounded-md font-semibold transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
    );
}
