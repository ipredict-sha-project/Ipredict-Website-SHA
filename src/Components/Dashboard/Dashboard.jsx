import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import SystemActivityChart from './SystemActivityChart';
import { fetchAlerts, fetchDashboardStats } from '../../services/analyticsService';
import { 
  Cpu, Users, Radio, AlertCircle, TrendingUp, TrendingDown, 
  Download, ArrowUp, ArrowRight, UserPlus, HardDrive, Link,
  Bell, FileText, BarChart3, FileSpreadsheet, Settings,
  User, Activity, Shield, Zap
} from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDevices: 0,
    activeUsers: 0,
    totalSensors: 0,
    activeAlerts: 0
  });
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, alertsData] = await Promise.all([
          fetchDashboardStats(),
          fetchAlerts(7)
        ]);
        
        if (statsData) setStats(statsData);
        if (alertsData.length > 0) setAlerts(alertsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>
          Loading dashboard data...
        </div>
      </div>
    );
  }

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
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(130.57deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <Cpu size={24} />
            </div>
            <p className="stat-label">Total Devices</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">{stats.totalDevices.toLocaleString()}</h2>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(132.04deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <Users size={24} />
            </div>
            <p className="stat-label">Active Users</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">{stats.activeUsers.toLocaleString()}</h2>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(129.60deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <Radio size={24} />
            </div>
            <p className="stat-label">Total Sensors</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">{stats.totalSensors.toLocaleString()}</h2>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(130.58deg, rgba(41, 98, 255, 0.1) 0%, rgba(30, 77, 216, 0.05) 100%)' }}>
              <AlertCircle size={24} />
            </div>
            <p className="stat-label">Active Alerts</p>
          </div>
          <div className="stat-card-footer">
            <h2 className="stat-value">{stats.activeAlerts}</h2>
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
          <button className="view-all-btn" onClick={() => navigate('/alerts')}>
            <span>View All</span>
            <ArrowRight size={16} />
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
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <tr key={alert.id}>
                  <td><span className="alert-id">{alert.id}</span></td>
                  <td><span className="alert-message">{alert.triggerReason || alert.message}</span></td>
                  <td><span className="alert-device">{alert.deviceId}</span></td>
                  <td>
                    <span className={`alert-severity-badge severity-${alert.severity.toLowerCase()}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td><span className="alert-time">{alert.triggeredAt || alert.time}</span></td>
                  <td>
                    <span className={`alert-status-badge status-${alert.status.toLowerCase()}`}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No recent alerts found
                </td>
              </tr>
            )}
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
          <button className="action-button" onClick={() => navigate('/users')}>
            <div className="action-icon-wrapper">
              <UserPlus size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Add User</p>
              <p className="action-description">Create new admin</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/devices')}>
            <div className="action-icon-wrapper">
              <HardDrive size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Register Device</p>
              <p className="action-description">Add new device</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/devices')}>
            <div className="action-icon-wrapper">
              <Link size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Assign Device</p>
              <p className="action-description">Link to user</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/alerts')}>
            <div className="action-icon-wrapper">
              <Bell size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Manage Alerts</p>
              <p className="action-description">Configure rules</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/reports')}>
            <div className="action-icon-wrapper">
              <FileText size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">System Logs</p>
              <p className="action-description">View activity</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/analytics')}>
            <div className="action-icon-wrapper">
              <BarChart3 size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Analytics</p>
              <p className="action-description">View insights</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/reports')}>
            <div className="action-icon-wrapper">
              <FileSpreadsheet size={20} />
            </div>
            <div className="action-content">
              <p className="action-title">Reports</p>
              <p className="action-description">Generate report</p>
            </div>
          </button>
          <button className="action-button" onClick={() => navigate('/settings')}>
            <div className="action-icon-wrapper">
              <Settings size={20} />
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
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No recent activity available
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
