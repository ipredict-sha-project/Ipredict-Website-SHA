import React, { useState } from 'react';
import './Reports.css';

// Asset URLs from Figma (node 23:1980)
const iconGenerate = "https://www.figma.com/api/mcp/asset/543ef404-496c-4467-b45d-ea3d2f06557a";
const iconReports = "https://www.figma.com/api/mcp/asset/3adf6e90-9530-44fd-b945-acb81f15122f";
const iconCalendar = "https://www.figma.com/api/mcp/asset/7e175ab6-9846-4840-bf82-4be294b085fb";
const iconChart = "https://www.figma.com/api/mcp/asset/e87448c1-43c5-4d53-95ff-7d338f71c18a";
const iconClock = "https://www.figma.com/api/mcp/asset/585ce222-d326-4230-bcfb-d43dc89a85fc";
const iconCloseX = "https://www.figma.com/api/mcp/asset/45873cee-617c-4712-a6ee-7ccbf3ff19f5";
const iconPDFFormat = "https://www.figma.com/api/mcp/asset/52e5876b-ad22-40fd-8739-db8812cab61b";
const iconCSVFormat = "https://www.figma.com/api/mcp/asset/575eb721-3681-4e8f-92c7-fb849d18650f";
const iconGenerateBlue = "https://www.figma.com/api/mcp/asset/65d82396-a5f6-405f-98c1-a95431e3b06a";
const iconSearch = "https://www.figma.com/api/mcp/asset/808deb04-8ab2-4f7a-b6ce-bec1ccd35c77";
const iconDeviceHealth = "https://www.figma.com/api/mcp/asset/e15df841-210a-4ab9-80db-ab0d87382e3b";
const iconSensors = "https://www.figma.com/api/mcp/asset/41a958b7-b530-41e9-a543-a017634a06d6";
const iconAlerts = "https://www.figma.com/api/mcp/asset/5e22f6d5-915e-4278-9560-271f1d521337";
const iconAnalytics = "https://www.figma.com/api/mcp/asset/b67785bc-e789-492e-b1de-97e4159d89d6";
const iconUsers = "https://www.figma.com/api/mcp/asset/69c26844-db57-46ba-b21a-4a2ce62a1a80";
const iconPDF = "https://www.figma.com/api/mcp/asset/d1169280-0639-46ef-951a-04c0647c574c";
const iconCSV = "https://www.figma.com/api/mcp/asset/7fd8efa6-752a-4a3e-9379-bdf9d9baecf0";
const iconActions = "https://www.figma.com/api/mcp/asset/7360a349-911f-49ad-93a2-2b19478d5438";

