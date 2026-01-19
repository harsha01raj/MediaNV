'use client';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            toast.error("You must be logged in to access this page");
            router.push("/auth");
        }
    }, [loading, isLoggedIn, router]);

    if (loading || !isLoggedIn) {
        // optional: show a loader while checking auth
        return <p className="text-center mt-20">Checking authentication...</p>;
    }

    return <>{children}</>;
}