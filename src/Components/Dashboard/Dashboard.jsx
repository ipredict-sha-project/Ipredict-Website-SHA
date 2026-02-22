import React from 'react';
import './Dashboard.css';
import SystemActivityChart from './SystemActivityChart';

// Asset URLs from Figma
const iconDevices = "https://www.figma.com/api/mcp/asset/78522607-89a2-4610-a33c-11af5bef7428";
const iconUsers = "https://www.figma.com/api/mcp/asset/af384de0-2149-4fe9-93f0-7c981ac65757";
const iconSensors = "https://www.figma.com/api/mcp/asset/f8e6fac4-83c0-492b-b6dc-8177329e0ee4";
const iconAlerts = "https://www.figma.com/api/mcp/asset/6ad765ba-05e4-430d-808d-8482bdb05b2b";
const iconTrendUp = "https://www.figma.com/api/mcp/asset/ddf34a17-fad4-4ba8-afd1-8f76991b6c6f";
const iconTrendDown = "https://www.figma.com/api/mcp/asset/76030276-24c2-43eb-97bc-d3c09dc40828";
const iconExport = "https://www.figma.com/api/mcp/asset/d161c949-f142-4f94-ab3a-1df95bfbd2fd";
const iconArrowUp = "https://www.figma.com/api/mcp/asset/70279848-a825-4d05-9e29-95a39798e9a6";
const iconArrowRight = "https://www.figma.com/api/mcp/asset/8b4f1f00-38b7-4547-86c6-daf83a07c605";
const iconAddUser = "https://www.figma.com/api/mcp/asset/3334e805-eea2-4fea-aee4-a925d6e67fc9";
const iconRegisterDevice = "https://www.figma.com/api/mcp/asset/727f7cd7-ff76-4691-867e-3cba9f3680e6";
const iconAssignDevice = "https://www.figma.com/api/mcp/asset/32795601-ca89-4168-858d-51c6ec235bc8";
const iconManageAlerts = "https://www.figma.com/api/mcp/asset/5a98fdf5-dcf3-4791-b4fb-f96895a04ff5";
const iconSystemLogs = "https://www.figma.com/api/mcp/asset/d8bb5697-4b3f-4a92-8590-929a07baa546";
const iconAnalytics = "https://www.figma.com/api/mcp/asset/870b78f5-6bc1-42a0-bfa0-1092db6888f4";
const iconReports = "https://www.figma.com/api/mcp/asset/981448b0-2e6f-4495-8ab8-2a5d6a574aca";
const iconSettings = "https://www.figma.com/api/mcp/asset/08f77e43-15e6-4c37-aade-0af6ffbc9abd";
const iconActivityUser = "https://www.figma.com/api/mcp/asset/1fcde67c-a8f1-4731-8e62-dabfad9f3ffd";
const iconActivityAlert = "https://www.figma.com/api/mcp/asset/cbcdda12-121b-4fdf-aa77-5959e30802d3";
const iconActivityDevice = "https://www.figma.com/api/mcp/asset/e126caa2-badd-49f6-a33b-602b01642df0";
const iconActivitySecurity = "https://www.figma.com/api/mcp/asset/914c3b56-0cb9-45e4-9180-ee4ab51a0c56";
const iconActivitySystem = "https://www.figma.com/api/mcp/asset/b4ef1dc8-3088-4772-911f-49b6b43ca0e9";
const iconActivityAutomation = "https://www.figma.com/api/mcp/asset/0304eb75-5f90-48d5-96ed-6bac2348fe93";

