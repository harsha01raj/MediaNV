/* eslint-disable react-hooks/set-state-in-effect */
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Mail, Lock, User, LogOut, Search, Home, ListChecks, MessageSquare, ClipboardList } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/apiAddress";
import { useRouter } from "next/navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function StudentDashboard() {
    const [user, setUser] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [searchRoll, setSearchRoll] = useState("");
    const [marks, setMarks] = useState<any>(null);
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [activeTab, setActiveTab] = useState<"dashboard" | "students" | "marks" | "profile">("dashboard");
    const [allMarks, setAllMarks] = useState<any[]>([]);
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
            const res = await api.get(`/student`);
            setStudents(res.data.Students);
            // console.log(res.data.Students);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to fetch students");
        }
    };

    // Search student by roll number
    const handleSearch = async () => {
        if (!searchRoll) return toast.error("Enter roll number to search");
        try {
            const res = await api.get(`/marks/roll/${searchRoll}`);
            setMarks(res.data.Marks);
            // console.log(res.data);
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

    const fetchAllMarks = async () => {
        try {
            const res = await api.get("/marks");

            const rawMarks = res.data.Marks;

            const grouped = Object.values(
                rawMarks.reduce((acc: any, item: any) => {
                    const rollNo = item.student.roll_no;

                    if (!acc[rollNo]) {
                        acc[rollNo] = {
                            roll_no: rollNo,
                            marks: [],
                        };
                    }

                    acc[rollNo].marks.push({
                        subject: item.subject,
                        marks: item.marks,
                    });

                    return acc;
                }, {})
            );

            setAllMarks(grouped);
        } catch (err) {
            toast.error("Failed to fetch marks");
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
        fetchClassStudents();
        fetchAllMarks();
    }, []);
    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        fetchClassStudents();
    }, [user]);

    useEffect(() => {
        if (activeTab === "marks" && !marks) {
            fetchAllMarks();
        }
    }, [activeTab]);

    // Total students
    const totalStudents = students.length;

    // Total subjects
    const totalSubjects = new Set(
        allMarks.flatMap((s) => s.marks.map((m: any) => m.subject))
    ).size;

    // Average marks
    const avgMarks =
        allMarks.length > 0
            ? Math.round(
                allMarks.reduce(
                    (sum, s) =>
                        sum +
                        s.marks.reduce((a: number, m: any) => a + m.marks, 0),
                    0
                ) /
                allMarks.reduce((c, s) => c + s.marks.length, 0)
            )
            : 0;

    const dashboardStats = [
        { name: "Students", value: totalStudents },
        { name: "Subjects", value: totalSubjects },
    ];

    const marksGraphData = allMarks.map((s) => ({
        rollNo: `Roll ${s.roll_no}`,
        total: s.marks.reduce((sum: number, m: any) => sum + m.marks, 0),
    }));

    const COLORS = ["#8b5cf6", "#22c55e", "#facc15"];

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
                            <p className="font-semibold text-lg capitalize">{user?.username}</p>
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
                    <div className="space-y-6">

                        <h1 className="text-2xl font-bold">
                            Welcome, {user?.username}
                        </h1>

                        {/* STAT CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                <p className="text-slate-400">Total Students</p>
                                <p className="text-3xl font-bold text-purple-400">
                                    {totalStudents}
                                </p>
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                <p className="text-slate-400">Total Subjects</p>
                                <p className="text-3xl font-bold text-green-400">
                                    {totalSubjects}
                                </p>
                            </div>

                            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                <p className="text-slate-400">Average Marks</p>
                                <p className="text-3xl font-bold text-yellow-400">
                                    {avgMarks}%
                                </p>
                            </div>
                        </div>

                        {/* GRAPHS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* BAR CHART */}
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                <h2 className="font-semibold mb-4">Marks by Roll No</h2>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={marksGraphData}>
                                        <XAxis dataKey="rollNo" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="total" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* PIE CHART */}
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                <h2 className="font-semibold mb-4">Class Overview</h2>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={dashboardStats}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            outerRadius={90}
                                        >
                                            {dashboardStats.map((_, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                        </div>
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
                                            <td className="px-4 py-2">{s.user.username
                                                ? s.user.username.charAt(0).toUpperCase() + s.user.username.slice(1)
                                                : ""}</td>
                                            <td className="px-4 py-2">{s.user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "marks" && (
                    <div>
                        {/* Search */}
                        <div className="flex gap-2 items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search by Roll No"
                                className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-white/10"
                                value={searchRoll}
                                onChange={(e) => setSearchRoll(e.target.value)}
                            />
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-purple-600 rounded-xl"
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        {/* 🔍 SEARCH RESULT */}
                        {marks && (
                            <div className="bg-slate-800/50 p-4 rounded-xl mb-4">
                                <h2 className="font-bold mb-2">Roll No: {marks.roll_no}</h2>
                                {marks.marks.map((sub: any, idx: number) => (
                                    <div key={idx} className="flex justify-between border-b py-1">
                                        <span className="capitalize">{sub.subject}</span>
                                        <span>{sub.marks}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 📋 ALL MARKS (DEFAULT) */}
                        {!marks &&
                            allMarks.map((st: any) => (
                                <div
                                    key={st.roll_no}
                                    className="bg-slate-800/50 p-4 rounded-xl mb-4"
                                >
                                    <h2 className="font-bold mb-2">Roll No: {st.roll_no}</h2>
                                    {st.marks.map((sub: any, idx: number) => (
                                        <div key={idx} className="flex justify-between border-b py-1">
                                            <span className="capitalize">{sub.subject}</span>
                                            <span>{sub.marks}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                )}

                {/* PROFILE */}
                {activeTab === "profile" && user && (
                    <div className="min-h-[85vh] flex items-center justify-center">
                        <div className="w-full max-w-4xl bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">

                            {/* HEADER / COVER */}
                            <div className="relative h-40 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600">
                                <div className="absolute -bottom-14 left-8 flex items-center gap-4">
                                    <div className="w-28 h-28 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-4xl font-bold">
                                        {user.username?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="mt-10">
                                        <h2 className="text-2xl font-bold capitalize">{user.username}</h2>
                                        <p className="text-sm text-slate-300 capitalize">{user.role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* BODY */}
                            <div className="pt-20 px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* INFO CARD */}
                                <div className="bg-slate-900/60 rounded-xl p-6 border border-white/10">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <User size={18} className="text-purple-400" />
                                        Profile Information
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <User size={16} className="text-slate-400" />
                                            <span className="text-slate-400">Username:</span>
                                            <span className="font-medium capitalize">{user.username}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Search size={16} className="text-slate-400" />
                                            <span className="text-slate-400">Email:</span>
                                            <span className="font-medium">{user.email}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <ClipboardList size={16} className="text-slate-400" />
                                            <span className="text-slate-400">Role:</span>
                                            <span className="font-medium capitalize">{user.role}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* STATS / EXTRA */}
                                {/* STATS / EXTRA */}
                                <div className="bg-slate-900/60 rounded-xl p-6 border border-white/10">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <BarChart size={18} className="text-green-400" />
                                        Academic Overview
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">

                                        {/* Roll No */}
                                        <div className="bg-slate-800 rounded-xl p-4 text-center">
                                            <p className="text-sm text-slate-400">Roll No</p>
                                            <p className="text-xl font-bold text-purple-400">
                                                {allMarks?.[0]?.roll_no || "-"}
                                            </p>
                                        </div>

                                        {/* Subjects */}
                                        <div className="bg-slate-800 rounded-xl p-4 text-center">
                                            <p className="text-sm text-slate-400">Subjects</p>
                                            <p className="text-xl font-bold text-green-400">
                                                {totalSubjects}
                                            </p>
                                        </div>

                                        {/* Average Marks */}
                                        <div className="bg-slate-800 rounded-xl p-4 text-center col-span-2">
                                            <p className="text-sm text-slate-400">Average Marks</p>
                                            <p className="text-2xl font-bold text-yellow-400">
                                                {avgMarks}%
                                            </p>
                                        </div>

                                    </div>

                                    {/* PERFORMANCE TAG */}
                                    <div className="mt-6 text-center">
                                        {avgMarks >= 75 ? (
                                            <span className="px-4 py-2 rounded-full bg-green-600/20 text-green-400 text-sm font-semibold">
                                                🌟 Excellent Performance
                                            </span>
                                        ) : avgMarks >= 40 ? (
                                            <span className="px-4 py-2 rounded-full bg-yellow-600/20 text-yellow-400 text-sm font-semibold">
                                                👍 Good Progress
                                            </span>
                                        ) : (
                                            <span className="px-4 py-2 rounded-full bg-red-600/20 text-red-400 text-sm font-semibold">
                                                ⚠ Needs Improvement
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-400 mt-6 text-center">
                                        Academic data is updated by teachers.
                                    </p>
                                </div>
                            </div>
                        </div>
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