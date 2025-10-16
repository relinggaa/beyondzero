import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";


export default function SidebarAdmin({ activePage, setActivePage, admin }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/admin",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                </svg>
            )
        },
        {
            id: "tambah-psikolog",
            label: "Data Psikolog",
            href: "/admin/tambah-psikolog",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            )
        },
        {
            id: "data-user",
            label: "Data User",
            href: "/admin/data-user",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className={`bg-slate-800 min-h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg">Admin Panel</h2>
                                <p className="text-cyan-400 text-xs">BeyondMind</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h3 className="text-white font-semibold">{admin?.username || 'Admin'}</h3>
                            <p className="text-slate-400 text-sm">Administrator</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 flex-1">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                activePage === item.id
                                    ? 'bg-gradient-to-r from-cyan-400/20 to-teal-500/20 border-l-4 border-cyan-400 text-cyan-400'
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            <span className={`${activePage === item.id ? 'text-cyan-400' : 'text-slate-400'}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {!isCollapsed && (
                        <span className="font-medium">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
}