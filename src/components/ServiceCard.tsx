"use client";
import React from 'react';
import Link from 'next/link';
import { Hammer, ChefHat, Scissors, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
    type: 'Laborer' | 'Halwai' | 'Barber';
    description: string;
    price: string;
    link: string;
}

const icons = {
    Laborer: Hammer,
    Halwai: ChefHat,
    Barber: Scissors,
};

const ServiceCard: React.FC<ServiceCardProps> = ({ type, description, price, link }) => {
    const Icon = icons[type] || Hammer;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
            <div className="p-6 flex-grow">
                <div className="w-14 h-14 bg-[#E0F2F1] rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-[#00A896]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-2">{type} Services</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm font-semibold text-[#00A896]">{price}</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <Link href={link} className="flex items-center text-[#003366] font-medium hover:text-[#00A896] transition-colors group">
                    Book Now <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
