import React, { useState, useEffect } from 'react';
import './Reports.css';
import { fetchReports } from '../../services/analyticsService';
import {
  Plus, FileText, Calendar, BarChart3, Clock, X,
  FileType, Sheet, Search, Activity, Radio, AlertCircle,
  TrendingUp, Users, File, MoreVertical
} from 'lucide-react';

function Reports() {
  // Data State
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateReport, setShowCreateReport] = useState(false);
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [exportFormat, setExportFormat] = useState('PDF');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [includeSensorData, setIncludeSensorData] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);
  const [emailReport, setEmailReport] = useState(false);

  // Icon component mapping
  const getReportIcon = (iconType) => {
    const iconMap = {
      'device': Activity,
      'sensors': Radio,
      'alerts': AlertCircle,
      'analytics': TrendingUp,
      'users': Users
    };
    const IconComponent = iconMap[iconType] || FileText;
    return <IconComponent size={20} className="report-icon" />;
  };

  // Fetch reports from Firebase
  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const reportsData = await fetchReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Error loading reports:', error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    loadReports();
  }, []);

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

  // Calculate summary stats from actual reports data
  const totalReports = reports.length;
  const currentMonth = new Date().getMonth();
  const reportsThisMonth = reports.filter(report => {
    // Filter based on createdAt field - adjust logic based on your data structure
    if (report.createdAt && typeof report.createdAt === 'string') {
      return report.createdAt.includes('hour') || report.createdAt.includes('day') || report.createdAt.includes('today');
    }
    return false;
  }).length;
  
  const mostGeneratedType = reports.length > 0 
    ? [...new Set(reports.map(r => r.type))].reduce((a, b) => 
        reports.filter(r => r.type === a).length >= reports.filter(r => r.type === b).length ? a : b
      )
    : 'N/A';
  
  const lastGenerated = reports.length > 0 ? reports[0].createdAt : 'N/A';

  return (

    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Reports</h1>
          <p className="reports-subtitle">Generate, export, and review comprehensive system reports</p>
        </div>
        <button className="reports-generate-btn" onClick={() => setShowCreateReport(!showCreateReport)}>
          <Plus size={18} className="btn-icon" />
          Generate Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary-grid">
        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">TOTAL REPORTS</span>
            <FileText size={20} className="summary-card-icon" />
          </div>
          <div className="summary-card-value">{totalReports}</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">REPORTS THIS MONTH</span>
            <Calendar size={20} className="summary-card-icon" />
          </div>
          <div className="summary-card-value primary">{reportsThisMonth}</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">MOST GENERATED TYPE</span>
            <BarChart3 size={20} className="summary-card-icon" />
          </div>
          <div className="summary-card-value success">{mostGeneratedType}</div>
        </div>

        <div className="reports-summary-card">
          <div className="summary-card-header">
            <span className="summary-card-label">LAST GENERATED</span>
            <Clock size={20} className="summary-card-icon" />
          </div>
          <div className="summary-card-value gray">{lastGenerated}</div>
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
              <X size={20} className="close-icon" />
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
                    <FileType size={20} className="format-icon" />
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
                    <Sheet size={20} className="format-icon" />
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
                  {/* Device options will be loaded from Firebase */}
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
                <Plus size={18} className="btn-icon" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="reports-search-container">
        <div className="reports-search-bar">
          <Search size={18} className="search-icon" />
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
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  Loading reports...
                </td>
              </tr>
            ) : reports.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                <td>
                  <div className="report-name-cell">
                    <div className="report-icon-container">
                      {getReportIcon(report.icon)}
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
                    {report.format === 'PDF' ? (
                      <FileType size={16} className="format-icon" />
                    ) : (
                      <Sheet size={16} className="format-icon" />
                    )}
                    {report.format}
                  </span>
                </td>
                <td>
                  <button className="report-action-btn">
                    <MoreVertical size={18} className="action-icon" />
                  </button>
                </td>
              </tr>
            ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {reports.length > 0 && (
          <div className="reports-pagination">
            <div className="pagination-info">
              Showing <strong>{reports.length > 0 ? 1 : 0}</strong> to <strong>{reports.length}</strong> of <strong>{reports.length}</strong> reports
            </div>
          </div>
        )}
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
