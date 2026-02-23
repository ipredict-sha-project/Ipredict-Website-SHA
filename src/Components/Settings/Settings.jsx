import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  Info,
  Activity,
  Brain,
  Bell as BellIcon,
  Server,
  Database,
  Globe,
  RotateCcw,
  Save,
  Check,
  CloudLightning,
  Thermometer,
  Waves,
  Volume2,
  Wind,
  ChevronDown,
} from "lucide-react";
import { fetchSettings, updateSettings } from '../../services/analyticsService';

function Settings() {
  const [loading, setLoading] = useState(false);
  const [sensitivity, setSensitivity] = useState("Medium");
  const [systemMode, setSystemMode] = useState("Live");
  const [tempWeight, setTempWeight] = useState(35);
  const [vibrationWeight, setVibrationWeight] = useState(30);
  const [soundWeight, setSoundWeight] = useState(20);
  const [airQualityWeight, setAirQualityWeight] = useState(15);

  // Load settings from Firebase
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const settingsData = await fetchSettings();
        if (settingsData) {
          if (settingsData.sensitivity) setSensitivity(settingsData.sensitivity);
          if (settingsData.systemMode) setSystemMode(settingsData.systemMode);
          if (settingsData.tempWeight !== undefined) setTempWeight(settingsData.tempWeight);
          if (settingsData.vibrationWeight !== undefined) setVibrationWeight(settingsData.vibrationWeight);
          if (settingsData.soundWeight !== undefined) setSoundWeight(settingsData.soundWeight);
          if (settingsData.airQualityWeight !== undefined) setAirQualityWeight(settingsData.airQualityWeight);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const success = await updateSettings({
        sensitivity,
        systemMode,
        tempWeight,
        vibrationWeight,
        soundWeight,
        airQualityWeight
      });
      if (success) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      {/* --- Main Content --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-8 pb-32">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500 mt-1">
            Configure system behavior and global preferences
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 mb-8">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm">
              System-Wide Configuration
            </h4>
            <p className="text-blue-700 text-sm mt-1 leading-relaxed">
              Changes made here affect system-wide behavior. Admin privileges
              required. Make sure to save your changes before leaving this page.
            </p>
          </div>
        </div>

        {/* Section 1: Monitoring Configuration */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <SectionHeader
            icon={Activity}
            title="Monitoring Configuration"
            subtitle="Configure data collection and monitoring intervals"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectGroup
              label="Sensor Data Collection Interval"
              options={[
                "Every 5 Seconds",
                "Every 10 Seconds",
                "Every 30 Seconds",
                "Every 1 Minute",
                "Every 5 Minutes",
              ]}
            />
            <SelectGroup
              label="Health Score Calculation Interval"
              options={[
                "Every 5 Seconds",
                "Every 10 Seconds",
                "Every 30 Seconds",
                "Every 1 Minute",
                "Every 5 Minutes",
              ]}
            />
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Data Retention Period (Days)
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="90"
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  days
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end md:justify-start md:mt-8">
              <ToggleSwitch
                label="Enable Real-Time Monitoring"
                sublabel="Stream live data from all sensors"
                checked={true}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Prediction & Intelligence */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <SectionHeader
            icon={Brain}
            title="Prediction & Intelligence"
            subtitle="Configure AI-powered predictive analytics and detection"
          />

          <div className="mt-6 space-y-8">
            {/* Sensitivity */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Prediction Sensitivity Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSensitivity(level)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      sensitivity === level
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Higher sensitivity detects more potential issues but may
                increase false positives
              </p>
            </div>

            {/* Detection Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                <div>
                  <div className="font-medium text-slate-800 text-sm">
                    Trend-Based Degradation Detection
                  </div>
                  <div className="text-xs text-slate-500">
                    Identify gradual performance decline
                  </div>
                </div>
                <ToggleSwitch checked={true} simple />
              </div>
              <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                <div>
                  <div className="font-medium text-slate-800 text-sm">
                    Anomaly Detection
                  </div>
                  <div className="text-xs text-slate-500">
                    Detect unusual patterns in sensor data
                  </div>
                </div>
                <ToggleSwitch checked={true} simple />
              </div>
            </div>

            {/* Health Score Weights - Range Sliders */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Health Score Weighting Configuration
              </label>
              <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <RangeSlider
                  icon={Thermometer}
                  color="text-red-500"
                  label="Temperature"
                  value={tempWeight}
                  onChange={setTempWeight}
                />
                <RangeSlider
                  icon={Activity}
                  color="text-orange-500"
                  label="Vibration"
                  value={vibrationWeight}
                  onChange={setVibrationWeight}
                />
                <RangeSlider
                  icon={Volume2}
                  color="text-yellow-500"
                  label="Sound"
                  value={soundWeight}
                  onChange={setSoundWeight}
                />
                <RangeSlider
                  icon={Wind}
                  color="text-blue-500"
                  label="Air Quality"
                  value={airQualityWeight}
                  onChange={setAirQualityWeight}
                />

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Total Weight</span>
                    <span
                      className={`${tempWeight + vibrationWeight + soundWeight + airQualityWeight === 100 ? "text-emerald-600" : "text-orange-600"}`}
                    >
                      {tempWeight +
                        vibrationWeight +
                        soundWeight +
                        airQualityWeight}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        tempWeight +
                          vibrationWeight +
                          soundWeight +
                          airQualityWeight ===
                        100
                          ? "bg-emerald-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (tempWeight +
                            vibrationWeight +
                            soundWeight +
                            airQualityWeight) /
                            1,
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Alerts & Notifications */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <SectionHeader
            icon={BellIcon}
            title="Alerts & Notifications"
            subtitle="Configure alert delivery and notification channels"
          />

          <div className="mt-6 space-y-6">
            <div>
              <SelectGroup
                label="Alert Severity Threshold"
                options={[
                  "Critical only",
                  "Warning & above",
                  "Info & above",
                  "All alerts",
                ]}
              />
              <p className="text-xs text-slate-400 mt-2">
                Only alerts at or above this threshold will trigger
                notifications
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Notification Channels
              </label>
              <div className="bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
                <NotificationRow
                  label="Enable System Alerts"
                  sub="Master switch for all alert notifications"
                  checked={true}
                />
                <NotificationRow
                  label="In-App Notifications"
                  sub="Show alerts in the dashboard"
                  checked={true}
                />
                <NotificationRow
                  label="Email Notifications"
                  sub="Send alerts via email"
                  checked={true}
                />
                <NotificationRow
                  label="SMS Notifications"
                  sub="Send critical alerts via SMS"
                  checked={false}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alert Escalation Delay
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="15"
                  className="w-full border border-slate-200 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  minutes
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Time to wait before escalating unacknowledged alerts
              </p>
            </div>
          </div>
        </section>

        {/* Split Section: System Mode & Backup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* System Mode */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
            <SectionHeader
              icon={Server}
              title="System Mode"
              subtitle="Configure system operation mode"
            />

            <div className="mt-6 space-y-3 flex-1">
              <ModeCard
                title="Demo Mode"
                desc="Use simulated data for testing and demonstrations"
                active={systemMode === "Demo"}
                onClick={() => setSystemMode("Demo")}
              />
              <ModeCard
                title="Live Mode"
                desc="Connect to real sensors and process live data"
                active={systemMode === "Live"}
                onClick={() => setSystemMode("Live")}
              />
              <ModeCard
                title="Maintenance Mode"
                desc="Disable monitoring during system maintenance"
                active={systemMode === "Maintenance"}
                onClick={() => setSystemMode("Maintenance")}
              />
            </div>
          </section>

          {/* Backup & Recovery */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
            <SectionHeader
              icon={Database}
              title="Backup & Recovery"
              subtitle="Manage system backups and restore"
            />

            <div className="mt-6 space-y-6 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                <div>
                  <div className="font-medium text-slate-800 text-sm">
                    Enable Automatic Backups
                  </div>
                  <div className="text-xs text-slate-500">
                    Automatically backup system data
                  </div>
                </div>
                <ToggleSwitch checked={true} simple />
              </div>

              <SelectGroup
                label="Backup Frequency"
                options={["Every Hour", "Daily", "Weekly", "Monthly"]}
              />

              <div className="space-y-3 pt-2">
                <button className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 bg-white">
                  <Database className="w-4 h-4" /> Create Manual Backup
                </button>
                <button className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 bg-white">
                  <RotateCcw className="w-4 h-4" /> Restore from Backup
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Section 6: General */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <SectionHeader
            icon={Globe}
            title="General"
            subtitle="Configure regional and display preferences"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectGroup
              label="System Timezone"
              options={[
                "UTC",
                "UTC+1 (CET)",
                "UTC+2 (EET)",
                "UTC+3 (EEST)",
                "UTC+5:30 (IST)",
                "UTC+8 (CST)",
                "UTC+9 (JST)",
                "UTC-5 (EST)",
                "UTC-6 (CST)",
                "UTC-7 (MST)",
                "UTC-8 (PST)",
              ]}
            />
            <SelectGroup
              label="Language"
              options={[
                "English",
                "Arabic",
                "Spanish",
                "French",
                "German",
                "Chinese",
                "Japanese",
                "Hindi",
                "Portuguese",
                "Russian",
              ]}
            />
            <SelectGroup
              label="Date & Time Format"
              options={[
                "DD/MM/YYYY HH:mm:ss",
                "MM/DD/YYYY HH:mm:ss",
                "YYYY-MM-DD HH:mm:ss",
                "DD-MMM-YYYY HH:mm",
                "MMM DD, YYYY h:mm A",
              ]}
            />
            <SelectGroup
              label="Default Dashboard View"
              options={[
                "Dashboard",
                "Devices",
                "Sensors",
                "Alerts",
                "Analytics",
              ]}
            />
          </div>
        </section>
      </main>

      {/* --- Footer Action Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-600 font-medium hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset to Default
          </button>

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm shadow-blue-200 transition-all">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function InputGroup({ label }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        className="w-full border border-slate-200 rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    </div>
  );
}

function SelectGroup({ label, options = [], required = false }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-slate-700 mb-2">
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

function RangeSlider({ icon: Icon, color, label, value = 30, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-blue-600">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange && onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}

function ToggleSwitch({ label, sublabel, checked, simple = false }) {
  return (
    <div
      className={`flex items-center justify-between ${simple ? "" : "bg-slate-50 p-4 rounded-xl border border-slate-200"}`}
    >
      {!simple && (
        <div className="mr-4">
          <div className="font-medium text-slate-800 text-sm">{label}</div>
          {sublabel && (
            <div className="text-xs text-slate-500 mt-0.5">{sublabel}</div>
          )}
        </div>
      )}

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={checked}
        />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

function WeightBar({ icon: Icon, color, label, percent }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-bold text-blue-600">{percent}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full bg-slate-200 w-full relative`}>
          <div
            style={{ width: `${percent}%` }}
            className={`absolute top-0 left-0 h-full bg-current ${color.replace("text", "bg")}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

function NotificationRow({ label, sub, checked }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <div className="text-sm font-medium text-slate-800">{label}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
      <ToggleSwitch checked={checked} simple />
    </div>
  );
}

function ModeCard({ title, desc, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        active
          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
          : "bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-white text-slate-700"
      }`}
    >
      <div className="font-semibold text-sm mb-1">{title}</div>
      <div className={`text-xs ${active ? "text-blue-100" : "text-slate-500"}`}>
        {desc}
      </div>
    </div>
  );
}

export default Settings;