function Dashboard() {
  return (

    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">System Overview</h1>
          <p className="dashboard-subtitle">Real-time monitoring and analytics dashboard</p>
        </div>
        <div className="dashboard-header-actions">
          <div className="dashboard-status-badge">
            <div className="status-indicator"></div>
            <p className="status-text">Last updated: just now</p>
          </div>
          <button className="dashboard-export-btn">
            <img src={iconExport} alt="" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(130.57deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <img src={iconDevices} alt="" />
            </div>
            <p className="stat-label">Total Devices</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">3,542</h2>
            <div className="stat-change">
              <img src={iconTrendUp} alt="" />
              <p className="stat-change-text stat-change-positive">+8.2%</p>
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(132.04deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <img src={iconUsers} alt="" />
            </div>
            <p className="stat-label">Active Users</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">1,248</h2>
            <div className="stat-change">
              <img src={iconTrendUp} alt="" />
              <p className="stat-change-text stat-change-positive">+12.5%</p>
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(129.60deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <img src={iconSensors} alt="" />
            </div>
            <p className="stat-label">Total Sensors</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">2,987</h2>
            <div className="stat-change">
              <img src={iconTrendUp} alt="" />
              <p className="stat-change-text stat-change-positive">+5.3%</p>
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(130.58deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <img src={iconAlerts} alt="" />
            </div>
            <p className="stat-label">Active Alerts</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">24</h2>
            <div className="stat-change">
              <img src={iconTrendDown} alt="" />
              <p className="stat-change-text stat-change-negative">-15.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Activity Chart */}
      <div className="dashboard-chart-card">
        <div className="chart-header">
          <div className="chart-title-section">
            <h2 className="chart-title">System Activity</h2>
            <p className="chart-subtitle">Real-time device and sensor monitoring</p>
          </div>
          <div className="chart-stats">
            <img src={iconArrowUp} alt="" />
            <p className="chart-percentage">+18.2%</p>
            <p className="chart-period">vs last period</p>
          </div>
        </div>
        <div className="chart-container">
          <SystemActivityChart />
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#2962ff' }}></div>
            <p className="legend-label" style={{ color: '#2962ff' }}>Active Devices</p>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: '#10b981' }}></div>
            <p className="legend-label" style={{ color: '#10b981' }}>Sensor Readings</p>
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="dashboard-alerts-card">
        <div className="alerts-header">
          <div className="alerts-title-section">
            <h2 className="alerts-title">Recent Alerts</h2>
            <p className="alerts-subtitle">Latest system notifications and warnings</p>
          </div>
          <button className="view-all-btn">
            <span>View All</span>
            <img src={iconArrowRight} alt="" />
          </button>
        </div>
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Message</th>
              <th>Device</th>
              <th>Severity</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="alert-id">ALR-2025-089</span></td>
              <td><span className="alert-message">Temperature threshold exceeded</span></td>
              <td><span className="alert-device">DEV-457</span></td>
              <td><span className="alert-severity-badge severity-critical">Critical</span></td>
              <td><span className="alert-time">2 min ago</span></td>
              <td><span className="alert-status-badge status-active">Active</span></td>
            </tr>
            <tr>
              <td><span className="alert-id">ALR-2025-088</span></td>
              <td><span className="alert-message">Connection timeout detected</span></td>
              <td><span className="alert-device">DEV-892</span></td>
              <td><span className="alert-severity-badge severity-warning">Warning</span></td>
              <td><span className="alert-time">12 min ago</span></td>
              <td><span className="alert-status-badge status-active">Active</span></td>
            </tr>
            <tr>
              <td><span className="alert-id">ALR-2025-087</span></td>
              <td><span className="alert-message">Low battery warning</span></td>
              <td><span className="alert-device">DEV-234</span></td>
              <td><span className="alert-severity-badge severity-info">Info</span></td>
              <td><span className="alert-time">1 hour ago</span></td>
              <td><span className="alert-status-badge status-resolved">Resolved</span></td>
            </tr>
            <tr>
              <td><span className="alert-id">ALR-2025-086</span></td>
              <td><span className="alert-message">Sensor calibration required</span></td>
              <td><span className="alert-device">DEV-156</span></td>
              <td><span className="alert-severity-badge severity-info">Info</span></td>
              <td><span className="alert-time">2 hours ago</span></td>
              <td><span className="alert-status-badge status-resolved">Resolved</span></td>
            </tr>
            <tr>
              <td><span className="alert-id">ALR-2025-085</span></td>
              <td><span className="alert-message">Network latency spike</span></td>
              <td><span className="alert-device">DEV-678</span></td>
              <td><span className="alert-severity-badge severity-warning">Warning</span></td>
              <td><span className="alert-time">3 hours ago</span></td>
              <td><span className="alert-status-badge status-resolved">Resolved</span></td>
            </tr>
            <tr>
              <td><span className="alert-id">ALR-2025-084</span></td>
              <td><span className="alert-message">Abnormal battery drain</span></td>
              <td><span className="alert-device">DEV-901</span></td>
              <td><span className="alert-severity-badge severity-critical">Critical</span></td>
              <td><span className="alert-time">4 hours ago</span></td>
              <td><span className="alert-status-badge status-resolved">Resolved</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions-card">
        <div className="actions-header">
          <h2 className="actions-title">Quick Actions</h2>
          <p className="actions-subtitle">Frequently used administrative tasks</p>
        </div>
        <div className="actions-grid">
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconAddUser} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Add User</p>
              <p className="action-description">Create new admin</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconRegisterDevice} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Register Device</p>
              <p className="action-description">Add new device</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconAssignDevice} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Assign Device</p>
              <p className="action-description">Link to user</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconManageAlerts} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Manage Alerts</p>
              <p className="action-description">Configure rules</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconSystemLogs} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">System Logs</p>
              <p className="action-description">View activity</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconAnalytics} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Analytics</p>
              <p className="action-description">View insights</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconReports} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Reports</p>
              <p className="action-description">Generate report</p>
            </div>
          </button>
          <button className="action-button">
            <div className="action-icon-wrapper">
              <img src={iconSettings} alt="" />
            </div>
            <div className="action-content">
              <p className="action-title">Settings</p>
              <p className="action-description">Configure system</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-activity-card">
        <div className="activity-header">
          <h2 className="activity-title">Recent Activity</h2>
          <p className="activity-subtitle">Latest actions and system events</p>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#eff6ff' }}>
              <img src={iconActivityUser} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">Ahmed Hassan assigned to new account</p>
              <p className="activity-meta">User • 2 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#fff7ed' }}>
              <img src={iconActivityAlert} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">Critical temperature alert received</p>
              <p className="activity-meta">Alert • 15 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#f0fdf4' }}>
              <img src={iconActivityDevice} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">System calibration completed successfully</p>
              <p className="activity-meta">Device • 32 minutes ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#faf5ff' }}>
              <img src={iconActivitySecurity} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">Weekly security scan completed</p>
              <p className="activity-meta">Security • 1 hour ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#eef2ff' }}>
              <img src={iconActivitySystem} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">Analytics Engine scheduled at 02:00</p>
              <p className="activity-meta">System • 2 hours ago</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon-wrapper" style={{ background: '#ecfeff' }}>
              <img src={iconActivityAutomation} alt="" />
            </div>
            <div className="activity-content">
              <p className="activity-message">Bulk sensor recalibration for 20 devices</p>
              <p className="activity-meta">Automation • 3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <div className="footer-left">
          <p className="footer-version">iPredict Admin v1.0</p>
          <div className="footer-separator"></div>
          <p className="footer-copyright">© 2025 iPredict. All rights reserved.</p>
        </div>
        <p className="footer-timestamp">Last updated: 17:36:33</p>
      </div>
    </div>
  );
}

export default Dashboard;
