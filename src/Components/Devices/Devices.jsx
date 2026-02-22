import React, { useState, useEffect } from "react";
import {
  Search,
  Smartphone,
  ChevronDown,
  Plus,
  Wifi,
  WifiOff,
  User,
  X,
  CheckCircle,
  Settings,
  Clock,
  Cpu,
  Activity,
  Signal,
  AlertTriangle,
  Eye,
  Edit,
  Trash,
  UserPlus,
  MoreVertical,
  LogOut,
} from "lucide-react";

// --- MOCK DATA ---
const mockDevices = [
  {
    id: "DEV-001",
    name: "Temperature Sensor A1",
    type: "Temperature Sensor",
    status: "Online",
    assignedTo: { name: "Ahmed Hassan", initials: "AH", color: "bg-blue-600" },
    lastSeen: "2 minutes ago",
  },
  {
    id: "DEV-002",
    name: "Pressure Monitor B2",
    type: "Pressure Sensor",
    status: "Online",
    assignedTo: { name: "Sarah Mohamed", initials: "SM", color: "bg-blue-600" },
    lastSeen: "5 minutes ago",
  },
  {
    id: "DEV-003",
    name: "Humidity Detector C3",
    type: "Humidity Sensor",
    status: "Offline",
    assignedTo: { name: "Khaled Ali", initials: "KA", color: "bg-blue-600" },
    lastSeen: "2 hours ago",
  },
  {
    id: "DEV-004",
    name: "Motion Sensor D4",
    type: "Motion Detector",
    status: "Online",
    assignedTo: null,
    lastSeen: "1 minute ago",
  },
  {
    id: "DEV-005",
    name: "Air Quality Monitor E5",
    type: "Air Quality Sensor",
    status: "Online",
    assignedTo: {
      name: "Fatima Ibrahim",
      initials: "FI",
      color: "bg-blue-600",
    },
    lastSeen: "30 seconds ago",
  },
  {
    id: "DEV-006",
    name: "Water Flow Meter F6",
    type: "Flow Sensor",
    status: "Offline",
    assignedTo: null,
    lastSeen: "1 day ago",
  },
  {
    id: "DEV-007",
    name: "Light Intensity Sensor G7",
    type: "Light Sensor",
    status: "Online",
    assignedTo: { name: "Layla Mahmoud", initials: "LM", color: "bg-blue-600" },
    lastSeen: "10 minutes ago",
  },
  {
    id: "DEV-008",
    name: "Smoke Detector H8",
    type: "Safety Sensor",
    status: "Online",
    assignedTo: { name: "Ahmed Hassan", initials: "AH", color: "bg-blue-600" },
    lastSeen: "3 minutes ago",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@ipredict.com",
    role: "Admin",
    initials: "AH",
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Sarah Mohamed",
    email: "sarah.mohamed@ipredict.com",
    role: "Technician",
    initials: "SM",
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "Khaled Ali",
    email: "khaled.ali@ipredict.com",
    role: "Technician",
    initials: "KA",
    color: "bg-blue-600",
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    email: "fatima.ibrahim@ipredict.com",
    role: "Technician",
    initials: "FI",
    color: "bg-blue-600",
  },
  {
    id: 5,
    name: "Layla Mahmoud",
    email: "layla.mahmoud@ipredict.com",
    role: "Technician",
    initials: "LM",
    color: "bg-blue-600",
  },
];

