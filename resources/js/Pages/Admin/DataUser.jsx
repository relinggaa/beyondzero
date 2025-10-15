import React, { useState } from "react";
import { router } from "@inertiajs/react";
import LayoutAdmin from "../../Components/Layout/LayoutAdmin";

export default function DataUser({ admin, users }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Debug: Log users data
    console.log('Users data:', users);
    console.log('Filter status:', filterStatus);


    const filteredUsers = users?.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.username.toLowerCase().includes(searchTerm.toLowerCase());
        
        let matchesStatus = true;
        if (filterStatus === "active") {
            matchesStatus = user.is_active === true || user.is_active === 1;
        } else if (filterStatus === "inactive") {
            matchesStatus = user.is_active === false || user.is_active === 0;
        }
        
        console.log(`User ${user.name}: is_active=${user.is_active}, filterStatus=${filterStatus}, matchesStatus=${matchesStatus}`);
        
        return matchesSearch && matchesStatus;
    }) || [];

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(user => user.id));
        }
    };

    const handleToggleStatus = (userId) => {
        router.post(`/admin/user/${userId}/toggle-status`, {}, {
            onSuccess: () => {
                // Refresh the page to get updated data
                window.location.reload();
            }
        });
    };

    const handleDeleteUser = (userId) => {
        if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
            router.delete(`/admin/user/${userId}`, {
                onSuccess: () => {
                    // Refresh the page to get updated data
                    window.location.reload();
                }
            });
        }
    };


    return (
        <LayoutAdmin admin={admin}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Data User</h2>
                        <p className="text-slate-600 mt-1">Kelola dan pantau pengguna sistem</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                        <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg hover:from-cyan-500 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Tambah User</span>
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Cari nama atau email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Bergabung</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Terakhir Aktif</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Sesi</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                                className="w-4 h-4 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800">{user.name}</p>
                                                    <p className="text-sm text-slate-600">{user.email}</p>
                                                    <p className="text-xs text-slate-500">@{user.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                user.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.is_active ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {new Date(user.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {new Date(user.updated_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            -
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button 
                                                    onClick={() => handleToggleStatus(user.id)}
                                                    className={`p-2 transition-colors ${
                                                        user.is_active 
                                                            ? 'text-slate-400 hover:text-yellow-600' 
                                                            : 'text-slate-400 hover:text-green-600'
                                                    }`}
                                                    title={user.is_active ? 'Nonaktifkan User' : 'Aktifkan User'}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Hapus User"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">
                        Menampilkan {filteredUsers.length} dari {users.length} user
                    </p>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            Sebelumnya
                        </button>
                        <button className="px-3 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-lg">
                            1
                        </button>
                        <button className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            2
                        </button>
                        <button className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    );
}
