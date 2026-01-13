export default function ProviderDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[#003366] mb-8">Provider Dashboard</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <p className="text-gray-500">Welcome back! View available jobs and manage your schedule.</p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#E0F2F1] p-4 rounded-lg">
                            <h3 className="font-bold text-[#00A896]">Earnings</h3>
                            <p className="text-2xl font-semibold">₹ 0.00</p>
                        </div>
                        <div className="bg-[#E0F7FA] p-4 rounded-lg">
                            <h3 className="font-bold text-[#00A896]">Active Jobs</h3>
                            <p className="text-2xl font-semibold">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
