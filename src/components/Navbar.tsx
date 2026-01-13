"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Laborers', href: '/services/Laborer' },
        { name: 'Halwai', href: '/services/Halwai' },
        { name: 'Barber', href: '/services/Barber' },
        { name: 'Provider Panel', href: '/dashboard/provider' },
    ];

    return (
        <nav className="bg-[#003366] text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-2xl tracking-wider hover:text-[#00A896] transition-colors">
                            PrayagServe
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href
                                            ? 'bg-[#002244] text-[#00A896]'
                                            : 'hover:bg-[#004080] hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                className="bg-[#00A896] hover:bg-[#008f80] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Login
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-[#004080] inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-[#003366] focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-[#002855]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#004080] hover:text-[#00A896] transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#00A896] hover:bg-[#008f80] text-white mt-4"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
