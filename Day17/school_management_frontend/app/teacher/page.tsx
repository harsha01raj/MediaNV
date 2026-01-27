/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
    Home, ListChecks, User, LogOut, Search, CalendarCheck, ClipboardList, BookOpen, MessageSquare
} from "lucide-react";
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
    Cell
} from "recharts";
import ProtectedRoute from "../components/ProtectedRoute";

export default function TeacherDashboard() {
    const [user, setUser] = useState<any>(null);
    const [students, setStudents] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [marks, setMarks] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [showAttendanceModal, setShowAttendanceModal] = useState(false);
    const [editingAttendance, setEditingAttendance] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<
        "dashboard" | "students" | "marks" | "attendance" | "classes" | "profile" | "messages"
    >("dashboard");
    const [allMarks, setAllMarks] = useState<any[]>([]);
    const [attRollNo, setAttRollNo] = useState<number | "">("");
    const [attDate, setAttDate] = useState("");
    const [attStatus, setAttStatus] = useState("PRESENT");
    const router = useRouter();
    useEffect(() => {
        if (editingAttendance) {
            setAttRollNo(editingAttendance.student?.roll_no || "");
            setAttDate(editingAttendance.attendance_date || "");
            setAttStatus(editingAttendance.status || "PRESENT");
        } else {
            setAttRollNo("");
            setAttDate("");
            setAttStatus("PRESENT");
        }
    }, [editingAttendance]);

    const handleAddOrUpdateAttendance = async (data: any) => {
        try {
            // Find existing attendance for same roll_no + date
            const existing = attendance.find(
                (a) => a.student.roll_no === data.roll_no && a.attendance_date === data.attendance_date
            );

            if (existing) {
                // Update existing record instead of creating new
                await api.patch(`/attendance/${data.roll_no}/${data.attendance_date}`, {
                    ...data,
                });
                toast.success("Attendance updated for this date");
            } else {
                // Create new record
                await api.post("/attendance", data);
                toast.success("Attendance added");
            }

            setShowAttendanceModal(false);
            setEditingAttendance(null);
            fetchAllData(); // refresh attendance
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed");
        }
    };

    const handleSubmitAttendance = () => {
        const data = {
            roll_no: attRollNo,
            attendance_date: attDate,
            status: attStatus,
        };
        handleAddOrUpdateAttendance(data);
    };
    // ---------------- EDIT ----------------
    const handleEditAttendance = (attendanceRecord: any) => {
        setEditingAttendance(attendanceRecord);
        setShowAttendanceModal(true);
    };

    // ---------------- DELETE ----------------
    const handleDeleteAttendance = async (attendanceRecord: any) => {
        try {
            await api.delete(`/attendance/${attendanceRecord.id}`);
            toast.success("Attendance deleted");
            fetchAllData(); // refresh attendance
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to delete");
        }
    };


    const fetchProfile = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch (err: any) {
            toast.error("Failed to fetch profile");
        }
    };

    const fetchAllData = async () => {
        try {
            const [studentsRes, classesRes, marksRes, attendanceRes] = await Promise.all([
                api.get("/student"),
                api.get("/classes"),
                api.get("/marks"),
                api.get("/attendance/all"),
            ]);
            setStudents(studentsRes.data.Students);
            // console.log(studentsRes.data);
            setClasses(classesRes.data.class);
            // console.log(classesRes.data);
            setAllMarks(marksRes.data.Marks || []);
            // console.log(marksRes.data.Marks)
            setAttendance(attendanceRes.data.
                fetchedAttendance || []);
            console.log("Attendance", attendanceRes.data);
        } catch {
            toast.error("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchAllData();
    }, []);

    const totalStudents = students?.length || 0;
    const totalClasses = classes?.length || 0;

    const groupedMarks = allMarks.reduce((acc: any, item: any) => {
        const roll = item.student?.roll_no;
        if (!acc[roll]) {
            acc[roll] = [];
        }
        acc[roll].push(item);
        return acc;
    }, {});
    const avgMarks =
        allMarks.length > 0
            ? Math.round(allMarks.reduce((sum: number, m: any) => sum + m.marks, 0) / allMarks.length)
            : 0;

    const dashboardStats = [
        { name: "Students", value: totalStudents },
        { name: "Classes", value: totalClasses },
    ];

    const marksGraphData = (allMarks || []).map((s) => ({
        rollNo: `Roll ${s.student.roll_no}`,
        total: Array.isArray(s.marks)
            ? s.marks.reduce((sum: number, m: any) => sum + m.marks, 0)
            : 0,
    }));

    const COLORS = ["#8b5cf6", "#22c55e", "#facc15"];

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            toast.success("Logged out successfully");
            router.push("/auth");
        } catch {
            toast.error("Logout failed");
        }
    };
    if (!students || !classes || !allMarks) {
        return <p className="text-white">Loading dashboard...</p>;
    }

    // console.log("Classes",classes)
    return (
        <ProtectedRoute>
            <div className="min-h-screen flex bg-[#0f172a] text-white">
                {/* Sidebar */}
                <div className="w-64 bg-slate-900/60 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold">
                                {user?.username?.[0] || "T"}
                            </div>
                            <div>
                                <p className="font-semibold">{user?.username}</p>
                                <p className="text-sm text-slate-400">{user?.email}</p>
                            </div>
                        </div>

                        {/* Sidebar Menu */}
                        {[
                            ["dashboard", Home],
                            ["students", ListChecks],
                            ["marks", BookOpen],
                            ["attendance", CalendarCheck],
                            ["classes", ClipboardList],
                            ["profile", User],
                            ["messages", MessageSquare]
                        ].map(([tab, Icon]: any) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg mb-2 ${activeTab === tab ? "bg-purple-600/20" : "hover:bg-purple-600/10"}`}
                            >
                                <Icon size={18} /> {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 bg-red-600 rounded-lg justify-center"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-10">
                    {/* DASHBOARD */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <p className="text-slate-400">Total Students</p>
                                    <p className="text-3xl font-bold text-purple-400">{totalStudents}</p>
                                </div>
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <p className="text-slate-400">Total Classes</p>
                                    <p className="text-3xl font-bold text-green-400">{totalClasses}</p>
                                </div>
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <p className="text-slate-400">Average Marks</p>
                                    <p className="text-3xl font-bold text-yellow-400">{avgMarks}%</p>
                                </div>
                            </div>

                            {/* GRAPHS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <h2 className="font-semibold mb-4">Marks by Roll No</h2>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={marksGraphData}>
                                            <XAxis dataKey="rollNo" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="total" fill="#8b5cf6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

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

                    {/* STUDENTS CRUD */}
                    {activeTab === "students" && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold text-xl mb-4">Manage Students</h2>

                            {/* ADD NEW STUDENT BUTTON */}
                            <button
                                onClick={() => setShowAddStudentModal(true)}
                                className="mb-4 px-4 py-2 bg-purple-600 rounded hover:opacity-90 transition"
                            >
                                Add New Student
                            </button>

                            {/* STUDENTS TABLE */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-4 py-2">Roll No</th>
                                            <th className="px-4 py-2">Name</th>
                                            <th className="px-4 py-2">Email</th>
                                            <th className="px-4 py-2">Class</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4 text-slate-400">
                                                    No students found
                                                </td>
                                            </tr>
                                        ) : (
                                            students.map((s) => (
                                                <tr
                                                    key={s.roll_no}
                                                    className="border-b border-white/10 hover:bg-purple-600/10"
                                                >
                                                    <td className="px-4 py-2">{s.roll_no}</td>
                                                    <td className="px-4 py-2">
                                                        {s.user.username
                                                            ? s.user.username.charAt(0).toUpperCase() +
                                                            s.user.username.slice(1)
                                                            : ""}
                                                    </td>
                                                    <td className="px-4 py-2">{s.user.email}</td>
                                                    <td className="px-4 py-2">{s.classRoom?.class_name || "-"}</td>
                                                    <td className="px-4 py-2 flex gap-2">
                                                        <button
                                                            onClick={() => handleEditStudent(s)}
                                                            className="px-2 py-1 bg-yellow-500 rounded hover:opacity-90 text-black"
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "marks" && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold mb-4">Manage Marks</h2>

                            {Object.keys(groupedMarks).length === 0 ? (
                                <p className="text-slate-400">No marks available</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="px-4 py-2">Roll No</th>
                                                <th className="px-4 py-2">Subject</th>
                                                <th className="px-4 py-2">Marks</th>
                                                <th className="px-4 py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(groupedMarks).map(([rollNo, subjects]: any) =>
                                                subjects.map((sub: any, idx: number) => (
                                                    <tr
                                                        key={sub.id}
                                                        className="border-b border-white/10 hover:bg-purple-600/10"
                                                    >
                                                        <td className="px-4 py-2">{rollNo}</td>
                                                        <td className="px-4 py-2 capitalize">{sub.subject}</td>
                                                        <td className="px-4 py-2">{sub.marks}</td>
                                                        <td className="px-4 py-2 flex gap-2">
                                                            <button
                                                                onClick={() => handleEditMark(sub)}
                                                                className="px-2 py-1 bg-yellow-500 rounded hover:opacity-90 text-black"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteMark(sub)}
                                                                className="px-2 py-1 bg-red-600 rounded hover:opacity-90"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ATTENDANCE CRUD */}
                    {activeTab === "attendance" && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold mb-4 text-xl">Manage Attendance</h2>

                            {/* Add Attendance Button */}
                            <button
                                onClick={() => setShowAttendanceModal(true)}
                                className="mb-4 px-4 py-2 bg-purple-600 rounded hover:opacity-90 transition"
                            >
                                Add Attendance
                            </button>

                            {/* Attendance Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-4 py-2">Roll No</th>
                                            <th className="px-4 py-2">Date</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendance.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-slate-400">
                                                    No attendance records found
                                                </td>
                                            </tr>
                                        ) : (
                                            attendance.map((a: any) => (
                                                <tr
                                                    key={`${a.student.roll_no}-${a.attendance_date}`}
                                                    className="border-b border-white/10 hover:bg-purple-600/10"
                                                >
                                                    <td className="px-4 py-2">{a.student.roll_no}</td>
                                                    <td className="px-4 py-2">{a.attendance_date}</td>
                                                    <td className="px-4 py-2">{a.status || "Pending"}</td>
                                                    <td className="px-4 py-2 flex gap-2">
                                                        <button
                                                            onClick={() => handleEditAttendance(a)}
                                                            className="px-2 py-1 bg-yellow-500 rounded hover:opacity-90 text-black"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAttendance(a)}
                                                            className="px-2 py-1 bg-red-600 rounded hover:opacity-90"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {showAttendanceModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-slate-800 p-6 rounded-xl w-96">
                                <h2 className="text-lg font-semibold mb-4">
                                    {editingAttendance ? "Edit Attendance" : "Add Attendance"}
                                </h2>

                                <input
                                    type="number"
                                    placeholder="Roll No"
                                    value={attRollNo}
                                    onChange={(e) => setAttRollNo(Number(e.target.value))}
                                    className="w-full mb-2 px-3 py-2 rounded bg-slate-700 text-white"
                                    disabled={!!editingAttendance}
                                />
                                <input
                                    type="date"
                                    value={attDate}
                                    onChange={(e) => setAttDate(e.target.value)}
                                    className="w-full mb-2 px-3 py-2 rounded bg-slate-700 text-white"
                                />
                                <select
                                    value={attStatus}
                                    onChange={(e) => setAttStatus(e.target.value)}
                                    className="w-full mb-2 px-3 py-2 rounded bg-slate-700 text-white"
                                >
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-500 rounded hover:opacity-90"
                                        onClick={() => {
                                            setShowAttendanceModal(false);
                                            setEditingAttendance(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-purple-600 rounded hover:opacity-90"
                                        onClick={handleSubmitAttendance}
                                    >
                                        {editingAttendance ? "Update" : "Add"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "classes" && (
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/10">
                            <h2 className="font-bold mb-4 text-lg">Classes</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="border-b border-white/10 text-gray-300">
                                        <tr>
                                            <th className="px-3 py-2">Class</th>
                                            <th className="px-3 py-2">Section</th>
                                            <th className="px-3 py-2">Teacher</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {classes?.length > 0 ? (
                                            classes.map((cls) => (
                                                <tr
                                                    key={cls.id}
                                                    className="border-b border-white/5 hover:bg-white/5 transition"
                                                >
                                                    <td className="px-3 py-2">{cls.class_name}</td>
                                                    <td className="px-3 py-2">{cls.section}</td>
                                                    <td className="px-3 py-2">{cls.teacher}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-gray-400">
                                                    No classes available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PROFILE */}
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
                                            <h2 className="text-2xl font-bold">{user.username}</h2>
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
                                                <span className="font-medium">{user.username}</span>
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
                                    <div className="bg-slate-900/60 rounded-xl p-6 border border-white/10">
                                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                                            <BarChart size={18} className="text-green-400" />
                                            Overview
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-slate-800 rounded-xl p-4 text-center">
                                                <p className="text-sm text-slate-400">Students</p>
                                                <p className="text-2xl font-bold text-purple-400">{students.length}</p>
                                            </div>

                                            <div className="bg-slate-800 rounded-xl p-4 text-center">
                                                <p className="text-sm text-slate-400">Classes</p>
                                                <p className="text-2xl font-bold text-green-400">{classes.length}</p>
                                            </div>
                                        </div>

                                        <p className="text-xs text-slate-400 mt-6">
                                            Profile details are managed by the administrator.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MESSAGES */}
                    {activeTab === "messages" && (
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                            <p className="text-green-400 font-semibold">No new notifications</p>
                        </div>
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
}