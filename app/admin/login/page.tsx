"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        if (localStorage.getItem("cms-auth") === "true") {
            router.replace("/admin");
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simple client-side password check (for demo; matches env default)
        const ADMIN_PASSWORD = "yasco-admin-2024";
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem("cms-auth", "true");
            router.replace("/admin");
        } else {
            setError("Incorrect password. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-black text-3xl">Y</span>
                    </div>
                    <h1 className="text-white font-black text-2xl">YASCO CMS</h1>
                    <p className="text-gray-400 text-sm mt-2">Content Management System</p>
                </div>

                {/* Form */}
                <div className="bg-dark-mid rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                            <Lock size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-white">Admin Login</h2>
                            <p className="text-gray-400 text-xs">Enter your password to continue</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="cms-password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="cms-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 bg-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="Enter admin password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    ⚠️ {error}
                                </p>
                            )}
                        </div>

                        <button
                            id="cms-login-btn"
                            type="submit"
                            disabled={loading || !password}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-600 text-xs mt-6">
                    Default password:{" "}
                    <code className="bg-dark-mid px-2 py-0.5 rounded text-gray-400">
                        yasco-admin-2024
                    </code>
                </p>
            </div>
        </div>
    );
}
