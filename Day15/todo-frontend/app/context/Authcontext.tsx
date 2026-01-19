'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type UserType = {
    id: string | number;
    email: string;
    role: string;
    name?: string;
};

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: UserType | null;
    setUser: (value: UserType | null) => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
    initialAuth,
}: {
    children: React.ReactNode;
    initialAuth: boolean;
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initialAuth);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:3001/auth/me', {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setIsLoggedIn(true);
                    setUser(res.data.user); 
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch {
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (!initialAuth) checkAuth();
        else setLoading(false);
    }, [initialAuth]);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used inside AuthProvider');
    return context;
};