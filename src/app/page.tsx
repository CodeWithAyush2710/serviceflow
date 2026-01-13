import ServiceCard from '@/components/ServiceCard';
import { Search, MapPin } from 'lucide-react';

export default function Home() {
  const services = [
    {
      type: 'Laborer' as const,
      description: 'Skilled masons, helpers, and construction workers for your projects.',
      price: 'From ₹400/day',
      link: '/services/Laborer',
    },
    {
      type: 'Halwai' as const,
      description: 'Expert cooks for weddings, parties, and restaurant shifts.',
      price: 'From ₹800/shift',
      link: '/services/Halwai',
    },
    {
      type: 'Barber' as const,
      description: 'Professional grooming services at your doorstep.',
      price: 'From ₹150/visit',
      link: '/services/Barber',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="bg-[#003366] text-white py-20 px-4 sm:px-6 lg:px-8 bg-opacity-95 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#00A896] opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
            Trusted Helpers in Prayagraj & Pratapgarh
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Find reliable Laborers, Halwais, and Barbers for your home and business needs.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-lg shadow-lg max-w-2xl mx-auto flex items-center transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center px-4 border-r border-gray-200 w-1/3">
              <MapPin className="h-5 w-5 text-[#00A896] mr-2" />
              <select className="w-full bg-transparent text-gray-700 outline-none font-medium">
                <option>Prayagraj</option>
                <option>Pratapgarh</option>
                <option>Naini</option>
                <option>Bela</option>
              </select>
            </div>
            <div className="flex-grow flex items-center px-4">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for services..."
                className="w-full bg-transparent text-gray-700 outline-none"
              />
            </div>
            <button className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-3 rounded-md font-semibold transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-[#003366] mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Features/Trust Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-[#00A896] font-bold text-xl mb-2">Verified Providers</div>
              <p className="text-gray-600">Aadhaar verified professionals for your safety.</p>
            </div>
            <div className="p-6">
              <div className="text-[#00A896] font-bold text-xl mb-2">Fair Pricing</div>
              <p className="text-gray-600">Transparent rates with low commissions.</p>
            </div>
            <div className="p-6">
              <div className="text-[#00A896] font-bold text-xl mb-2">Instant Booking</div>
              <p className="text-gray-600">Book in seconds, get matched quickly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#002244] text-gray-300 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">PrayagServe</h3>
            <p className="text-sm">Empowering local workers, serving local needs.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Laborers</li>
              <li>Halwai</li>
              <li>Barber</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">support@prayagserve.com</p>
            <p className="text-sm">+91 98765 43210</p>
          </div>
        </div>
        <div className="text-center mt-10 text-xs border-t border-gray-700 pt-6">
          © 2026 PrayagServe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
