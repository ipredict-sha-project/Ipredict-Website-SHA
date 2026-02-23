import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Activity,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Clock,
  MoreHorizontal,
  X,
  TrendingUp,
  ClipboardList,
  Zap,
  User,
  Thermometer,
  Waves,
  Volume2,
  Wind,
  Server,
  ArrowUpRight,
  Settings,
  LogOut,
  Eye,
  Shield,
  FileText,
} from "lucide-react";
import { fetchAlerts } from '../../services/analyticsService';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Dropdown States
  // 'profile', 'filter-severity', 'filter-status', 'sort', or 'row-{id}'
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter Selection States
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Newest");

  // Fetch alerts from Firebase
  useEffect(() => {
    const loadAlerts = async () => {
      setLoading(true);
      try {
        const alertsData = await fetchAlerts(100);
        setAlerts(alertsData);
      } catch (error) {
        console.error('Error loading alerts:', error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };
    loadAlerts();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleSelection = (e, setFunction, value) => {
    e.stopPropagation();
    setFunction(value);
    setActiveDropdown(null);
  };

  const handleRowAction = (e, action, alert) => {
    e.stopPropagation();
    console.log(`${action} on ${alert.id}`);
    if (action === "View Alert") setSelectedAlert(alert);
    setActiveDropdown(null);
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900 relative">
      {/* --- Main Content --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Alerts</h2>
            <p className="text-slate-500 mt-1">
              Monitor, investigate, and resolve system incidents across your
              infrastructure
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm">
            <CheckCircle className="w-4 h-4" /> Mark All as Read
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <SummaryCard icon={AlertTriangle} title="TOTAL ALERTS" count={8} />
          <SummaryCard
            icon={XCircle}
            title="CRITICAL ALERTS"
            count={3}
            type="critical"
          />
          <SummaryCard
            icon={AlertTriangle}
            title="WARNING ALERTS"
            count={3}
            type="warning"
          />
          <SummaryCard
            icon={CheckCircle}
            title="RESOLVED ALERTS"
            count={4}
            type="resolved"
          />
        </div>

        {/* Filters & Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by alert ID, device, or sensor"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-4">
            {/* SEVERITY FILTER */}
            <div className="relative">
              <FilterButton
                label={severityFilter}
                onClick={(e) => toggleDropdown(e, "filter-severity")}
                active={activeDropdown === "filter-severity"}
              />
              {activeDropdown === "filter-severity" && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-30 p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  {["All Severity", "Critical", "Warning", "Info"].map(
                    (opt) => (
                      <DropdownItem
                        key={opt}
                        label={opt}
                        onClick={(e) =>
                          handleSelection(e, setSeverityFilter, opt)
                        }
                      />
                    ),
                  )}
                </div>
              )}
            </div>

            {/* STATUS FILTER */}
            <div className="relative">
              <FilterButton
                label={statusFilter}
                onClick={(e) => toggleDropdown(e, "filter-status")}
                active={activeDropdown === "filter-status"}
              />
              {activeDropdown === "filter-status" && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-30 p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  {["All Status", "New", "Acknowledged", "Resolved"].map(
                    (opt) => (
                      <DropdownItem
                        key={opt}
                        label={opt}
                        onClick={(e) =>
                          handleSelection(e, setStatusFilter, opt)
                        }
                      />
                    ),
                  )}
                </div>
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div className="relative">
              <FilterButton
                label={sortOrder}
                onClick={(e) => toggleDropdown(e, "sort")}
                active={activeDropdown === "sort"}
              />
              {activeDropdown === "sort" && (
                <div className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-30 p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  {["Newest", "Severity", "Status"].map((opt) => (
                    <DropdownItem
                      key={opt}
                      label={opt}
                      onClick={(e) => handleSelection(e, setSortOrder, opt)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-visible shadow-sm min-h-[500px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Alert ID</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Device</th>
                <th className="px-6 py-4">Sensor</th>
                <th className="px-6 py-4">Trigger Reason</th>
                <th className="px-6 py-4">Triggered At</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    Loading alerts...
                  </td>
                </tr>
              ) : alerts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    No alerts found
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {alert.id}
                  </td>
                  <td className="px-6 py-4">
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {alert.deviceId}
                    </div>
                    <div className="text-sm text-slate-500">
                      {alert.deviceName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {alert.sensorId}
                    </div>
                    <div className="text-sm text-slate-500">
                      {alert.sensorType}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 max-w-xs">
                    {alert.triggerReason}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {alert.triggeredAt}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={alert.status} />
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={(e) => toggleDropdown(e, `row-${alert.id}`)}
                      className={`p-2 rounded-full transition-colors ${activeDropdown === `row-${alert.id}` ? "bg-slate-200 text-slate-800" : "hover:bg-slate-200 text-slate-400"}`}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {/* ROW ACTIONS DROPDOWN */}
                    {activeDropdown === `row-${alert.id}` && (
                      <div className="absolute right-8 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                        <DropdownItem
                          icon={Eye}
                          label="View Alert"
                          onClick={(e) =>
                            handleRowAction(e, "View Alert", alert)
                          }
                        />

                        {alert.status !== "Acknowledged" &&
                          alert.status !== "Resolved" && (
                            <DropdownItem
                              icon={Clock}
                              label="Acknowledge"
                              onClick={(e) =>
                                handleRowAction(e, "Acknowledge", alert)
                              }
                            />
                          )}

                        {alert.status !== "Resolved" && (
                          <DropdownItem
                            icon={CheckCircle}
                            label="Resolve"
                            onClick={(e) =>
                              handleRowAction(e, "Resolve", alert)
                            }
                          />
                        )}

                        <DropdownItem
                          icon={ArrowUpRight}
                          label="Escalate"
                          onClick={(e) => handleRowAction(e, "Escalate", alert)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">{alerts.length > 0 ? 1 : 0}</span>–<span className="font-medium text-slate-900">{alerts.length}</span> of{" "}
              <span className="font-medium text-slate-900">{alerts.length}</span> alerts
            </div>
            <div className="flex gap-2">
              <button disabled className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 cursor-default">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button disabled className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-400 cursor-default">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- Alert Details Modal --- */}
      {selectedAlert && (
        <AlertDetailsModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
}

// --- Helper Components for Main Page ---

function SummaryCard({ icon: Icon, title, count, type }) {
  const colors = {
    critical: "text-red-500 bg-red-50 border-red-100",
    warning: "text-orange-500 bg-orange-50 border-orange-100",
    resolved: "text-emerald-500 bg-emerald-50 border-emerald-100",
    default: "text-slate-500 bg-white border-slate-200",
  };
  const { text, bg, border } = colors[type]
    ? {
        text: colors[type].split(" ")[0],
        bg: colors[type].split(" ")[1],
        border: colors[type].split(" ")[2],
      }
    : { text: "text-slate-500", bg: "bg-white", border: "border-slate-200" };

  return (
    <div
      className={`p-6 rounded-2xl border ${border} ${bg} flex items-center justify-between`}
    >
      <div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </div>
        <div className="text-3xl font-bold text-slate-900">{count}</div>
      </div>
      <Icon className={`w-8 h-8 ${text}`} />
    </div>
  );
}

function FilterButton({ label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors ${active ? "bg-slate-50 ring-2 ring-blue-100" : ""}`}
    >
      {label} <ChevronDown className="w-4 h-4 text-slate-400" />
    </button>
  );
}

function DropdownItem({
  icon: Icon,
  label,
  onClick,
  color = "text-slate-700",
  hoverColor = "hover:bg-slate-50",
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${color} ${hoverColor}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-red-100 text-red-700 border-red-200",
    Warning: "bg-orange-100 text-orange-700 border-orange-200",
    Info: "bg-blue-100 text-blue-700 border-blue-200",
  };
  const icon =
    {
      Critical: XCircle,
      Warning: AlertTriangle,
      Info: Info,
    }[severity] || Info;
  const IconComponent = icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[severity]}`}
    >
      <IconComponent className="w-3.5 h-3.5" /> {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    New: "bg-purple-100 text-purple-700 border-purple-200",
    Acknowledged: "bg-blue-100 text-blue-700 border-blue-200",
    Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  const icon =
    {
      New: Zap,
      Acknowledged: Clock,
      Resolved: CheckCircle,
    }[status] || Info;
  const IconComponent = icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      <IconComponent className="w-3.5 h-3.5" /> {status}
    </span>
  );
}

// --- Alert Details Modal Component ---

function AlertDetailsModal({ alert, onClose }) {
  const sensorIcons = {
    Pressure: Waves,
    "Sound Sensor": Volume2,
    Humidity: Waves,
    Temperature: Thermometer,
    Gas: Wind,
    Vibration: Activity,
  };
  const SensorIcon = sensorIcons[alert.sensorType] || Activity;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{alert.id}</h3>
              <p className="text-sm text-slate-500">
                Alert Investigation & Resolution
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* --- Left Column --- */}
            <div className="space-y-6">
              {/* Alert Summary */}
              <div
                className={`p-4 rounded-xl border ${alert.severity === "Critical" ? "bg-red-50 border-red-200" : "bg-orange-50 border-orange-200"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 tracking-wider">
                    ALERT SUMMARY
                  </span>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <p
                  className={`font-medium ${alert.severity === "Critical" ? "text-red-800" : "text-orange-800"}`}
                >
                  {alert.triggerReason}
                </p>
              </div>

              {/* Alert Information */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h4 className="font-semibold text-slate-900 mb-4">
                  Alert Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Alert ID</span>
                    <span className="font-medium">{alert.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Triggered At</span>
                    <span className="font-medium">{alert.triggeredAt}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Status</span>
                    <StatusBadge status={alert.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location</span>
                    <span className="font-medium">{alert.location}</span>
                  </div>
                </div>
              </div>

              {/* Affected Equipment */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">
                  Affected Equipment
                </h4>
                <div className="space-y-3">
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Server className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {alert.deviceId}
                      </div>
                      <div className="text-xs text-slate-500">
                        {alert.deviceName}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <SensorIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {alert.sensorId}
                      </div>
                      <div className="text-xs text-slate-500">
                        {alert.sensorType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Reading */}
              {alert.currentReading !== "N/A" && (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      Current Reading
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {alert.currentReading}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 mb-1">
                      Threshold Limit
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {alert.thresholdLimit}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* --- Middle Column --- */}
            <div className="space-y-6">
              {/* Root Cause Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" /> Root Cause
                  Analysis
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {alert.rootCause}
                </p>
              </div>

              {/* Recommended Actions */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                <h4 className="flex items-center gap-2 font-semibold text-blue-900 mb-4">
                  <ClipboardList className="w-5 h-5 text-blue-600" />{" "}
                  Recommended Actions
                </h4>
                <ul className="space-y-3">
                  {alert.recommendedActions.map((action, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm text-blue-800">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Assessment */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="font-semibold text-slate-900 mb-4">
                  Impact Assessment
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-500">Severity Level</span>
                      <span
                        className={`font-medium ${alert.impact.severity === "High" ? "text-red-600" : "text-orange-600"}`}
                      >
                        {alert.impact.severity}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full w-3/4 ${alert.impact.severity === "High" ? "bg-red-500" : "bg-orange-500"}`}
                      ></div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500">
                        Affected Systems
                      </div>
                      <div className="text-sm font-medium text-slate-900">
                        {alert.impact.affected}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-xs text-slate-500">Priority</div>
                      <div className="text-sm font-medium text-slate-900">
                        {alert.impact.priority}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Right Column --- */}
            <div className="space-y-6">
              {/* Alert Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="font-semibold text-slate-900 mb-4">
                  Alert Timeline
                </h4>
                <div className="relative space-y-6 pl-6 after:absolute after:top-2 after:bottom-2 after:left-[11px] after:w-[2px] after:bg-slate-100">
                  {alert.timeline.map((event, index) => (
                    <div key={index} className="relative z-10">
                      <div
                        className={`absolute -left-6 p-1 rounded-full ${event.type === "created" ? "bg-purple-100 text-purple-600" : event.type === "acknowledged" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}
                      >
                        {event.type === "created" ? (
                          <Zap className="w-3 h-3" />
                        ) : event.type === "acknowledged" ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                      </div>
                      <div className="font-medium text-sm text-slate-900 capitalize">
                        {event.type}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {event.time}
                      </div>
                      {event.user && (
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3" /> {event.user}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions (if acknowledged) */}
              {alert.acknowledgedBy && (
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h4 className="font-semibold text-sm text-slate-900 mb-3">
                    Admin Actions
                  </h4>
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-900">
                        Acknowledged
                      </div>
                      <div className="text-xs text-slate-500">
                        By {alert.acknowledgedBy.user}
                      </div>
                      <div className="text-xs text-slate-400">
                        {alert.acknowledgedBy.time}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                <h4 className="font-semibold text-sm text-slate-900 mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <QuickActionButton
                    icon={CheckCircle}
                    label="Mark as Resolved"
                  />
                  <QuickActionButton
                    icon={Server}
                    label="View Device Details"
                  />
                  <QuickActionButton
                    icon={Activity}
                    label="View Sensor Details"
                  />
                  <QuickActionButton
                    icon={FileText}
                    label="Export Alert Report"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            Mark as Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-blue-300 transition-all group">
      <span className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />{" "}
        {label}
      </span>
      <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90 group-hover:text-blue-500" />
    </button>
  );
}

export default Alerts;
