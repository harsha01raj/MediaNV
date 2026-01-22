/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import axios from 'axios';
import React, { useState } from 'react';
import api from '../utils/apiAddress';
import toast from 'react-hot-toast';
import { Lock, Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    const router = useRouter();
    const handleLogin = async (e:any) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });
            toast.success(res.data.message);
            setEmail("");
            setPassword("");
            handleRedirect(res.data.User.role);
            console.log(res.data);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";
            toast.error(message);
            console.error(error);
        }

    };

    const handleRegister = async (e:any) => {
        e.preventDefault();
        try {
            const res = await api.post("/user/register", {
                username,
                email,
                password,
            });
            toast.success(res.data.message);
            setUsername("");
            setEmail("");
            setPassword("");
            console.log(res.data);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";
            toast.error(message);
            console.error(error);
        }

    };

    const handleRedirect = (role) => {
        switch (role) {
            case "ADMIN":
                router.push("/admin");
                break;
            case "TEACHER":
                router.push("/teacher");
                break;
            case "STUDENT":
                router.push("/student");
                break;
            default:
                router.push("/user");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

            {/* Main Container */}
            <div className="relative w-full max-w-4xl min-h-[550px] bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden">

                {/* Animated Sliding Panel (Visible on Desktop) */}
                <div className={`hidden md:flex absolute top-0 w-1/2 h-full bg-gradient-to-br from-purple-600 to-blue-700 z-20 transition-all duration-700 ease-in-out items-center justify-center text-white px-12 text-center
          ${isLogin ? 'left-1/2 rounded-l-[100px]' : 'left-0 rounded-r-[100px]'}`}>
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold tracking-tight">
                            {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
                        </h2>
                        <p className="text-slate-100/80 leading-relaxed">
                            {isLogin
                                ? 'Enter your personal details and start your journey with us today.'
                                : 'To keep connected with us please login with your personal info.'}
                        </p>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="px-10 py-3 border-2 border-white/50 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                        >
                            {isLogin ? 'SIGN UP' : 'SIGN IN'}
                        </button>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className={`w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center transition-all duration-700 
          ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
                        <div className="flex gap-4 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition"><Lock size={18} /></div>
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition"><Mail size={18} /></div>
                        </div>
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit' className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg shadow-purple-500/20" >
                            LOG IN
                        </button>
                        <p className="text-center text-slate-400 text-sm md:hidden">
                            Don't have an account? <span onClick={() => setIsLogin(false)} className="text-purple-400 cursor-pointer">Sign Up</span>
                        </p>
                    </form>
                </div>

                {/* Registration Form Section */}
                <div className={`w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center transition-all duration-700 absolute right-0 h-full
          ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg shadow-purple-500/20" type='submit'>
                            REGISTER
                        </button>
                        <p className="text-center text-slate-400 text-sm md:hidden">
                            Already have an account? <span onClick={() => setIsLogin(true)} className="text-purple-400 cursor-pointer">Sign In</span>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}
