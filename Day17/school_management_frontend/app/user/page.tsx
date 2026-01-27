/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from "react";
import { Lock, Mail, LogOut, User } from "lucide-react";
import api from "../utils/apiAddress";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoute";

export default function UserDashboard() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    // Fetch user profile
    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/me"); // adjust path if needed
            setUser(res.data.user);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch profile");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Logout
    const handleLogout = async () => {
        try {
            await api.post("/auth/logout"); // backend should clear cookie
            toast.success("Logged out successfully");
            router.push("/auth");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Logout failed");
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex bg-[#0f172a] text-white">
                {/* Sidebar */}
                <div className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold">
                                {user?.username?.[0] || "U"}
                            </div>
                            <div>
                                <p className="font-semibold text-lg">{user?.username || "User"}</p>
                                <p className="text-sm text-slate-400 truncate">{user?.email || "user@example.com"}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-purple-600/20 transition">
                                <User size={18} /> Profile Management
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg justify-center font-semibold transition"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 md:p-12 flex flex-col gap-6">
                    <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg shadow-purple-500/20">
                        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.username || "User"}!</h1>
                        <p className="text-slate-300">
                            Till now you are pending to approve by admin.
                        </p>
                    </div>

                    {/* Profile card */}
                    {/* Profile Card */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
  p-8 rounded-3xl border border-white/10 shadow-xl shadow-purple-500/20">

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-purple-600/10 blur-3xl" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col gap-6">

                            {/* Header */}
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 
        flex items-center justify-center text-3xl font-bold shadow-lg">
                                    {user?.username?.[0]?.toUpperCase()}
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold capitalize">{user?.username}</h2>
                                    <p className="text-sm text-slate-400">{user?.email}</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/10" />

                            {/* Info Rows */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                {/* Email */}
                                <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-white/10">
                                    <Mail className="text-purple-400" size={20} />
                                    <div>
                                        <p className="text-xs text-slate-400">Email</p>
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl border border-white/10">
                                    <Lock className="text-red-400" size={20} />
                                    <div>
                                        <p className="text-xs text-slate-400">Password</p>
                                        <p className="font-medium tracking-widest">••••••••</p>
                                    </div>
                                </div>

                            </div>

                            {/* Footer Note */}
                            <p className="text-xs text-slate-400 text-center">
                                Profile details are protected and managed securely.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </ProtectedRoute>
    );
}