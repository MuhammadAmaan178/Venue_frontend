import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const DashboardLayout = ({ children }) => {
    // Fallback if useAuth is not defined or user is not logged in
    const auth = useAuth ? useAuth() : {};
    const user = auth.user || { name: 'Owner' };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-50 min-h-screen relative">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`lg:hidden fixed top-4 z-[60] bg-white p-2 rounded-full shadow-lg text-slate-700 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'right-4' : 'left-4'}`}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 w-full lg:ml-72 p-4 lg:p-8">
                <Header userName={user.name || 'Owner'} />
                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
