import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Activity,
  Plus,
  Thermometer,
  Wind,
  Droplet,
  Volume2,
  Gauge,
  MoreVertical,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Signal,
  Cpu,
  Clock,
  ArrowRight,
  Eye,
  Edit,
  Settings,
  Trash,
  ChevronDown,
} from "lucide-react";

// --- MOCK DATA ---
const mockDevices = [
  {
    id: "DEV-001",
    name: "Temperature Sensor A1",
  },
  {
    id: "DEV-002",
    name: "Pressure Monitor B2",
  },
  {
    id: "DEV-003",
    name: "Humidity Detector C3",
  },
  {
    id: "DEV-004",
    name: "Motion Sensor D4",
  },
  {
    id: "DEV-005",
    name: "Air Quality Monitor E5",
  },
  {
    id: "DEV-006",
    name: "Water Flow Meter F6",
  },
  {
    id: "DEV-007",
    name: "Light Intensity Sensor G7",
  },
  {
    id: "DEV-008",
    name: "Smoke Detector H8",
  },
];

const mockSensors = [
  {
    id: "SENS-001",
    type: "Temperature",
    device: "DEV-001",
    deviceName: "Temperature Sensor A1",
    status: "Active",
    reading: "22.5°C",
    updated: "2 minutes ago",
    location: "Building A - Floor 1",
  },
  {
    id: "SENS-002",
    type: "Vibration",
    device: "DEV-001",
    deviceName: "Temperature Sensor A1",
    status: "Active",
    reading: "0.3 mm/s",
    updated: "3 minutes ago",
    location: "Building A - Floor 1",
  },
  {
    id: "SENS-003",
    type: "Pressure",
    device: "DEV-002",
    deviceName: "Pressure Monitor B2",
    status: "Warning",
    reading: "95.2 kPa",
    updated: "5 minutes ago",
    location: "Building B - Basement",
  },
  {
    id: "SENS-004",
    type: "Humidity",
    device: "DEV-003",
    deviceName: "Humidity Detector C3",
    status: "Offline",
    reading: "65%",
    updated: "2 hours ago",
    location: "Server Room",
  },
  {
    id: "SENS-005",
    type: "Temperature",
    device: "DEV-004",
    deviceName: "Motion Sensor D4",
    status: "Active",
    reading: "24.1°C",
    updated: "1 minute ago",
    location: "Corridor East",
  },
  {
    id: "SENS-006",
    type: "Gas",
    device: "DEV-005",
    deviceName: "Air Quality Monitor E5",
    status: "Active",
    reading: "450 ppm",
    updated: "30 seconds ago",
    location: "Lab 3",
  },
  {
    id: "SENS-007",
    type: "Sound",
    device: "DEV-006",
    deviceName: "Water Flow Meter F6",
    status: "Warning",
    reading: "78 dB",
    updated: "4 minutes ago",
    location: "Pump Station",
  },
  {
    id: "SENS-008",
    type: "Vibration",
    device: "DEV-007",
    deviceName: "Light Intensity Sensor G7",
    status: "Active",
    reading: "0.5 mm/s",
    updated: "2 minutes ago",
    location: "Production Line 1",
  },
  {
    id: "SENS-009",
    type: "Temperature",
    device: "DEV-008",
    deviceName: "Smoke Detector H8",
    status: "Active",
    reading: "21.8°C",
    updated: "1 minute ago",
    location: "Storage Area",
  },
  {
    id: "SENS-010",
    type: "Humidity",
    device: "DEV-002",
    deviceName: "Pressure Monitor B2",
    status: "Active",
    reading: "55%",
    updated: "3 minutes ago",
    location: "Building B - Basement",
  },
];

