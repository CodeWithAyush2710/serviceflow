export default function CustomerDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#003366] mb-8">Customer Dashboard</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <p className="text-gray-500">Welcome back! Manage your bookings and subscriptions here.</p>
                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <h3 className="text-lg font-medium text-gray-900">Your Bookings</h3>
                        <p className="mt-2 text-sm text-gray-500">No active bookings found.</p>
                        {/* Future: Map through bookings from API */}
                    </div>
                </div>
            </div>
        </div>
    );
}
