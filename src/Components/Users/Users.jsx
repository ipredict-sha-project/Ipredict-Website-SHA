import React, { useState, useEffect } from "react";
import {
  Search,
  Users as UsersIcon,
  ChevronDown,
  Plus,
  User,
  Mail,
  Shield,
  Smartphone,
  MoreVertical,
  X,
  CheckCircle,
  Key,
  Activity,
  Calendar,
  Check,
  Monitor,
  Radio,
  Laptop,
  Eye,
  Edit,
  Lock,
  Ban,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import { fetchUsers } from '../../services/analyticsService';

function Users() {
  // Data State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'add', 'edit', 'details', 'manage_devices'
  const [selectedUser, setSelectedUser] = useState(null);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'role', 'status', 'sort', 'profile'
  const [activeRowMenu, setActiveRowMenu] = useState(null); // Track which row's menu is open

  // Fetch users from Firebase
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
      setActiveRowMenu(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handlers
  const openAddUser = () => setActiveModal("add");

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setActiveModal("details");
  };

  const openEditUser = (user) => {
    // If coming from details modal, we might want to keep reference or just switch
    setSelectedUser(user);
    setActiveModal("edit");
  };

  const openManageDevices = (user) => {
    setSelectedUser(user);
    setActiveModal("manage_devices");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900 relative">
      {/* --- Main Content --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Users</h2>
            <p className="text-slate-500 mt-1">
              Manage user accounts, roles, and device access
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openAddUser}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add User
            </button>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="TOTAL USERS" value={users.length} />
          <StatCard label="ACTIVE USERS" value={users.filter(u => u.status === "Active").length} color="text-emerald-500" />
          <StatCard label="DISABLED USERS" value={users.filter(u => u.status === "Disabled").length} color="text-slate-400" />
          <StatCard label="ADMINS" value={users.filter(u => u.role === "Admin").length} color="text-purple-600" />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4">
            <FilterButton
              label="All Roles"
              options={["All Roles", "Admin", "Technician"]}
              isOpen={activeDropdown === "role"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "role" ? null : "role");
              }}
            />
            <FilterButton
              label="All Status"
              options={["All Status", "Active", "Disabled"]}
              isOpen={activeDropdown === "status"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(
                  activeDropdown === "status" ? null : "status",
                );
              }}
            />
            <FilterButton
              label="Newest"
              options={["Newest", "Last Login", "Role", "Name"]}
              isOpen={activeDropdown === "sort"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "sort" ? null : "sort");
              }}
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Assigned Devices</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => openUserDetails(user)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      >
                        {user.initials}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openUserDetails(user);
                      }}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline font-medium text-sm"
                    >
                      <Smartphone className="w-3.5 h-3.5" />{" "}
                      {user.assignedDevicesCount} devices
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <div className="inline-block">
                      <ActionMenu
                        user={user}
                        isOpen={activeRowMenu === user.id}
                        onToggle={(e) => {
                          e.stopPropagation();
                          setActiveRowMenu(
                            activeRowMenu === user.id ? null : user.id,
                          );
                        }}
                        onAction={(action) => {
                          setActiveRowMenu(null);
                          switch (action) {
                            case "details":
                              openUserDetails(user);
                              break;
                            case "edit":
                              openEditUser(user);
                              break;
                            case "reset":
                              alert(`Reset password for ${user.name}`);
                              break;
                            case "disable":
                              alert(`Disable user ${user.name}`);
                              break;
                            default:
                              break;
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{users.length > 0 ? 1 : 0}</span>–<span className="font-medium text-slate-900">{users.length}</span> of{" "}
              <span className="font-medium text-slate-900">{users.length}</span> users
            </div>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 cursor-default">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-blue-200">
                1
              </button>
              <button disabled className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 cursor-default">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* 1. Add New User Modal */}
      {activeModal === "add" && (
        <ModalLayout
          title="Add New User"
          subtitle="Create a new user account with role and permissions"
          onClose={closeModal}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
            <div className="space-y-6 min-w-0">
              <Section
                title="Basic Information"
                subtitle="User account details"
                icon={User}
                iconColor="text-blue-600 bg-blue-50"
              >
                <Input label="Full Name" placeholder="Enter full name" />
                <Input label="Email Address" placeholder="user@ipredict.com" />
              </Section>

              <Section
                title="Password Settings"
                subtitle="Initial password configuration"
                icon={Key}
                iconColor="text-orange-500 bg-orange-50"
              >
                <div className="space-y-4 w-full">
                  <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50/50 w-full">
                    <div className="p-1 bg-blue-600 rounded-full text-white mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="font-bold text-sm text-slate-900" style={{wordBreak: 'break-word'}}>
                        Auto-generate Password
                      </div>
                      <div className="text-xs text-slate-500" style={{wordBreak: 'break-word'}}>
                        System will create a secure temporary password
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl bg-white w-full">
                    <div className="p-1 bg-white border border-slate-300 rounded-full mt-0.5 text-transparent flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="font-bold text-sm text-slate-900" style={{wordBreak: 'break-word'}}>
                        Force Password Reset
                      </div>
                      <div className="text-xs text-slate-500" style={{wordBreak: 'break-word'}}>
                        User must change password on first login
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="space-y-6 min-w-0">
              <Section
                title="Role & Permissions"
                subtitle="Access level and status"
                icon={Shield}
                iconColor="text-purple-600 bg-purple-50"
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  User Role
                </label>
                <div className="relative mb-6">
                  <select className="w-full border border-slate-200 rounded-lg py-3 px-4 appearance-none bg-white text-slate-500 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select role...</option>
                    <option>Administrator</option>
                    <option>Technician</option>
                    <option>Viewer</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <div className="p-4 border border-purple-100 bg-purple-50 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-sm text-purple-900">
                      Technician Access
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Limited access to assigned devices and basic features. Can
                    view and manage assigned devices only.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-xs font-bold text-purple-700">
                      Can view and manage assigned devices
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-sm text-slate-900">
                      Account Status
                    </div>
                    <ToggleSwitch checked={true} />
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    Enable or disable user access
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>{" "}
                    Account is active and accessible
                  </div>
                </div>
              </Section>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">
                  Create new user account
                </div>
                <div className="text-xs text-slate-500">
                  Password will be sent via email
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create User
              </button>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* 2. User Details Modal */}
      {activeModal === "details" && selectedUser && (
        <ModalLayout
          title={selectedUser.name}
          subtitle={selectedUser.email}
          iconLetter={selectedUser.initials}
          iconColor={selectedUser.color}
          onClose={closeModal}
        >
          <div className="flex flex-col h-full">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
                {/* Left Column */}
                <div className="space-y-6 min-w-0">
                  <Section
                    title="User Information"
                    subtitle="Account details and role"
                    icon={User}
                    iconColor="text-blue-600 bg-blue-50"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Shield className="w-4 h-4" /> Role
                        </div>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-xs font-bold">
                          {selectedUser.role}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Activity className="w-4 h-4" /> Status
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-xs font-bold">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>{" "}
                          Active
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Monitor className="w-4 h-4" /> Last Login
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {selectedUser.lastLogin}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" /> Created
                        </div>
                        <span className="text-sm font-bold text-slate-900">
                          {selectedUser.created}
                        </span>
                      </div>
                    </div>
                  </Section>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          Recent Activity
                        </h4>
                        <p className="text-xs text-slate-500">
                          Latest user actions
                        </p>
                      </div>
                    </div>
                    <div className="space-y-6 relative pl-4 after:absolute after:top-2 after:bottom-2 after:left-[27px] after:w-0.5 after:bg-slate-100 max-h-[250px] overflow-y-auto">
                      <ActivityItem
                        icon={Monitor}
                        color="bg-blue-100 text-blue-600"
                        title="Logged in from 192.168.1.100"
                        time="2 hours ago"
                      />
                      <ActivityItem
                        icon={Smartphone}
                        color="bg-emerald-100 text-emerald-600"
                        title="Assigned to Device A1"
                        time="1 day ago"
                      />
                      <ActivityItem
                        icon={AlertTriangle}
                        color="bg-orange-100 text-orange-600"
                        title="Triggered alert #2451"
                        time="2 days ago"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 min-w-0">
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">
                            Assigned Devices
                          </h4>
                          <p className="text-xs text-slate-500">
                            {selectedUser.assignedDevicesCount} devices assigned
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => openManageDevices(selectedUser)}
                        className="px-4 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors"
                      >
                        Manage
                      </button>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                      <DeviceRow
                        name="Temperature Sensor A1"
                        type="Temperature"
                        status="Online"
                      />
                      <DeviceRow
                        name="Pressure Sensor B2"
                        type="Pressure"
                        status="Online"
                      />
                      <DeviceRow
                        name="Humidity Sensor C3"
                        type="Humidity"
                        status="Offline"
                      />
                      <DeviceRow
                        name="Motion Detector D4"
                        type="Motion"
                        status="Online"
                      />
                      <DeviceRow
                        name="Air Quality Monitor E5"
                        type="Air Quality"
                        status="Online"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="shrink-0 border-t border-slate-100 pt-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    User ID: {selectedUser.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    View complete user profile
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => openEditUser(selectedUser)}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                  <Laptop className="w-4 h-4" /> Manage Account
                </button>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* 3. Manage Devices Modal */}
      {activeModal === "manage_devices" && selectedUser && (
        <ModalLayout
          title="Manage Devices"
          subtitle={`Assign devices to ${selectedUser.name}`}
          icon="smartphone"
          onClose={closeModal}
          width="max-w-4xl"
        >
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by device name, type, or ID..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <SummaryPill
                label="Total Devices"
                value="–"
                icon={Smartphone}
                color="text-blue-600 bg-blue-50"
              />
              <SummaryPill
                label="Selected"
                value="–"
                icon={CheckCircle}
                color="text-emerald-600 bg-emerald-50"
              />
              <SummaryPill
                label="Available"
                value="–"
                icon={Radio}
                color="text-purple-600 bg-purple-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
              {[].map((device) => (
                <div
                  key={device.id}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${device.assigned ? "border-blue-500 bg-blue-50/30" : "border-slate-100 hover:border-blue-200 bg-white"}`}
                >
                  <div
                    className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${device.assigned ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300"}`}
                  >
                    {device.assigned && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {device.name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${device.status === "Online" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {device.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{device.type}</span>
                      <span>•</span>
                      <span>{device.id}</span>
                    </div>
                    {device.assigned && (
                      <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                        <CheckCircle className="w-3 h-3" /> Assigned
                      </div>
                    )}
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs font-bold">4 devices selected</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Assignment
              </button>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* 4. Edit User Modal */}
      {activeModal === "edit" && selectedUser && (
        <ModalLayout
          title="Edit User"
          subtitle="Update user information and permissions"
          icon="edit"
          onClose={closeModal}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
            <div className="space-y-6 min-w-0">
              <Section
                title="Basic Information"
                subtitle="User account details"
                icon={User}
                iconColor="text-blue-600 bg-blue-50"
              >
                <Input label="Full Name" value={selectedUser.name} />
                <Input label="Email Address" value={selectedUser.email} />
              </Section>
            </div>

            <div className="space-y-6 min-w-0">
              <Section
                title="Role & Permissions"
                subtitle="Access level and status"
                icon={Shield}
                iconColor="text-purple-600 bg-purple-50"
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  User Role
                </label>
                <div className="relative mb-6">
                  <select
                    defaultValue={
                      selectedUser.role === "Admin"
                        ? "Administrator"
                        : "Technician"
                    }
                    className="w-full border border-slate-200 rounded-lg py-3 px-4 appearance-none bg-white text-slate-900 font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Administrator</option>
                    <option>Technician</option>
                    <option>Viewer</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <div className="p-4 border border-purple-100 bg-purple-50 rounded-xl mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-bold text-sm text-purple-900">
                      Administrator Access
                    </span>
                  </div>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Full access to all system features, users, and devices.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-xs font-bold text-purple-700">
                      Can manage users and system settings
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-sm text-slate-900">
                      Account Status
                    </div>
                    <ToggleSwitch checked={selectedUser.status === "Active"} />
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    Enable or disable user access
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-bold ${selectedUser.status === "Active" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-slate-100 border-slate-200 text-slate-600"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${selectedUser.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}
                    ></span>{" "}
                    Account is{" "}
                    {selectedUser.status === "Active" ? "active" : "disabled"}
                  </div>
                </div>
              </Section>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">
                  Update user account
                </div>
                <div className="text-xs text-slate-500">
                  Changes will be applied immediately
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
}

// --- Helper Components ---

function StatCard({ label, value, color = "text-slate-900" }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </div>
      <div className={`text-5xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function FilterButton({ label, options = [], isOpen = false, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="px-6 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors flex items-center gap-2"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-10 min-w-max overflow-hidden">
          {options.map((option) => (
            <button
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                // Filter selection logic
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionMenu({ user, isOpen, onToggle, onAction }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 min-w-max overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("details");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <Eye className="w-4 h-4" /> View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("edit");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <Edit className="w-4 h-4" /> Edit User
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("reset");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <Key className="w-4 h-4" /> Reset Password
          </button>
          <div className="border-b border-slate-100"></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("disable");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <Ban className="w-4 h-4" /> Disable User
          </button>
        </div>
      )}
    </div>
  );
}

function ProfileMenu({ isOpen, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm hover:bg-blue-700 transition-colors"
      >
        AD
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl z-20 min-w-[220px] overflow-hidden">
          {/* Header Section */}
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="font-bold text-sm text-slate-900">Admin User</div>
            <div className="text-xs text-slate-500 mt-1">
              admin@ipredict.com
            </div>
          </div>

          {/* Menu Items */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Profile Settings");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <User className="w-4 h-4" /> Profile Settings
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Account Preferences");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <Shield className="w-4 h-4" /> Account Preferences
          </button>

          {/* Separator */}
          <div className="border-b border-slate-100"></div>

          {/* Logout */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Logout");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }) {
  const styles = {
    Admin: "bg-purple-100 text-purple-700 border-purple-200",
    Technician: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-lg text-xs font-bold border ${styles[role] || styles.Technician}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-bold ${status === "Active" ? "text-emerald-600" : "text-slate-400"}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-slate-300"}`}
      ></span>
      {status}
    </span>
  );
}

function ModalLayout({
  title,
  subtitle,
  iconLetter,
  iconColor,
  icon,
  onClose,
  children,
  width = "max-w-5xl",
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div
        className={`bg-white w-full ${width} rounded-3xl shadow-2xl flex flex-col max-h-[95vh]`}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            {iconLetter ? (
              <div
                className={`w-14 h-14 rounded-2xl ${iconColor} flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-100`}
              >
                {iconLetter}
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                {icon === "smartphone" ? (
                  <Smartphone className="w-7 h-7" />
                ) : icon === "edit" ? (
                  <MoreHorizontal className="w-7 h-7" />
                ) : (
                  <Plus className="w-7 h-7" />
                )}
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                {subtitle.includes("@") && <Mail className="w-3.5 h-3.5" />}
                {subtitle}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200 shrink-0"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, icon: Icon, iconColor, children }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 min-w-0">
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 overflow-wrap-anywhere">{title}</h4>
          <p className="text-xs text-slate-500 overflow-wrap-anywhere">{subtitle}</p>
        </div>
      </div>
      <div className="min-w-0">
        {children}
      </div>
    </div>
  );
}

function Input({ label, value, placeholder }) {
  return (
    <div className="min-w-0">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 bg-white"
      />
    </div>
  );
}

function ToggleSwitch({ checked }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        defaultChecked={checked}
      />
      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );
}

function ActivityItem({ icon: Icon, color, title, time }) {
  return (
    <div className="relative z-10 flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shrink-0`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="font-bold text-sm text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{time}</div>
      </div>
    </div>
  );
}

function DeviceRow({ name, type, status }) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-blue-200">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <div className="font-bold text-sm text-slate-900">{name}</div>
          <div className="text-xs text-slate-500">{type}</div>
        </div>
      </div>
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${status === "Online" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"}`}
      >
        {status}
      </span>
    </div>
  );
}

function SummaryPill({ label, value, icon: Icon, color }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
      <Icon className={`w-5 h-5 mb-1 ${color.split(" ")[0]}`} />
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

export default Users;