function Sensors() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // State for the Action Dropdown
  const [activeActionDropdown, setActiveActionDropdown] = useState(null);

  // State for Filter Dropdowns
  const [activeFilter, setActiveFilter] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveActionDropdown(null);
      setActiveFilter(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleRowClick = (sensor) => {
    setSelectedSensor(sensor);
    setIsEditMode(false);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation(); // Prevent row click
    // Toggle: if clicking the same one, close it. If different, open it.
    setActiveActionDropdown(activeActionDropdown === id ? null : id);
  };

  const handleMenuOptionClick = (e, action, sensor) => {
    e.stopPropagation();
    setActiveActionDropdown(null); // Close menu

    switch (action) {
      case "details":
        setSelectedSensor(sensor);
        setIsEditMode(false);
        break;
      case "edit":
        setSelectedSensor(sensor);
        setIsEditMode(true);
        break;
      case "alert":
        // Logic for alert config would go here
        alert(`Configure alerts for ${sensor.id}`);
        break;
      case "remove":
        // Logic for removal would go here
        alert(`Remove sensor ${sensor.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      {/* --- Main Content --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Sensors</h2>
            <p className="text-slate-500 mt-1">
              Monitor and configure all connected sensors across your
              infrastructure
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-colors"
          >
            <Plus className="w-5 h-5" /> Add Sensor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="TOTAL SENSORS" value="10" />
          <StatCard label="ACTIVE SENSORS" value="7" color="text-emerald-500" />
          <StatCard label="WARNING SENSORS" value="2" color="text-orange-500" />
          <StatCard label="OFFLINE SENSORS" value="1" color="text-slate-400" />
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by sensor ID or sensor type"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4">
            <FilterButton
              label="All Sensor Types"
              options={[
                "Temperature",
                "Vibration",
                "Sound",
                "Gas",
                "Pressure",
                "Humidity",
              ]}
              isOpen={activeFilter === "sensorTypes"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(
                  activeFilter === "sensorTypes" ? null : "sensorTypes",
                );
              }}
            />
            <FilterButton
              label="All Status"
              options={["Active", "Warning", "Offline"]}
              isOpen={activeFilter === "status"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(activeFilter === "status" ? null : "status");
              }}
            />
            <FilterButton
              label="Last Update"
              options={["Status", "Sensor Type", "Sensor ID"]}
              isOpen={activeFilter === "lastUpdate"}
              onClick={(e) => {
                e.stopPropagation();
                setActiveFilter(
                  activeFilter === "lastUpdate" ? null : "lastUpdate",
                );
              }}
            />
          </div>
        </div>

        {/* Sensors Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm min-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Sensor Type</th>
                <th className="px-6 py-4">Connected Device</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Reading</th>
                <th className="px-6 py-4">Last Update</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockSensors.map((sensor) => (
                <tr
                  key={sensor.id}
                  onClick={() => handleRowClick(sensor)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-slate-200">
                        <SensorIcon type={sensor.type} />
                      </div>
                      <span className="font-medium text-slate-900">
                        {sensor.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 text-sm">
                      {sensor.device}
                    </div>
                    <div className="text-xs text-slate-500">
                      {sensor.deviceName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={sensor.status} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {sensor.reading}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="w-24 leading-tight">{sensor.updated}</div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    {/* Action Button */}
                    <button
                      onClick={(e) => handleActionClick(e, sensor.id)}
                      className={`p-2 rounded-full transition-colors ${activeActionDropdown === sensor.id ? "bg-slate-200 text-slate-800" : "text-slate-400 hover:bg-slate-200 hover:text-slate-600"}`}
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeActionDropdown === sensor.id && (
                      <div className="absolute right-8 top-8 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        <div className="p-1.5 space-y-1">
                          <button
                            onClick={(e) =>
                              handleMenuOptionClick(e, "details", sensor)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" /> View Details
                          </button>
                          <button
                            onClick={(e) =>
                              handleMenuOptionClick(e, "edit", sensor)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" /> Edit Thresholds
                          </button>
                          <button
                            onClick={(e) =>
                              handleMenuOptionClick(e, "alert", sensor)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <Settings className="w-4 h-4" /> Configure Alerts
                          </button>
                          <div className="h-px bg-slate-100 my-1"></div>
                          <button
                            onClick={(e) =>
                              handleMenuOptionClick(e, "remove", sensor)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash className="w-4 h-4" /> Remove Sensor
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">1</span> to{" "}
              <span className="font-medium text-slate-900">10</span> of{" "}
              <span className="font-medium text-slate-900">10</span> sensors
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
      {isAddModalOpen && (
        <AddSensorModal onClose={() => setIsAddModalOpen(false)} />
      )}

      {selectedSensor && !isEditMode && (
        <SensorDetailsModal
          sensor={selectedSensor}
          onClose={() => setSelectedSensor(null)}
          onEdit={() => setIsEditMode(true)}
        />
      )}

      {selectedSensor && isEditMode && (
        <EditSensorModal
          sensor={selectedSensor}
          onClose={() => setIsEditMode(false)}
          onCancel={() => setIsEditMode(false)}
        />
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---

function StatCard({ label, value, color = "text-slate-900" }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className={`text-4xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function FilterButton({ label, options = [], isOpen = false, onClick }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors flex items-center gap-2"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && options.length > 0 && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-max">
          {options.map((option) => (
            <button
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                // Filter selection logic can be added here
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

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Warning: "bg-orange-50 text-orange-700 border-orange-200",
    Offline: "bg-slate-100 text-slate-600 border-slate-200",
  };
  const Icon =
    status === "Active"
      ? CheckCircle
      : status === "Warning"
        ? AlertTriangle
        : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <Icon className="w-3.5 h-3.5" /> {status}
    </span>
  );
}

function SensorIcon({ type }) {
  const icons = {
    Temperature: Thermometer,
    Vibration: Activity,
    Pressure: Gauge,
    Humidity: Droplet,
    Gas: Wind,
    Sound: Volume2,
  };
  const Icon = icons[type] || Activity;
  return <Icon className="w-5 h-5" />;
}

// --- MODAL COMPONENTS ---

function AddSensorModal({ onClose }) {
  // Create device options with names for the dropdown
  const deviceOptions = mockDevices.map((dev) => `${dev.id} - ${dev.name}`);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Add New Sensor</h3>
            <p className="text-sm text-slate-500">
              Configure a new sensor and set monitoring thresholds
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8">
          {/* Icon Placeholder */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Basic Info */}
          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Sensor ID" required placeholder="SENS-001" />

              {/* DROPDOWN 1: Sensor Type */}
              <SelectGroup
                label="Sensor Type"
                required
                options={[
                  "Temperature",
                  "Vibration",
                  "Sound",
                  "Gas",
                  "Pressure",
                  "Humidity",
                ]}
              />

              {/* DROPDOWN 2: Connected Device */}
              <SelectGroup
                label="Connected Device"
                required
                className="md:col-span-2"
                options={deviceOptions}
              />

              <InputGroup
                label="Location"
                className="md:col-span-2"
                placeholder="Building A - Floor 1"
              />

              {/* DROPDOWN 3: Initial Status */}
              <SelectGroup
                label="Initial Status"
                className="md:col-span-2"
                options={["Active", "Warning", "Offline"]}
              />
            </div>
          </section>

          {/* Thresholds */}
          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Threshold Configuration
            </h4>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <InputGroup
                label="Minimum Threshold"
                required
                suffix="°C"
                placeholder="0"
              />
              <InputGroup
                label="Maximum Threshold"
                required
                suffix="°C"
                placeholder="100"
              />
            </div>

            {/* Visual Range Preview */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Minimum</span>
                <span>Maximum</span>
              </div>
              <div className="h-3 w-full bg-gradient-to-r from-emerald-400 via-orange-400 to-red-500 rounded-full mb-2"></div>
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>0 °C</span>
                <span>100 °C</span>
              </div>
            </div>
          </section>

          {/* Alert Settings */}
          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Alert Settings
            </h4>
            <div className="space-y-4 pl-2">
              {[
                "Enable threshold alerts",
                "Email notifications",
                "SMS notifications",
              ].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
            <div className="mt-0.5">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-800 leading-relaxed">
              <span className="font-semibold block mb-1">
                Threshold Configuration
              </span>
              Alerts will be triggered when sensor readings fall outside the
              configured threshold range. Make sure to set appropriate values
              for your monitoring requirements.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-slate-600 font-medium hover:text-slate-900 px-4 py-2 hover:bg-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg shadow-lg shadow-blue-200 transition-transform hover:-translate-y-0.5">
            Add Sensor
          </button>
        </div>
      </div>
    </div>
  );
}

function EditSensorModal({ onClose, onCancel }) {
  // Similar to Add, but with different title and save button
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Edit Sensor Configuration
            </h3>
            <p className="text-sm text-slate-500">
              Update configuration for SENS-001
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 space-y-8">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Reuse sections from Add Modal for brevity in this demo, usually would be components */}
          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Sensor ID"
                value="SENS-001"
                disabled
                className="bg-slate-50"
              />
              <InputGroup label="Sensor Type" value="Temperature" />
              <InputGroup
                label="Connected Device"
                value="DEV-001"
                className="md:col-span-2"
              />
              <InputGroup
                label="Location"
                value="Building A - Floor 1"
                className="md:col-span-2"
              />
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Threshold Configuration
            </h4>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <InputGroup
                label="Minimum Threshold"
                required
                suffix="°C"
                value="0"
              />
              <InputGroup
                label="Maximum Threshold"
                required
                suffix="°C"
                value="100"
              />
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="h-3 w-full bg-gradient-to-r from-emerald-400 via-orange-400 to-red-500 rounded-full mb-2"></div>
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>0 °C</span>
                <span>100 °C</span>
              </div>
            </div>
          </section>
        </div>

        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <button
            onClick={onCancel}
            className="text-slate-600 font-medium hover:text-slate-900 px-4 py-2 hover:bg-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg shadow-lg shadow-blue-200 transition-transform hover:-translate-y-0.5">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SensorDetailsModal({ sensor, onClose, onEdit }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{sensor.id}</h3>
              <p className="text-sm text-slate-500">
                Temperature Sensor Details & Analytics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Current Reading Card */}
              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-xl shadow-blue-200">
                <div className="text-sm font-medium text-blue-100 mb-2">
                  Current Reading
                </div>
                <div className="text-5xl font-bold mb-4">{sensor.reading}</div>
                <div className="flex items-center gap-2 text-sm text-blue-100">
                  <Clock className="w-4 h-4" /> Updated {sensor.updated}
                </div>
              </div>

              {/* Sensor Info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">
                  Sensor Information
                </h4>
                <div className="space-y-3 text-sm">
                  <InfoRow label="Sensor ID" value={sensor.id} bold />
                  <InfoRow label="Type" value={sensor.type} bold />
                  <InfoRow label="Device" value={sensor.device} bold />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500">Status</span>
                    <StatusBadge status={sensor.status} />
                  </div>
                  <InfoRow label="Location" value={sensor.location} bold />
                </div>
              </div>

              {/* Threshold Config Visual */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">
                  Threshold Configuration
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Minimum</span>
                    <span className="font-bold">18 °C</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Maximum</span>
                    <span className="font-bold">28 °C</span>
                  </div>
                  <div className="relative pt-6 pb-2">
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-500 rounded-full"></div>
                    {/* Current Marker */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="text-[10px] font-bold text-blue-600 mb-1">
                        Current: {sensor.reading}
                      </div>
                      <div className="w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>18 °C</span>
                    <span>28 °C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MIDDLE COLUMN */}
            <div className="space-y-6">
              {/* Chart Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      24-Hour Readings
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    <Activity className="w-3 h-3" /> Stable Trend
                  </div>
                </div>

                {/* Mock Chart Area */}
                <div className="h-48 flex items-end justify-between gap-2 px-2">
                  {[
                    20, 35, 45, 30, 50, 60, 55, 40, 30, 25, 45, 70, 80, 60, 50,
                    40,
                  ].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-sm ${i > 10 ? "bg-blue-500" : "bg-blue-200"}`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>00:00</span>
                  <span>08:00</span>
                  <span>16:00</span>
                  <span>23:59</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <DetailStat
                  label="Average (24h)"
                  value="22.7 °C"
                  icon={Activity}
                />
                <DetailStat label="Variance" value="±1.2 °C" icon={Signal} />
                <DetailStat
                  label="Peak Value"
                  value="24.1 °C"
                  icon={ArrowRight}
                />
                <DetailStat label="Uptime" value="99.8%" icon={Clock} />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Recent Alerts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">Recent Alerts</h4>
                <div className="space-y-4">
                  <AlertItem
                    icon={AlertTriangle}
                    color="text-orange-500 bg-orange-50 border-orange-100"
                    title="Threshold Warning"
                    desc="Reading approaching maximum threshold"
                    time="2 hours ago"
                  />
                  <AlertItem
                    icon={CheckCircle}
                    color="text-emerald-500 bg-emerald-50 border-emerald-100"
                    title="Reading Normalized"
                    desc="Sensor reading returned to normal range"
                    time="5 hours ago"
                  />
                  <AlertItem
                    icon={Activity}
                    color="text-blue-500 bg-blue-50 border-blue-100"
                    title="Calibration Complete"
                    desc="Sensor calibration completed successfully"
                    time="1 day ago"
                  />
                </div>
              </div>

              {/* Connected Device */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4">
                  Connected Device
                </h4>
                <div className="flex items-center gap-4 border border-slate-100 rounded-xl p-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      {sensor.device}
                    </div>
                    <div className="text-xs text-slate-500">
                      {sensor.deviceName}
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium text-emerald-600">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Seen</span>
                    <span className="font-medium">2 minutes ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Firmware</span>
                    <span className="font-medium">v2.3.1</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-medium py-2.5 rounded-lg shadow-sm transition-colors">
                    Recalibrate Sensor
                  </button>
                  <button className="w-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-medium py-2.5 rounded-lg shadow-sm transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg shadow-md shadow-blue-200 transition-colors"
          >
            Edit Thresholds
          </button>
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  label,
  placeholder,
  required,
  suffix,
  className,
  value,
  disabled,
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full border border-slate-200 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 ${disabled ? "text-slate-500 bg-slate-50" : "bg-white"}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// NEW COMPONENT: SelectGroup for Dropdowns
function SelectGroup({ label, required, className, options = [] }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
        <select className="w-full border border-slate-200 rounded-lg py-2.5 px-4 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm text-slate-900 bg-white appearance-none cursor-pointer">
          <option value="">Select {label}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function InfoRow({ label, value, bold }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-slate-500">{label}</span>
      <span className={`${bold ? "font-bold" : ""} text-slate-900`}>
        {value}
      </span>
    </div>
  );
}

function DetailStat({ label, value, icon: Icon }) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function AlertItem({ icon: Icon, color, title, desc, time }) {
  return (
    <div className={`p-4 rounded-xl border ${color} bg-opacity-50 flex gap-3`}>
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white bg-opacity-60`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="font-bold text-sm text-slate-900">{title}</div>
        <div className="text-xs text-slate-600 mt-0.5">{desc}</div>
        <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {time}
        </div>
      </div>
    </div>
  );
}

export default Sensors;
