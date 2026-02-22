import React, { useState } from "react";
import { 
  Activity, 
  Menu, 
  ChevronDown, 
  Search, 
  Bell, 
  LayoutDashboard, 
  AlertCircle, 
  BarChart3, 
  Tablet, 
  FileText, 
  ShieldAlert, 
  Cpu, 
  Settings, 
  Users, 
  LifeBuoy,
  User,     // Added
  LogOut    // Added
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function TopNavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // New state for profile dropdown
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Alerts', path: '/alerts', icon: AlertCircle },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Devices', path: '/devices', icon: Tablet },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Security', path: '/security', icon: ShieldAlert },
    { name: 'Sensors', path: '/sensors', icon: Cpu },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Support', path: '/support', icon: LifeBuoy },
  ];

  const currentPage = menuItems.find(item => item.path === location.pathname)?.name || "Main Menu";

  return (
    <div className="font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* LEFT SECTION: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                iPredict <span className="text-slate-500 font-normal">Admin Panel</span>
              </span>
            </Link>

            <div className="relative ml-8">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 rounded-md text-sm font-medium text-slate-600 transition-colors"
              >
                <Menu className="w-4 h-4" /> 
                <span>{currentPage}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsMenuOpen(false)}
                  ></div>
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          location.pathname === item.path 
                            ? 'bg-blue-50 text-blue-600 font-semibold' 
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'text-blue-600' : 'text-slate-400'}`} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT SECTION: Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-48 lg:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            
            <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                AD
              </button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100">
                      <div className="text-sm font-bold text-slate-900">Admin User</div>
                      <div className="text-xs text-slate-500 truncate">admin@ipredict.com</div>
                    </div>
                    
                    {/* Menu Options */}
                    <div className="p-1.5 space-y-1">
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <User className="w-4 h-4 text-slate-400" />
                        Profile Settings
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-slate-400" />
                        Account Preferences
                      </button>
                      
                      <div className="h-px bg-slate-100 my-1 mx-2"></div>
                      
                      <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default TopNavigationBar;