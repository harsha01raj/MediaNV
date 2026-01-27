'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
    Home,
    Users,
    GraduationCap,
    UserCheck,
    ClipboardList,
    BookOpen,
    CalendarCheck,
    User,
    LogOut,
    Mail,
    Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/apiAddress";
import { useRouter } from "next/navigation";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import ProtectedRoute from "../components/ProtectedRoute";

type AdminTab =
    | "dashboard"
    | "users"
    | "students"
    | "teachers"
    | "classes"
    | "marks"
    | "attendance"
    | "profile";

export default function AdminDashboard() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
    const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newRollNo, setNewRollNo] = useState<number>(0);
    const [newClassId, setNewClassId] = useState("");

    const [isCreateTeacherOpen, setIsCreateTeacherOpen] = useState(false);
    const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<any>(null);

    const [newTeacherUsername, setNewTeacherUsername] = useState("");
    const [newSubject, setNewSubject] = useState("");

    const [editSubject, setEditSubject] = useState("");

    const [user, setUser] = useState<any>();
    const [users, setUsers] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [marks, setMarks] = useState<any[]>([]);
    const [attendance, setAttendance] = useState<any[]>([]);
    const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<any>(null);
    const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
    const [isEditClassOpen, setIsEditClassOpen] = useState(false);

    const [newClassName, setNewClassName] = useState("");
    const [newSection, setNewSection] = useState("");

    const [editClass, setEditClass] = useState<any>(null);

    const [editRollNo, setEditRollNo] = useState<number>(0);
    const [editClassId, setEditClassId] = useState<string>("");

    /* ---------------- FETCH ALL DATA ---------------- */
    const fetchAllData = async () => {
        try {
            const [
                profileRes,
                usersRes,
                studentsRes,
                teachersRes,
                classesRes,
                marksRes,
                attendanceRes,
            ] = await Promise.all([
                api.get("/auth/me"),
                api.get("/user"),
                api.get("/student"),
                api.get("/teacher"),
                api.get("/classes"),
                api.get("/marks"),
                api.get("/attendance/all"),
            ]);

            setUser(profileRes.data.user);
            // console.log("User", profileRes.data);

            setUsers(usersRes.data.Users || []);
            //console.log("Users", usersRes.data.Users);
            setStudents(studentsRes.data.Students || []);
            //console.log("Student", studentsRes.data);
            setTeachers(teachersRes.data.Teachers || []);
            // console.log("Teacher", teachersRes.data);
            setClasses(classesRes.data.class || []);
            // console.log("Classes", classesRes.data);
            setMarks(marksRes.data.Marks || []);
            // console.log("Marks", marksRes.data);
            setAttendance(attendanceRes.data.fetchedAttendance || []);
            console.log("Attendance", attendanceRes.data);
        } catch (err) {
            console.log(err);
            toast.error("err.message");
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    /* ---------------- DASHBOARD STATS ---------------- */
    const totalUsers = users.length;
    const totalStudents = students.length;
    const totalTeachers = teachers.length;
    const totalClasses = classes.length;

    const avgMarks =
        marks.length > 0
            ? Math.round(marks.reduce((s, m) => s + m.marks, 0) / marks.length)
            : 0;

    const dashboardStats = [
        { name: "Users", value: totalUsers },
        { name: "Students", value: totalStudents },
        { name: "Teachers", value: totalTeachers },
    ];

    const COLORS = ["#8b5cf6", "#22c55e", "#facc15"];

    /* ---------------- ROLE UPDATE ---------------- */
    const handleUpdateUserRole = async (id: string, role: string) => {
        try {
            await api.patch(`/user/${id}`, { role });
            toast.success("Role updated");
            fetchAllData();
        } catch {
            toast.error("Failed to update role");
        }
    };

    /* ---------------- LOGOUT ---------------- */
    const handleLogout = async () => {
        await api.post("/auth/logout");
        router.push("/auth");
    };

    if (!user) return (
        <h1>Loading....</h1>
    )


    // console.log(teachers);
    // console.log(user.username);
    return (
        //<h1>hello</h1>
        <ProtectedRoute>
            <div className="min-h-screen flex bg-[#0f172a] text-white">
                {/* ---------------- SIDEBAR ---------------- */}
                <div className="w-64 bg-slate-900/60 border-r border-white/10 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                                {user.username[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold">{user.username}</p>
                                <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                        </div>

                        {[
                            ["dashboard", Home],
                            ["users", Users],
                            ["students", GraduationCap],
                            ["teachers", UserCheck],
                            ["classes", ClipboardList],
                            ["marks", BookOpen],
                            ["attendance", CalendarCheck],
                            ["profile", User],
                        ].map(([tab, Icon]: any) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg mb-2 ${activeTab === tab
                                    ? "bg-purple-600/20"
                                    : "hover:bg-purple-600/10"
                                    }`}
                            >
                                <Icon size={18} /> {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg justify-center"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* ---------------- MAIN ---------------- */}
                <div className="flex-1 p-10">
                    {/* DASHBOARD */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold">Admin Overview</h1>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    ["Users", totalUsers],
                                    ["Students", totalStudents],
                                    ["Teachers", totalTeachers],
                                    ["Classes", totalClasses],
                                ].map(([label, value]: any) => (
                                    <div
                                        key={label}
                                        className="bg-slate-800/50 p-6 rounded-xl border border-white/10"
                                    >
                                        <p className="text-slate-400">{label}</p>
                                        <p className="text-3xl font-bold text-purple-400">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <h2 className="mb-4 font-semibold">System Distribution</h2>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={dashboardStats}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius={60}
                                                outerRadius={90}
                                            >
                                                {dashboardStats.map((_, i) => (
                                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                                    <h2 className="mb-4 font-semibold">Average Marks</h2>
                                    <p className="text-5xl font-bold text-yellow-400">
                                        {avgMarks}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USERS – ROLE MANAGEMENT */}
                    {activeTab === "users" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {users.map((u) => (
                                <div
                                    key={u.id}
                                    className="bg-slate-800/50 p-4 rounded-xl border border-white/10"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                                            {u.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{u.username}</p>
                                            <p className="text-sm text-slate-400">{u.email}</p>
                                        </div>
                                    </div>

                                    <select
                                        value={u.role}
                                        onChange={(e) =>
                                            handleUpdateUserRole(u.id, e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-slate-700 rounded text-white"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="TEACHER">TEACHER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}


                    {/* PLACEHOLDER CRUD TABS */}
                    {activeTab === "students" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Manage Students</h2>

                                {/* CREATE STUDENT */}
                                <button
                                    onClick={() => setIsCreateStudentOpen(true)}
                                    className="bg-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-700"
                                >
                                    + Add Student
                                </button>
                            </div>

                            {/* STUDENT TABLE */}
                            <div className="overflow-x-auto bg-slate-800/50 rounded-xl border border-white/10">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-900/60">
                                        <tr>
                                            <th className="p-4">Username</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Roll No</th>
                                            <th className="p-4">Class</th>
                                            <th className="p-4 text-center">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {students.map((s) => (
                                            <tr
                                                key={s.id}
                                                className="border-t border-white/10 hover:bg-slate-700/30"
                                            >
                                                <td className="p-4 font-semibold">
                                                    {s.user?.username}
                                                </td>

                                                <td className="p-4 text-slate-300">
                                                    {s.user?.email}
                                                </td>

                                                <td className="p-4">
                                                    {s.roll_no}
                                                </td>

                                                <td className="p-4">
                                                    {s.classRoom?.class_name ?? "Not Assigned"}
                                                </td>

                                                <td className="p-4 flex gap-2 justify-center">
                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() => {
                                                            setEditingStudent(s);
                                                            setEditRollNo(s.roll_no);
                                                            setEditClassId(s.classRoom?.id || "");
                                                            setIsEditStudentOpen(true);
                                                        }}
                                                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm("Delete this student?")) return;
                                                            await api.delete(`/student/roll/${s.roll_no}`);
                                                            toast.success("Student deleted");
                                                            fetchAllData();
                                                        }}
                                                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {students.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="p-6 text-center text-slate-400">
                                                    No students found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isCreateStudentOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Add Student</h3>

                                {/* USERNAME */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Username</label>
                                    <select
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    >
                                        <option value="">Select User</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.username}>
                                                {u.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ROLL NO */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Roll No</label>
                                    <input
                                        type="number"
                                        value={newRollNo}
                                        onChange={(e) => setNewRollNo(Number(e.target.value))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    />
                                </div>

                                {/* CLASS */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Class</label>
                                    <select
                                        value={newClassId}
                                        onChange={(e) => setNewClassId(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={`${cls.class_name}|${cls.section}`}>
                                                {cls.class_name} - {cls.section}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsCreateStudentOpen(false)}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                const [class_name, section] = newClassId.split("|");

                                                await api.post("/student", {
                                                    username: newUsername,
                                                    roll_no: newRollNo,
                                                    class_name,
                                                    section,
                                                });

                                                toast.success("Student created");
                                                setIsCreateStudentOpen(false);
                                                fetchAllData();

                                                // reset
                                                setNewUsername("");
                                                setNewRollNo(0);
                                                setNewClassId("");
                                            } catch (err: any) {
                                                toast.error(err?.response?.data?.message || "Failed to create student");
                                            }
                                        }}
                                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {activeTab === "teachers" && (
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Manage Teachers</h2>

                                <button
                                    onClick={() => setIsCreateTeacherOpen(true)}
                                    className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                >
                                    + Add Teacher
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-slate-400 border-b border-white/10">
                                            <th className="text-left py-2">Username</th>
                                            <th className="text-left py-2">Subject</th>
                                            <th className="text-right py-2">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {teachers.map((t) => (
                                            <tr
                                                key={t.id}
                                                className="border-b border-white/5 hover:bg-slate-700/30"
                                            >
                                                <td className="py-2">{t.user?.username || t.userId?.username || t.name}</td>
                                                <td className="py-2">{t.subject}</td>

                                                <td className="py-2 text-right space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingTeacher(t);
                                                            setEditSubject(t.subject);
                                                            setIsEditTeacherOpen(true);
                                                        }}
                                                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm("Delete this teacher?")) return;
                                                            await api.delete(`/teacher/${t.user.username}`);
                                                            toast.success("Teacher deleted");
                                                            fetchAllData();
                                                        }}
                                                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {!teachers.length && (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-slate-400">
                                                    No teachers found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isEditTeacherOpen && editingTeacher && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Edit Teacher</h3>

                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Subject</label>
                                    <input
                                        value={editSubject}
                                        onChange={(e) => setEditSubject(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsEditTeacherOpen(false)}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            await api.patch(`/teacher/${editingTeacher.user.username}`, {
                                                subject: editSubject,
                                            });

                                            toast.success("Teacher updated");
                                            setIsEditTeacherOpen(false);
                                            fetchAllData();
                                        }}
                                        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isCreateTeacherOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Add Teacher</h3>

                                {/* USERNAME */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Username</label>
                                    <select
                                        value={newTeacherUsername}
                                        onChange={(e) => setNewTeacherUsername(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    >
                                        <option value="">Select User</option>
                                        {users
                                            .filter((u) => u.role === "TEACHER")
                                            .map((u) => (
                                                <option key={u.id} value={u.username}>
                                                    {u.username}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                {/* SUBJECT */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Subject</label>
                                    <input
                                        value={newSubject}
                                        onChange={(e) => setNewSubject(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                        placeholder="e.g. Mathematics"
                                    />
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsCreateTeacherOpen(false)}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.post("/teacher", {
                                                    username: newTeacherUsername,
                                                    subject: newSubject,
                                                });

                                                toast.success("Teacher created");
                                                setIsCreateTeacherOpen(false);
                                                fetchAllData();

                                                // reset
                                                setNewTeacherUsername("");
                                                setNewSubject("");
                                            } catch (err: any) {
                                                toast.error(
                                                    err?.response?.data?.message || "Failed to create teacher"
                                                );
                                            }
                                        }}
                                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}




                    {activeTab === "classes" && (
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Manage Classes</h2>

                                <button
                                    onClick={() => setIsCreateClassOpen(true)}
                                    className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                >
                                    + Add Class
                                </button>
                            </div>

                            {/* TABLE */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-slate-400 border-b border-white/10">
                                        <tr>
                                            <th className="py-2">Class Name</th>
                                            <th className="py-2">Section</th>
                                            <th className="py-2 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {classes.map((cls) => (
                                            <tr
                                                key={cls.id}
                                                className="border-b border-white/5 hover:bg-slate-700/30"
                                            >
                                                <td className="py-2">{cls.class_name}</td>
                                                <td className="py-2">{cls.section}</td>

                                                <td className="py-2 text-right space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditClass(cls);
                                                            setIsEditClassOpen(true);
                                                        }}
                                                        className="px-3 py-1 rounded bg-yellow-600 hover:bg-yellow-700 text-sm"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm("Delete this class?")) return;

                                                            await api.delete(`/classes/${cls.class_name}`);
                                                            toast.success("Class deleted");
                                                            fetchAllData();
                                                        }}
                                                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {classes.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-6 text-slate-400">
                                                    No classes found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isCreateClassOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Add Class</h3>

                                {/* CLASS NAME */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Class Name</label>
                                    <input
                                        value={newClassName}
                                        onChange={(e) => setNewClassName(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                        placeholder="e.g. class10"
                                    />
                                </div>

                                {/* SECTION */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Section</label>
                                    <input
                                        value={newSection}
                                        onChange={(e) => setNewSection(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                        placeholder="e.g. A"
                                    />
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsCreateClassOpen(false)}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.post("/classes", {
                                                    class_name: newClassName,
                                                    section: newSection,
                                                });

                                                toast.success("Class created");
                                                setIsCreateClassOpen(false);
                                                fetchAllData();

                                                setNewClassName("");
                                                setNewSection("");
                                            } catch (err: any) {
                                                toast.error(
                                                    err?.response?.data?.message || "Failed to create class"
                                                );
                                            }
                                        }}
                                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isEditClassOpen && editClass && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Edit Class</h3>

                                {/* CLASS NAME */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Class Name</label>
                                    <input
                                        value={editClass.class_name}
                                        onChange={(e) =>
                                            setEditClass({ ...editClass, class_name: e.target.value })
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    />
                                </div>

                                {/* SECTION */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Section</label>
                                    <input
                                        value={editClass.section}
                                        onChange={(e) =>
                                            setEditClass({ ...editClass, section: e.target.value })
                                        }
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    />
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setIsEditClassOpen(false);
                                            setEditClass(null);
                                        }}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.patch(`/classes/${editClass.class_name}`, {
                                                    class_name: editClass.class_name,
                                                    section: editClass.section,
                                                });

                                                toast.success("Class updated");
                                                setIsEditClassOpen(false);
                                                setEditClass(null);
                                                fetchAllData();
                                            } catch (err: any) {
                                                toast.error(
                                                    err?.response?.data?.message || "Failed to update class"
                                                );
                                            }
                                        }}
                                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "marks" && (
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-xl font-bold capitalize mb-4">
                                Manage {activeTab}
                            </h2>

                            <div className="overflow-x-auto bg-slate-900/40 rounded-xl border border-white/10">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-900/60">
                                        <tr>
                                            <th className="py-2 px-4">Student</th>
                                            <th className="py-2 px-4">Class</th>
                                            <th className="py-2 px-4">Marks</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {marks.length > 0 ? (
                                            marks.map((m) => (
                                                <tr
                                                    key={m.id}
                                                    className="border-b border-white/10 hover:bg-slate-700/30"
                                                >
                                                    <td className="py-2 px-4 font-semibold">
                                                        {m.student?.user?.username || m.studentId || "Unknown"}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        {m.student?.classRoom
                                                            ? `${m.student.classRoom.class_name} - ${m.student.classRoom.section}`
                                                            : "Not Assigned"}
                                                    </td>
                                                    <td className="py-2 px-4">{m.marks}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-slate-400">
                                                    No marks found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "attendance" && (
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
                            <h2 className="text-xl font-bold mb-4">Attendance Records</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="text-slate-400 border-b border-white/10">
                                        <tr>
                                            <th className="py-2 px-3">Roll No</th>
                                            <th className="py-2 px-3">Date</th>
                                            <th className="py-2 px-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendance.map((a) => (
                                            <tr key={a.id} className="border-b border-white/10 hover:bg-slate-700/30">
                                                <td className="py-2 px-3">{a.student?.roll_no || "Unknown"}</td>
                                                <td className="py-2 px-3">{new Date(a.attendance_date).toLocaleDateString()}</td>
                                                <td className="py-2 px-3">{a.status}</td>
                                            </tr>
                                        ))}

                                        {attendance.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="py-6 text-center text-slate-400">
                                                    No attendance records found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* PROFILE */}
                    {activeTab === "profile" && user && (
                        <div className="p-10">
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
                                            {user.username[0]?.toUpperCase()}
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-bold capitalize">{user.username}</h2>
                                            <p className="text-sm text-slate-400">{user.email}</p>
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
                                                <p className="font-medium">{user.email}</p>
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
                                    <p className="text-xs text-slate-400 text-center mt-4">
                                        Profile details are protected and managed securely.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isEditStudentOpen && editingStudent && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                            <div className="bg-slate-900 w-full max-w-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Edit Student</h3>

                                {/* Username (readonly) */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Username</label>
                                    <input
                                        value={editingStudent.user.username}
                                        disabled
                                        className="w-full mt-1 px-3 py-2 bg-slate-700 rounded text-white opacity-70"
                                    />
                                </div>

                                {/* Roll No */}
                                <div className="mb-3">
                                    <label className="text-sm text-slate-400">Roll No</label>
                                    <input
                                        type="number"
                                        value={editRollNo}
                                        onChange={(e) => setEditRollNo(Number(e.target.value))}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    />
                                </div>

                                {/* Class */}
                                <div className="mb-4">
                                    <label className="text-sm text-slate-400">Class</label>
                                    <select
                                        value={editClassId}
                                        onChange={(e) => setEditClassId(e.target.value)}
                                        className="w-full mt-1 px-3 py-2 bg-slate-800 rounded text-white"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.class_name} - {cls.section}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsEditStudentOpen(false)}
                                        className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await api.patch(`/student/id/${editingStudent.id}`, {
                                                    roll_no: editRollNo,
                                                    classId: editClassId || null,
                                                });

                                                toast.success("Student updated");
                                                setIsEditStudentOpen(false);
                                                fetchAllData();
                                            } catch {
                                                toast.error("Failed to update student");
                                            }
                                        }}
                                        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 font-semibold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}