function Devices() {
  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'register', 'details', 'edit', 'assign', null
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'status', 'assignment', 'sort', 'profile'
  const [activeRowMenu, setActiveRowMenu] = useState(null); // Track which row's menu is open

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
  const openRegister = () => setActiveModal("register");
  const openDetails = (device) => {
    setSelectedDevice(device);
    setActiveModal("details");
  };
  const openEdit = (device) => {
    setSelectedDevice(device); // Usually passed from details or table
    setActiveModal("edit");
  };
  const openAssign = (device, e) => {
    e.stopPropagation();
    setSelectedDevice(device);
    setActiveModal("assign");
  };
  const closeModal = () => {
    setActiveModal(null);
    setSelectedDevice(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      {/* --- Main Content --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Devices</h2>
            <p className="text-slate-500 mt-1">
              Manage registered devices and assign them to users
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={openRegister}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-colors"
            >
              <Plus className="w-5 h-5" /> Add Device
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatCard label="TOTAL DEVICES" value="8" />
          <StatCard label="ONLINE DEVICES" value="6" color="text-emerald-500" />
          <StatCard label="OFFLINE DEVICES" value="2" color="text-slate-400" />
          <StatCard label="ASSIGNED DEVICES" value="6" color="text-blue-600" />
          <StatCard
            label="UNASSIGNED DEVICES"
            value="2"
            color="text-orange-500"
          />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by device ID or device name"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4">
            <FilterButton
              label="All Status"
              options={["All Status", "Online", "Offline"]}
              isOpen={activeDropdown === "status"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(
                  activeDropdown === "status" ? null : "status",
                );
              }}
            />
            <FilterButton
              label="All Assignments"
              options={["All Assignments", "Assigned", "Unassigned"]}
              isOpen={activeDropdown === "assignment"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(
                  activeDropdown === "assignment" ? null : "assignment",
                );
              }}
            />
            <FilterButton
              label="Newest"
              options={["Newest", "Last Seen", "Status", "Name"]}
              isOpen={activeDropdown === "sort"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === "sort" ? null : "sort");
              }}
            />
          </div>
        </div>

        {/* Devices Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Device ID</th>
                <th className="px-6 py-4">Device Name</th>
                <th className="px-6 py-4">Device Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Assigned User</th>
                <th className="px-6 py-4">Last Seen</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockDevices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => openDetails(device)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-slate-900 text-sm w-12">
                        {device.id.split("-")[0]}
                        <br />
                        <span className="text-slate-500 font-normal">
                          -{device.id.split("-")[1]}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {device.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {device.type.split(" ").map((word, i) => (
                      <div key={i}>{word}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1.5 text-sm font-medium ${device.status === "Online" ? "text-emerald-600" : "text-slate-400"}`}
                    >
                      {device.status === "Online" ? (
                        <Wifi className="w-4 h-4" />
                      ) : (
                        <WifiOff className="w-4 h-4" />
                      )}
                      {device.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {device.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full ${device.assignedTo.color} text-white flex items-center justify-center text-xs font-medium`}
                        >
                          {device.assignedTo.initials}
                        </div>
                        <div className="text-sm font-medium text-slate-900">
                          {device.assignedTo.name.split(" ")[0]}
                          <br />
                          <span className="text-slate-500 font-normal">
                            {device.assignedTo.name.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => openAssign(device, e)}
                        className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
                      >
                        <User className="w-4 h-4" /> Assign User
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="w-24 leading-tight">
                      {device.lastSeen.replace(" ", "\n")}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <div className="inline-block">
                      <ActionMenu
                        isOpen={activeRowMenu === device.id}
                        onToggle={(e) => {
                          e.stopPropagation();
                          setActiveRowMenu(
                            activeRowMenu === device.id ? null : device.id,
                          );
                        }}
                        onAction={(action) => {
                          setActiveRowMenu(null);
                          switch (action) {
                            case "details":
                              openDetails(device);
                              break;
                            case "edit":
                              openEdit(device);
                              break;
                            case "assign":
                              openAssign(device, new Event("click"));
                              break;
                            case "remove":
                              alert(`Remove device ${device.name}`);
                              break;
                            default:
                              break;
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">1</span>-{" "}
              <span className="font-medium text-slate-900">8</span> of{" "}
              <span className="font-medium text-slate-900">8</span> devices
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm shadow-blue-200">
                1
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                2
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* 1. Register Device Modal */}
      {activeModal === "register" && (
        <ModalLayout
          title="Register New Device"
          subtitle="Register a new device to the system"
          onClose={closeModal}
        >
          <div className="space-y-6">
            <InfoBanner
              icon={Settings}
              title="New Device Registration"
              desc="Fill in the details below to register a new device"
            />

            {/* Basic Info */}
            <Section
              title="Basic Information"
              subtitle="Device identification and type"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Device ID"
                  placeholder="DEV-001"
                  subtitle="Unique identifier for the device"
                />
                <Input
                  label="Device Name"
                  placeholder="Temperature Sensor A1"
                />
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Device Type
                  </label>
                  <div className="relative">
                    <select className="w-full border border-slate-200 rounded-lg py-2.5 px-4 appearance-none bg-white text-slate-500 text-sm">
                      <option>Select device type...</option>
                      <option>Temperature Sensor</option>
                      <option>Motion Detector</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </Section>

            {/* Technical Details */}
            <Section
              title="Technical Details"
              subtitle="Network and firmware information"
              icon={Cpu}
            >
              <Input
                label="IP Address"
                placeholder="192.168.1.101"
                className="mb-4"
              />
              <Input label="Firmware Version" placeholder="v2.3.1" />
            </Section>

            {/* Security */}
            <Section
              title="Security & Authentication"
              subtitle="Device credentials for secure connection"
              icon={AlertTriangle}
              iconColor="text-orange-500 bg-orange-50"
            >
              <Input
                label="Device Secret / Password"
                placeholder="Enter device authentication secret"
              />
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <AlertTriangle className="w-3 h-3" /> This secret is used for
                device authentication and cannot be changed later
              </div>
            </Section>

            {/* Status Config */}
            <Section
              title="Status Configuration"
              subtitle="Set the initial device status"
              icon={Activity}
              iconColor="text-emerald-600 bg-emerald-50"
            >
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-200 rounded-full text-slate-500">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      Device Status
                    </div>
                    <div className="text-xs text-slate-500">
                      Currently set as{" "}
                      <span className="font-bold text-slate-700">Offline</span>
                    </div>
                  </div>
                </div>
                <ToggleSwitch />
              </div>
            </Section>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={closeModal}
              className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Register Device
            </button>
          </div>
        </ModalLayout>
      )}

      {/* 2. Device Details Modal */}
      {activeModal === "details" && selectedDevice && (
        <ModalLayout
          title="Device Details"
          subtitle={`Complete information for ${selectedDevice.name}`}
          onClose={closeModal}
        >
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {selectedDevice.name}
                    </h3>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
                      {selectedDevice.id}
                    </span>
                  </div>
                  <button
                    onClick={() => openEdit(selectedDevice)}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${selectedDevice.status === "Online" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-600 border border-slate-200"}`}
                  >
                    {selectedDevice.status === "Online" ? (
                      <Wifi className="w-3 h-3" />
                    ) : (
                      <WifiOff className="w-3 h-3" />
                    )}{" "}
                    {selectedDevice.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <Smartphone className="w-3 h-3" /> {selectedDevice.type}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <Section
              title="Device Information"
              subtitle="Technical specifications and details"
              icon={Settings}
              iconColor="text-blue-500 bg-blue-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailBox
                  label="Device Type"
                  value={selectedDevice.type}
                  icon={Smartphone}
                />
                <DetailBox
                  label="Status"
                  value={selectedDevice.status}
                  icon={Wifi}
                  valueColor={
                    selectedDevice.status === "Online"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  }
                />
                <DetailBox
                  label="Last Seen"
                  value="1 minute ago"
                  icon={Clock}
                />
                <DetailBox
                  label="Registered"
                  value="Jan 10, 2025"
                  icon={CheckCircle}
                />
                <DetailBox
                  label="IP Address"
                  value="192.168.1.104"
                  icon={Signal}
                />
                <DetailBox label="Firmware" value="v2.3.1" icon={Cpu} />
              </div>
            </Section>

            {/* Assigned User */}
            <Section
              title="Assigned User"
              subtitle="Currently managing this device"
              icon={User}
              iconColor="text-purple-500 bg-purple-50"
            >
              {selectedDevice.assignedTo ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${selectedDevice.assignedTo.color} text-white flex items-center justify-center font-bold text-sm`}
                    >
                      {selectedDevice.assignedTo.initials}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {selectedDevice.assignedTo.name}
                      </div>
                      <div className="text-xs text-slate-500">Technician</div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => openAssign(selectedDevice, e)}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <User className="w-8 h-8 text-slate-300 mb-2" />
                  <div className="text-sm text-slate-500 mb-4">
                    No user assigned to this device
                  </div>
                  <button
                    onClick={(e) => openAssign(selectedDevice, e)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                  >
                    Assign a user now
                  </button>
                </div>
              )}
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Connected Sensors */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Connected Sensors
                    </h4>
                    <p className="text-xs text-emerald-600 font-medium">
                      1 sensors active
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                        <Activity className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          Motion-D4-01
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Sensor #1
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-bold">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Recent Activity
                    </h4>
                    <p className="text-xs text-orange-600 font-medium">
                      Last 24 hours
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <TimelineItem
                    icon={Wifi}
                    color="bg-emerald-500"
                    title="Device came online"
                    time="2 mins ago"
                    bg="bg-emerald-50"
                  />
                  <TimelineItem
                    icon={Activity}
                    color="bg-blue-500"
                    title="Sensor reading received"
                    time="5 mins ago"
                    bg="bg-blue-50"
                  />
                  <TimelineItem
                    icon={Settings}
                    color="bg-blue-500"
                    title="Configuration updated"
                    time="1 hour ago"
                    bg="bg-blue-50"
                  />
                  <TimelineItem
                    icon={AlertTriangle}
                    color="bg-orange-500"
                    title="Alert triggered"
                    time="3 hours ago"
                    bg="bg-orange-50"
                    iconColor="text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Device ID:{" "}
              <span className="text-slate-900 font-bold">
                {selectedDevice.id}
              </span>
            </div>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </ModalLayout>
      )}

      {/* 3. Edit Device Modal */}
      {activeModal === "edit" && selectedDevice && (
        <ModalLayout
          title="Edit Device"
          subtitle="Update device information and configuration"
          onClose={closeModal}
        >
          <div className="space-y-6">
            <InfoBanner
              icon={Settings}
              title="Update Device Configuration"
              desc={`Editing device: ${selectedDevice.name}`}
            />

            <Section
              title="Basic Information"
              subtitle="Device identification and type"
              icon={Smartphone}
            >
              <div className="grid grid-cols-2 gap-4">
                <Input label="Device ID" value={selectedDevice.id} disabled />
                <Input label="Device Name" value={selectedDevice.name} />
                <div className="col-span-2">
                  <Input
                    label="Device Type"
                    value={selectedDevice.type}
                    disabled
                    className="bg-slate-50 text-slate-500"
                  />
                </div>
              </div>
            </Section>

            <Section
              title="Technical Details"
              subtitle="Network and firmware information"
              icon={Settings}
              iconColor="text-purple-500 bg-purple-50"
            >
              <Input
                label="IP Address"
                value="192.168.1.101"
                className="mb-4"
              />
              <Input label="Firmware Version" value="v2.3.1" />
            </Section>

            <Section
              title="Status Configuration"
              subtitle="Set the initial device status"
              icon={Activity}
              iconColor="text-emerald-600 bg-emerald-50"
            >
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-full text-emerald-600">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      Device Status
                    </div>
                    <div className="text-xs text-slate-500">
                      Currently set as{" "}
                      <span className="font-bold text-emerald-600">Online</span>
                    </div>
                  </div>
                </div>
                <ToggleSwitch checked={true} />
              </div>
            </Section>
          </div>

          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
            <div className="text-sm text-slate-500">
              Changes will be applied immediately
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </ModalLayout>
      )}

      {/* 4. Assign User Modal */}
      {activeModal === "assign" && selectedDevice && (
        <ModalLayout
          title="Assign Device to User"
          subtitle={`Select a user to assign ${selectedDevice.name}`}
          onClose={closeModal}
        >
          <div className="space-y-6">
            <InfoBanner
              icon={User}
              title="Device Information"
              desc="This device will be assigned to the selected user"
              iconClass="bg-blue-600"
            />

            {/* Device Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">
                  {selectedDevice.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                    {selectedDevice.id}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    {selectedDevice.type}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <Wifi className="w-3 h-3" /> Online
                  </span>
                </div>
              </div>
            </div>

            <Section
              title="Search Users"
              subtitle="Find users by name or email address"
              icon={SearchIcon}
              iconColor="text-purple-500 bg-purple-50"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </Section>

            <Section
              title="Available Users"
              subtitle="5 users found"
              icon={User}
              iconColor="text-emerald-500 bg-emerald-50"
            >
              <div className="absolute right-6 top-6 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> User
                Selected
              </div>

              <div className="space-y-3 mt-4">
                {mockUsers.map((user, idx) => (
                  <div
                    key={user.id}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${idx === 0 ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${idx === 0 ? "border-blue-600 bg-white" : "border-slate-300"}`}
                      >
                        {idx === 0 && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full ${user.color} text-white flex items-center justify-center font-bold text-sm`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs border border-slate-200 font-medium">
                        {user.role}
                      </span>
                      {idx === 0 && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">
                  User selected
                </div>
                <div className="text-[10px] text-slate-500">
                  Ready to assign device
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                <User className="w-4 h-4" /> Confirm Assignment
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

function ActionMenu({ isOpen, onToggle, onAction }) {
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
            <Edit className="w-4 h-4" /> Edit Device
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("assign");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
          >
            <UserPlus className="w-4 h-4" /> Assign User
          </button>
          <div className="border-b border-slate-100"></div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("remove");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-3"
          >
            <Trash className="w-4 h-4" /> Remove Device
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
        AU
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
            <Settings className="w-4 h-4" /> Account Preferences
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

function ModalLayout({ title, subtitle, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>
        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-1 bg-white rounded-b-3xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function InfoBanner({ icon: Icon, title, desc, iconClass = "bg-blue-600" }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center gap-4 mb-6">
      <div
        className={`w-14 h-14 ${iconClass} rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h4 className="font-bold text-lg text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600 bg-blue-50",
  children,
}) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 relative">
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Input({ label, placeholder, value, disabled, subtitle, className }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full border border-slate-200 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm ${disabled ? "bg-slate-50 text-slate-500" : "bg-white text-slate-900"}`}
      />
      {subtitle && (
        <div className="text-[10px] text-slate-400 mt-1">{subtitle}</div>
      )}
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
      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
    </label>
  );
}

function DetailBox({
  label,
  value,
  icon: Icon,
  valueColor = "text-slate-900",
}) {
  return (
    <div className="p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-2 mb-1 text-slate-500">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className={`font-semibold text-sm ${valueColor}`}>{value}</div>
    </div>
  );
}

function TimelineItem({
  icon: Icon,
  color,
  title,
  time,
  bg,
  iconColor = "text-white",
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all ${bg}`}
    >
      <div
        className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shrink-0 shadow-sm`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <div
          className={`font-bold text-xs ${title === "Alert triggered" ? "text-orange-700" : "text-slate-700"}`}
        >
          {title}
        </div>
        <div className="text-[10px] text-slate-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {time}
        </div>
      </div>
    </div>
  );
}

export default Devices;
