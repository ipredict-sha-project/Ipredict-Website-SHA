import React, { useState } from "react";
import {
  Shield,
  Mail,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Lock as LockIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate("/users");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-slate-900">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>

      {/* --- Header Section --- */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          iPredict Admin System
        </h1>

        {/* Admin Access Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
          <Shield className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="text-xs font-bold text-orange-700 tracking-wide uppercase">
            Admin Access Only
          </span>
        </div>
      </div>

      {/* --- Main Login Card --- */}
      <div className="bg-white w-full max-w-[480px] rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-10 relative z-10">
        {/* Card Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Admin Sign In</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Secure access to iPredict Admin Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSignIn}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Admin Email
            </label>
            <div className="relative group">
              <input
                type="email"
                placeholder="admin@ipredict.com"
                className="w-full h-12 px-4 pr-10 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
              <Mail className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your admin password"
                className="w-full h-12 px-4 pr-10 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer w-4 h-4 border-2 border-slate-300 rounded text-blue-600 focus:ring-blue-500/20 cursor-pointer transition-colors checked:bg-blue-600 checked:border-blue-600"
                />
              </div>
              <span className="text-sm text-slate-600 font-medium select-none">
                Remember this device
              </span>
            </label>
            {/* <Link to="/forgetpass">Forgot Password</Link> */}
            <Link
              to="/forgetpass"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
            <Lock className="w-4 h-4" />
            Sign In Securely
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        {/* Restricted Access Box */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
            <LockIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
              Restricted Access
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              This system is for authorized administrators only. Unauthorized
              access attempts will be logged and reported.
            </p>
          </div>
        </div>
      </div>

      {/* --- Footer Section --- */}
      <div className="mt-12 flex flex-col items-center space-y-8">
        {/* Security Pill */}
        <div className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-medium text-slate-500">
            All sessions are encrypted and monitored
          </span>
        </div>

        {/* Security Badges */}
        <div className="flex items-center gap-8 opacity-80">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-400 font-medium">
              SSL Secured
            </span>
          </div>
          <div className="w-px h-3 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-400 font-medium">
              256-bit Encryption
            </span>
          </div>
          <div className="w-px h-3 bg-slate-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            <span className="text-xs text-slate-400 font-medium">
              ISO 27001
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            iPredict Admin System
          </div>
          <div className="text-xs text-slate-400">
            © 2025 iPredict Technologies Inc. All rights reserved.
          </div>
          <div className="flex gap-4 justify-center text-xs text-slate-400 mt-2">
            <a href="#" className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