function Reports() {
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [includeSensorData, setIncludeSensorData] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);
  const [emailReport, setEmailReport] = useState(false);

  const handleSubmit = () => {
    console.log('Generating report:', {
      reportType,
      dateRange,
      exportFormat,
      selectedDevices,
      includeSensorData,
      includeCharts,
      emailReport
    });
  };


  const reportsData = [
    {
      id: 'RPT-2025-001',
      name: 'Device Health Report - January 2025',
      type: 'Device Health Report',
      generatedBy: 'Ahmed Hassan',
      dateRange: 'Jan 1 - Jan 28, 2025',
      createdAt: '2 hours ago',
      format: 'PDF',
      icon: iconDeviceHealth
    },
    {
      id: 'RPT-2025-002',
      name: 'Sensors Performance Q1 2025',
      type: 'Sensors Performance Report',
      generatedBy: 'Sarah Mohamed',
      dateRange: 'Jan 1 - Jan 28, 2025',
      createdAt: '5 hours ago',
      format: 'CSV',
      icon: iconSensors
    },
    {
      id: 'RPT-2025-003',
      name: 'Critical Alerts - Weekly Summary',
      type: 'Alerts History Report',
      generatedBy: 'Khaled Ali',
      dateRange: 'Jan 21 - Jan 28, 2025',
      createdAt: '1 day ago',
      format: 'PDF',
      icon: iconAlerts
    },
    {
      id: 'RPT-2025-004',
      name: 'System Analytics - Monthly Overview',
      type: 'System Analytics Report',
      generatedBy: 'Fatima Ibrahim',
      dateRange: 'Jan 1 - Jan 28, 2025',
      createdAt: '2 days ago',
      format: 'PDF',
      icon: iconAnalytics
    },
    {
      id: 'RPT-2025-005',
      name: 'User Activity Report - January',
      type: 'User Activity Report',
      generatedBy: 'Ahmed Hassan',
      dateRange: 'Jan 1 - Jan 28, 2025',
      createdAt: '3 days ago',
      format: 'CSV',
      icon: iconUsers
    },
    {
      id: 'RPT-2024-156',
      name: 'Device Health Report - December 2024',
      type: 'Device Health Report',
      generatedBy: 'Sarah Mohamed',
      dateRange: 'Dec 1 - Dec 31, 2024',
      createdAt: '1 month ago',
      format: 'PDF',
      icon: iconDeviceHealth
    }
  ];

  return (

    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Reports</h1>
          <p className="reports-subtitle">Generate, export, and review comprehensive system reports</p>
        </div>
        <button className="reports-generate-btn" onClick={() => setShowCreateReport(!showCreateReport)}>
          <img src={iconGenerate} alt="" className="btn-icon" />
          Generate Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary-grid">
        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">TOTAL REPORTS</span>
            <img src={iconReports} alt="" className="summary-card-icon" />
          </div>
          <div className="summary-card-value">6</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">REPORTS THIS MONTH</span>
            <img src={iconCalendar} alt="" className="summary-card-icon" />
          </div>
          <div className="summary-card-value primary">5</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">MOST GENERATED TYPE</span>
            <img src={iconChart} alt="" className="summary-card-icon" />
          </div>
          <div className="summary-card-value success">Device Health</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">LAST GENERATED</span>
            <img src={iconClock} alt="" className="summary-card-icon" />
          </div>
          <div className="summary-card-value gray">2 hours ago</div>
        </div>
      </div>

      {/* Create New Report Card - Inline */}
      {showCreateReport && (
        <div className="create-report-card">
          <div className="create-report-header">
            <div className="create-report-header-text">
              <h2 className="create-report-title">Create New Report</h2>
              <p className="create-report-subtitle">Configure and generate a comprehensive system report</p>
            </div>
            <button className="close-btn" onClick={() => setShowCreateReport(false)}>
              <img src={iconCloseX} alt="Close" className="close-icon" />
            </button>
          </div>

          <div className="create-report-form">
            <div className="form-left-column">
              <div className="form-field">
                <label className="form-label">
                  Report Type
                  <span className="required">*</span>
                </label>
                <select 
                  className="form-select"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="">Select report type</option>
                  <option value="device">Device Health Report</option>
                  <option value="sensors">Sensors Performance Report</option>
                  <option value="alerts">Alerts History Report</option>
                  <option value="analytics">System Analytics Report</option>
                  <option value="users">User Activity Report</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Date Range
                  <span className="required">*</span>
                </label>
                <select 
                  className="form-select"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="">Select date range</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                  <option value="thismonth">This Month</option>
                  <option value="lastmonth">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

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
                    <img src={iconPDFFormat} alt="PDF" className="format-icon" />
                    <span>PDF</span>
                  </label>
                  <label className={`format-option ${exportFormat === 'CSV' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="format"
                      value="CSV"
                      checked={exportFormat === 'CSV'}
                      onChange={(e) => setExportFormat(e.target.value)}
                    />
                    <img src={iconCSVFormat} alt="CSV" className="format-icon" />
                    <span>CSV</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-right-column">
              <div className="form-field">
                <label className="form-label">Device Selection</label>
                <select 
                  className="form-select device-select"
                  multiple
                  value={selectedDevices}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedDevices(options);
                  }}
                >
                  <option value="all">All Devices</option>
                  <option value="DEV-001">DEV-001 - Temperature Sensor A1</option>
                  <option value="DEV-002">DEV-002 - Pressure Monitor B2</option>
                  <option value="DEV-003">DEV-003 - Humidity Detector C3</option>
                  <option value="DEV-004">DEV-004 - Motion Sensor D4</option>
                  <option value="DEV-005">DEV-005 - Air Quality Monitor E5</option>
                </select>
                <p className="form-help-text">Hold Ctrl/Cmd to select multiple devices</p>
              </div>

              <div className="form-field report-options">
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

          <div className="create-report-footer">
            <button className="cancel-btn" onClick={() => setShowCreateReport(false)}>
              Cancel
            </button>
            <div className="footer-right-buttons">
              <button className="preview-btn">
                Preview Report
              </button>
              <button className="generate-report-btn" onClick={handleSubmit}>
                <img src={iconGenerateBlue} alt="" className="btn-icon" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="reports-search-container">
        <div className="reports-search-bar">
          <img src={iconSearch} alt="" className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by report name or type"
            className="search-input"
          />
        </div>
        <button className="reports-filter-btn">All Report Types</button>
        <button className="reports-filter-btn">Newest First</button>
      </div>

      {/* Reports Table */}
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>REPORT NAME</th>
              <th>REPORT TYPE</th>
              <th>GENERATED BY</th>
              <th>DATE RANGE</th>
              <th>CREATED AT</th>
              <th>FORMAT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {reportsData.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className="report-name-cell">
                    <div className="report-icon-container">
                      <img src={report.icon} alt="" className="report-icon" />
                    </div>
                    <div className="report-name-content">
                      <div className="report-name">{report.name}</div>
                      <div className="report-id">{report.id}</div>
                    </div>
                  </div>
                </td>
                <td className="report-type">{report.type}</td>
                <td className="report-generated-by">{report.generatedBy}</td>
                <td className="report-date-range">{report.dateRange}</td>
                <td className="report-created-at">{report.createdAt}</td>
                <td>
                  <span className={`report-format-badge ${report.format.toLowerCase()}`}>
                    <img src={report.format === 'PDF' ? iconPDF : iconCSV} alt="" className="format-icon" />
                    {report.format}
                  </span>
                </td>
                <td>
                  <button className="report-action-btn">
                    <img src={iconActions} alt="" className="action-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="reports-pagination">
          <div className="pagination-info">
            Showing <strong>1</strong> to <strong>6</strong> of <strong>6</strong> reports
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn">Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="reports-footer">
        <div className="footer-left">
          <span className="footer-version">iPredict Admin v1.0</span>
          <span className="footer-dot"></span>
          <span className="footer-copyright">© 2025 iPredict. All rights reserved.</span>
        </div>
        <div className="footer-right">
          Last updated: 16:10:58
        </div>
      </div>


    </div>
  );
}

export default Reports;
