'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Mail, Lock, User, LogOut, Search, Home, ListChecks, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/apiAddress";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [searchRoll, setSearchRoll] = useState("");
  const [marks, setMarks] = useState<any>(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard"|"students"|"marks"|"profile">("dashboard");
  const router = useRouter();

  // Fetch logged-in user
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
      setEditEmail(res.data.user.email);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch profile");
    }
  };

  // Fetch all students in class
  const fetchClassStudents = async () => {
    try {
      const res = await api.get(`/student/class/${user?.classId}`);
      setStudents(res.data.students);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch students");
    }
  };

  // Search student by roll number
  const handleSearch = async () => {
    if (!searchRoll) return toast.error("Enter roll number to search");
    try {
      const res = await api.get(`/student/roll/${searchRoll}`);
      setMarks(res.data.marks);
      toast.success("Marks fetched");
      setActiveTab("marks");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Student not found");
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      const res = await api.patch(`/user/${user.id}`, {
        email: editEmail,
        password: editPassword || undefined,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
      router.push("/auth");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user?.classId) fetchClassStudents();
  }, [user]);

  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold">
              {user?.username?.[0] || "S"}
            </div>
            <div>
              <p className="font-semibold text-lg">{user?.username}</p>
              <p className="text-sm text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/20 transition ${activeTab === "dashboard" ? "bg-purple-600/20" : ""}`}
            >
              <Home size={18} /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/20 transition ${activeTab === "students" ? "bg-purple-600/20" : ""}`}
            >
              <ListChecks size={18} /> Classmates
            </button>

            <button
              onClick={() => setActiveTab("marks")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/20 transition ${activeTab === "marks" ? "bg-purple-600/20" : ""}`}
            >
              <Search size={18} /> Marks
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/20 transition ${activeTab === "profile" ? "bg-purple-600/20" : ""}`}
            >
              <User size={18} /> Profile Management
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-600/20 transition ${activeTab === "messages" ? "bg-purple-600/20" : ""}`}
            >
              <MessageSquare size={18} /> Notifications
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg justify-center font-semibold transition mt-6"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 flex flex-col gap-6">

        {/* Pending Message */}
        {user?.status === "pending" && (
          <div className="bg-yellow-600/20 p-4 rounded-xl text-yellow-400 font-semibold">
            ⚡ Your <span className="text-purple-400">{user.role}</span> role is still awaiting admin approval.
          </div>
        )}

        {/* Tabs */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
            <p className="text-slate-300">Use the sidebar to navigate your dashboard features.</p>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 shadow-lg shadow-purple-500/20">
            <h2 className="font-bold text-lg mb-2">Students in your Class</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-2">Roll No</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.roll_no} className="border-b border-white/10 hover:bg-purple-600/10">
                      <td className="px-4 py-2">{s.roll_no}</td>
                      <td className="px-4 py-2">{s.username}</td>
                      <td className="px-4 py-2">{s.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "marks" && (
          <div>
            <div className="flex gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Search by Roll No"
                className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-purple-600 rounded-xl hover:opacity-90 transition"
              >
                <Search size={18} />
              </button>
            </div>

            {marks && (
              <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10 shadow-lg shadow-purple-500/20">
                <h2 className="font-bold text-lg mb-2">Marks for {marks?.studentName || searchRoll}</h2>
                {marks.subjects?.map((sub: any, idx: number) => (
                  <div key={idx} className="flex justify-between border-b border-white/10 py-1">
                    <span>{sub.subject}</span>
                    <span>{sub.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 shadow-lg shadow-purple-500/20 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Update Profile</h2>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-xl bg-slate-700 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="px-4 py-2 rounded-xl bg-slate-700 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <button
              onClick={handleUpdateProfile}
              className="px-4 py-2 bg-purple-600 rounded-xl hover:opacity-90 transition"
            >
              Update Profile
            </button>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 shadow-lg shadow-purple-500/20">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            {user?.status === "pending" ? (
              <p className="text-yellow-400 font-semibold">
                ⚡ Your <span className="text-purple-400">{user.role}</span> role is still awaiting admin approval.
              </p>
            ) : (
              <p className="text-green-400 font-semibold">You have no new notifications.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}