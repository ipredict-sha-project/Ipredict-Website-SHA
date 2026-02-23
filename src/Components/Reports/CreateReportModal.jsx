import React, { useState } from 'react';
import './CreateReportModal.css';
import { X, FileText, Sheet, Zap } from 'lucide-react';

function CreateReportModal({ isOpen, onClose }) {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [includeSensorData, setIncludeSensorData] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);
  const [emailReport, setEmailReport] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle report generation
    console.log({
      reportType,
      dateRange,
      exportFormat,
      selectedDevices,
      includeSensorData,
      includeCharts,
      emailReport
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-report-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-content">
            <h2 className="modal-title">Create New Report</h2>
            <p className="modal-subtitle">Configure and generate a comprehensive system report</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal-form-grid">
            {/* Left Column */}
            <div className="modal-form-column">
              {/* Report Type */}
              <div className="form-field">
                <label className="form-label">
                  Report Type
                  <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="">Select report type</option>
                  <option value="device-health">Device Health Report</option>
                  <option value="sensors-performance">Sensors Performance Report</option>
                  <option value="alerts-history">Alerts History Report</option>
                  <option value="system-analytics">System Analytics Report</option>
                  <option value="user-activity">User Activity Report</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="form-field">
                <label className="form-label">
                  Date Range
                  <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  required
                >
                  <option value="">Select date range</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Export Format */}
              <div className="form-field">
                <label className="form-label">
                  Export Format
                  <span className="required">*</span>
                </label>
                <div className="format-options">
                  <label className={`format-option ${exportFormat === 'PDF' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="format"
                      value="PDF"
                      checked={exportFormat === 'PDF'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    <div className="format-option-content">
                      <FileText size={24} className="format-icon" />
                      <span>PDF</span>
                    </div>
                  </label>
                  <label className={`format-option ${exportFormat === 'CSV' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="format"
                      value="CSV"
                      checked={exportFormat === 'CSV'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    <div className="format-option-content">
                      <Sheet size={24} className="format-icon" />
                      <span>CSV</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="modal-form-column">
              {/* Device Selection */}
              <div className="form-field">
                <label className="form-label">Device Selection</label>
                <select
                  className="form-select device-select"
                  multiple
                  value={selectedDevices}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions);
                    setSelectedDevices(options.map(opt => opt.value));
                  }}
                >
                  <option value="all">All Devices</option>
                  <option value="DEV-001">DEV-001 - Temperature Sensor A1</option>
                  <option value="DEV-002">DEV-002 - Pressure Monitor B2</option>
                  <option value="DEV-003">DEV-003 - Humidity Detector C3</option>
                  <option value="DEV-004">DEV-004 - Motion Sensor D4</option>
                  <option value="DEV-005">DEV-005 - Air Quality Monitor E5</option>
                </select>
                <p className="form-hint">Hold Ctrl/Cmd to select multiple devices</p>
              </div>

              {/* Options */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeSensorData}
                    onChange={(e) => setIncludeSensorData(e.target.checked)}
                  />
                  <span>Include detailed sensor data</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                  />
                  <span>Include charts and visualizations</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={emailReport}
                    onChange={(e) => setEmailReport(e.target.checked)}
                  />
                  <span>Email report after generation</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <div className="modal-footer-actions">
              <button type="button" className="btn-preview">
                Preview Report
              </button>
              <button type="submit" className="btn-generate">
                <Zap size={20} className="btn-icon" />
                Generate Report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReportModal;
