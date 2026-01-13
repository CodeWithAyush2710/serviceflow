"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState<'customer' | 'provider'>('customer');
    const [formData, setFormData] = useState({
        mobile: '',
        password: '', // simulating OTP
        name: '',
        location: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: isLogin ? 'login' : 'signup',
                    ...formData,
                    role: isLogin ? undefined : role, // Role only needed for signup usually, but let's keep it simple
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (data.success) {
                // Store user in localStorage for MVP session management
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect based on role (fetched from user object if login, or state if signup)
                const userRole = data.user?.role || role;
                if (userRole === 'provider') {
                    router.push('/dashboard/provider');
                } else {
                    router.push('/dashboard/customer');
                }
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#003366]">
                            {isLogin ? 'Sign in to your account' : 'Create a new account'}
                        </h2>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-4 py-2 rounded-md transition-colors ${isLogin ? 'bg-[#003366] text-white' : 'text-gray-500 hover:text-[#003366]'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-4 py-2 rounded-md transition-colors ${!isLogin ? 'bg-[#003366] text-white' : 'text-gray-500 hover:text-[#003366]'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {!isLogin && (
                        <div className="flex justify-center space-x-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setRole('customer')}
                                className={`px-4 py-2 border rounded-md ${role === 'customer'
                                    ? 'bg-[#E0F2F1] border-[#00A896] text-[#00A896]'
                                    : 'border-gray-300 text-gray-500'
                                    }`}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('provider')}
                                className={`px-4 py-2 border rounded-md ${role === 'provider'
                                    ? 'bg-[#E0F2F1] border-[#00A896] text-[#00A896]'
                                    : 'border-gray-300 text-gray-500'
                                    }`}
                            >
                                Provider
                            </button>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            {!isLogin && (
                                <div>
                                    <input
                                        type="text"
                                        required={!isLogin}
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#00A896] focus:border-[#00A896] focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            )}
                            <div>
                                <input
                                    type="text"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#00A896] focus:border-[#00A896] focus:z-10 sm:text-sm ${isLogin ? 'rounded-t-md' : ''
                                        }`}
                                    placeholder="Mobile Number or Username"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#00A896] focus:border-[#00A896] focus:z-10 sm:text-sm"
                                    placeholder={isLogin ? "Password" : "Create Password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00A896] hover:bg-[#008f80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A896]"
                            >
                                {isLogin ? 'Sign in' : 'Start Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
