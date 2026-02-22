import React, { useState } from "react";
import {
  Users,
  Activity,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Edit2,
  RefreshCw,
  EyeOff,
  Settings,
  AlertCircle,
  Clock,
  Check,
  X,
  Search,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  ChevronDown,
} from "lucide-react";

// --- Mock Data ---

const statsData = [
  {
    title: "TOTAL ADMIN USERS",
    value: "24",
    icon: Users,
    trend: null,
    color: "text-blue-600",
    bgIcon: "text-gray-400",
  },
  {
    title: "ACTIVE SESSIONS",
    value: "18",
    icon: Activity,
    trend: null,
    color: "text-green-600",
    bgIcon: "text-gray-400",
  },
  {
    title: "FAILED LOGIN ATTEMPTS",
    value: "7",
    icon: AlertTriangle,
    trend: "+3 from yesterday",
    trendColor: "text-red-500",
    color: "text-orange-600",
    bgIcon: "text-gray-400",
  },
  {
    title: "SECURITY ALERTS",
    value: "2",
    icon: Shield,
    trend: null,
    color: "text-red-600",
    bgIcon: "text-gray-400",
  },
];

const permissionsData = [
  { resource: "Devices", superAdmin: true, admin: true, user: false },
  { resource: "Sensors", superAdmin: true, admin: true, user: false },
  { resource: "Alerts", superAdmin: true, admin: true, user: true },
  { resource: "Reports", superAdmin: true, admin: true, user: true },
  { resource: "Analytics", superAdmin: true, admin: true, user: false },
  { resource: "Users", superAdmin: true, admin: false, user: false },
  { resource: "Security", superAdmin: true, admin: false, user: false },
];

const usersData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@ipredict.com",
    role: "Super Admin",
    status: "active",
    devices: 45,
  },
  {
    id: 2,
    name: "Sarah Mohamed",
    email: "sarah.mohamed@ipredict.com",
    role: "Admin",
    status: "active",
    devices: 32,
  },
  {
    id: 3,
    name: "Khaled Ali",
    email: "khaled.ali@ipredict.com",
    role: "User",
    status: "active",
    devices: 18,
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@ipredict.com",
    role: "Admin",
    status: "inactive",
    devices: 28,
  },
];

const logsData = [
  {
    type: "Login",
    user: "Ahmed Hassan",
    ip: "192.168.1.105",
    time: "2 minutes ago",
    status: "success",
  },
  {
    type: "Failed Login",
    user: "Unknown User",
    ip: "203.45.67.89",
    time: "15 minutes ago",
    status: "failed",
  },
  {
    type: "Permission Change",
    user: "Sarah Mohamed",
    ip: "192.168.1.112",
    time: "1 hour ago",
    status: "success",
  },
  {
    type: "Logout",
    user: "Khaled Ali",
    ip: "192.168.1.108",
    time: "2 hours ago",
    status: "success",
  },
  {
    type: "Failed Login",
    user: "admin@test.com",
    ip: "45.67.89.123",
    time: "3 hours ago",
    status: "failed",
  },
];

// --- Sub-Components ---

const SectionHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-6 flex items-start justify-between">
    <div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
    {Icon && <Icon className="w-5 h-5 text-blue-500" />}
  </div>
);

const ToggleSwitch = ({ checked }) => (
  <div
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"}`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? "translate-x-6" : ""}`}
    ></div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium border ${styles}`}
    >
      {status}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  let styles = "bg-gray-100 text-gray-700 border-gray-200";
  if (role === "Super Admin")
    styles = "bg-purple-100 text-purple-700 border-purple-200";
  if (role === "Admin") styles = "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium border ${styles}`}
    >
      {role}
    </span>
  );
};

// --- Main Component ---

