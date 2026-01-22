/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from "react";
import { Lock, Mail, LogOut, User } from "lucide-react";
import api from "../utils/apiAddress";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
        <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg shadow-purple-500/10 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <div className="flex items-center gap-4">
            <Lock size={18} />
            <p>Password: ********</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={18} />
            <p>Email: {user?.email}</p>
          </div>
        </div>

      </div>
    </div>
  );
}