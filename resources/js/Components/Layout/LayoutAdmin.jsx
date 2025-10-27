import React, { useState, useEffect } from "react";
import SidebarAdmin from "../SidebarAdmin";

export default function LayoutAdmin({ children, admin }) {
    const [activePage, setActivePage] = useState("dashboard");

    // Set active page based on current URL
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin/tambah-psikolog')) {
            setActivePage("tambah-psikolog");
        } else if (currentPath.includes('/admin/data-user')) {
            setActivePage("data-user");
        } else if (currentPath.includes('/admin')) {
            setActivePage("dashboard");
        }
    }, []);

    return (
        <div className="min-h-screen bg-black flex">
            <SidebarAdmin activePage={activePage} setActivePage={setActivePage} admin={admin} />
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-black border-b border-white/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {activePage === "dashboard" && "Dashboard"}
                                {activePage === "tambah-psikolog" && "Data Psikolog"}
                                {activePage === "data-user" && "Data User"}
                            </h1>
                            <p className="text-white/70 text-sm">
                                {activePage === "dashboard" && "Overview sistem dan statistik"}
                                {activePage === "tambah-psikolog" && "Kelola data psikolog dan tambahkan psikolog baru ke sistem"}
                                {activePage === "data-user" && "Kelola data pengguna"}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                                </svg>
                            </button>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-black font-semibold text-sm">SC</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