function Security() {
  const [passwordExpiration, setPasswordExpiration] = useState(90);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [logFilter, setLogFilter] = useState("All Events");
  const [activeDropdown, setActiveDropdown] = useState(null);

  React.useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className=" min-h-screen bg-gray-50 font-sans text-slate-800">
      {/* Page Header */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Security</h2>
          <p className="text-slate-500 mt-2">
            Manage access control, authentication, and system security protocols
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between h-32"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-400 tracking-wider">
                  {stat.title}
                </span>
                <stat.icon className={`w-5 h-5 ${stat.bgIcon}`} />
              </div>
              <div>
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                {stat.trend && (
                  <div
                    className={`text-xs font-medium mt-1 ${stat.trendColor}`}
                  >
                    {stat.trend}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Roles & Permissions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <SectionHeader
            title="Roles & Permissions"
            subtitle="Define access levels and permissions for each role"
            icon={Shield}
          />

          {/* Role Tabs */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              System Roles
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-3 rounded-lg border border-purple-200 bg-purple-50 cursor-pointer">
                <span className="font-medium text-purple-700">Super Admin</span>
                <Edit2 className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-blue-50 cursor-pointer hover:border-blue-200">
                <span className="font-medium text-blue-700">Admin</span>
                <Edit2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-gray-50 cursor-pointer hover:border-gray-300">
                <span className="font-medium text-gray-700">User</span>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Matrix Table */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Permissions Matrix
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 uppercase text-xs tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 uppercase text-xs tracking-wider text-center">
                      Super Admin
                    </th>
                    <th className="px-6 py-3 uppercase text-xs tracking-wider text-center">
                      Admin
                    </th>
                    <th className="px-6 py-3 uppercase text-xs tracking-wider text-center">
                      User
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {permissionsData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {row.resource}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center">
                          {row.superAdmin ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center">
                          {row.admin ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <div className="flex justify-center">
                          {row.user ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* User Access */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <SectionHeader
              title="User Access"
              subtitle="Manage user roles and access levels"
              icon={Users}
            />
            <div className="space-y-4">
              {usersData.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{user.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                      <div className="flex gap-2">
                        <RoleBadge role={user.role} />
                        <StatusBadge status={user.status} />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-lg font-bold text-gray-900">
                        {user.devices}
                      </span>
                      <span className="text-xs text-gray-500">Devices</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                      <Edit2 className="w-3 h-3" /> Change Role
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
                      <RefreshCw className="w-3 h-3" /> Reset Pass
                    </button>
                    <button className="p-1.5 border border-red-200 rounded text-red-500 hover:bg-red-50">
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
            <SectionHeader
              title="Authentication Settings"
              subtitle="Configure security and session policies"
              icon={Settings}
            />

            <div className="space-y-6">
              {/* Strong Password */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Enforce Strong Password Policy
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Require minimum 8 characters, special symbols
                  </p>
                </div>
                <ToggleSwitch checked={true} />
              </div>

              {/* Password Expiration */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Password Expiration
                    </h4>
                    <p className="text-xs text-gray-500">
                      Force password change after set days
                    </p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {passwordExpiration} days
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={passwordExpiration}
                  onChange={(e) =>
                    setPasswordExpiration(Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Session Timeout */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Session Timeout Duration
                    </h4>
                    <p className="text-xs text-gray-500">
                      Auto logout after inactivity
                    </p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">
                    {sessionTimeout} min
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* MFA */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Multi-Factor Authentication (MFA)
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Require additional verification for login
                  </p>
                </div>
                <ToggleSwitch checked={true} />
              </div>

              {/* Concurrent Sessions */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Limit Concurrent Sessions
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Allow only one active session per user
                  </p>
                </div>
                <ToggleSwitch checked={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <SectionHeader
              title="Security Alerts"
              subtitle="Recent security events requiring attention"
              icon={null} // Icon is handled by warning icon on right in image
            />
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>

          <div className="space-y-4">
            {/* Warning Alert */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg h-fit">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Multiple failed login attempts from IP 203.45.67.89
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>15 minutes ago</span>
                    </div>
                  </div>
                </div>
                <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded">
                  WARNING
                </span>
              </div>
              <div className="ml-12 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Action Taken
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 pl-6">
                  IP temporarily blocked for 30 minutes
                </p>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg h-fit">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Admin role permissions modified by Ahmed Hassan
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>1 hour ago</span>
                    </div>
                  </div>
                </div>
                <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                  INFO
                </span>
              </div>
              <div className="ml-12 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Action Taken
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 pl-6">
                  Change logged and notifications sent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Activity Logs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <SectionHeader
              title="Security Activity Logs"
              subtitle="Complete audit trail of security events and access changes"
            />
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(
                    activeDropdown === "logFilter" ? null : "logFilter",
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                {logFilter}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${activeDropdown === "logFilter" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "logFilter" && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-30 p-1.5">
                  {[
                    "All Events",
                    "Login",
                    "Logout",
                    "Failed Login",
                    "Permission Change",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogFilter(option);
                        setActiveDropdown(null);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 uppercase text-xs tracking-wider">
                    Event Type
                  </th>
                  <th className="px-4 py-3 uppercase text-xs tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 uppercase text-xs tracking-wider">
                    IP Address
                  </th>
                  <th className="px-4 py-3 uppercase text-xs tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 uppercase text-xs tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logsData.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {log.type}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{log.user}</td>
                    <td className="px-4 py-4 text-gray-500 font-mono text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full border border-gray-400"></span>
                      {log.ip}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold border flex items-center gap-1 w-fit ${
                          log.status === "success"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                      >
                        {log.status === "success" ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                        {log.status === "success" ? "SUCCESS" : "FAILED"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">1</span> to{" "}
              <span className="font-bold text-gray-900">5</span> of{" "}
              <span className="font-bold text-gray-900">5</span> logs
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Security;
