import React, { useState, useEffect } from 'react';
import "./style.css";
import SystemHealthChart from './SystemHealthChart';
import TemperatureChart from './TemperatureChart';
import VibrationChart from './VibrationChart';
import AlertsIncidentChart from './AlertsIncidentChart';
import { fetchDevicesAtRisk, fetchMetrics, fetchRiskFactors, fetchPredictiveInsights } from '../../../services/analyticsService';
import {
  Info, TrendingDown, AlertCircle, AlertTriangle, TrendingUp, Minus,
  Target, Clock, Download, Cpu, TriangleAlert, Lightbulb, Calendar,
  Thermometer, Activity, Zap, CheckCircle, ArrowRight
} from 'lucide-react';

export const AnalyticsScreen = () => {
  const [devices, setDevices] = useState([]);
  const [metrics, setMetrics] = useState({
    healthScore: 0,
    devicesAtRisk: 0,
    alertsTrend: 0,
    predictionAccuracy: 0
  });
  const [riskFactors, setRiskFactors] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      try {
        const [devicesData, metricsData, riskFactorsData, insightsData] = await Promise.all([
          fetchDevicesAtRisk(),
          fetchMetrics(),
          fetchRiskFactors(),
          fetchPredictiveInsights()
        ]);
        
        if (devicesData && devicesData.length > 0) setDevices(devicesData);
        if (metricsData) setMetrics(metricsData);
        if (riskFactorsData && riskFactorsData.length > 0) setRiskFactors(riskFactorsData);
        if (insightsData && insightsData.length > 0) setInsights(insightsData);
      } catch (error) {
        console.error('Error loading analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-content">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            fontSize: '18px',
            color: '#64748b'
          }}>
            Loading analytics data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      {/* Main Content */}
      <div className="analytics-content">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-text">
            <h1 className="page-title">Analytics</h1>
            <p className="page-description">
              System health trends and predictive insights across your infrastructure
            </p>
          </div>
          <div className="header-actions">
            <button className="action-button">
              <Clock size={18} className="icon-small" />
              <span>Last 24 hours</span>
            </button>
            <button className="action-button primary">
              <Download size={18} className="icon-small" />
              <span>Export Insights</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Average Health Score</span>
              <Info size={18} className="info-icon" />
            </div>
            <div className="metric-value blue">
              {metrics.healthScore > 0 ? `${metrics.healthScore}%` : 'No data'}
            </div>
            <div className="metric-change">
              <TrendingDown size={16} className="trend-icon" />
              <span className="change-text negative">
                {metrics.healthScore > 0 ? '-2.3% vs last period' : 'Waiting for data'}
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Devices at Risk</span>
              <AlertTriangle size={18} className="info-icon" />
            </div>
            <div className="metric-value red">
              {metrics.devicesAtRisk > 0 ? metrics.devicesAtRisk : 'No data'}
            </div>
            <div className="metric-change">
              <TrendingUp size={16} className="trend-icon" />
              <span className="change-text positive">
                {metrics.devicesAtRisk > 0 ? '+3 from yesterday' : 'Waiting for data'}
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Alerts Trend</span>
              <AlertCircle size={18} className="info-icon" />
            </div>
            <div className="metric-value orange">
              {metrics.alertsTrend > 0 ? metrics.alertsTrend : 'No data'}
            </div>
            <div className="metric-change">
              <Minus size={16} className="trend-icon" />
              <span className="change-text neutral">
                {metrics.alertsTrend > 0 ? 'No change' : 'Waiting for data'}
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Prediction Accuracy</span>
              <Target size={18} className="info-icon" />
            </div>
            <div className="metric-value green">
              {metrics.predictionAccuracy > 0 ? `${metrics.predictionAccuracy}%` : 'No data'}
            </div>
            <div className="metric-change">
              <TrendingUp size={16} className="trend-icon" />
              <span className="change-text positive">
                {metrics.predictionAccuracy > 0 ? '+1.8% improvement' : 'Waiting for data'}
              </span>
            </div>
          </div>
        </div>

        {/* System Health Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title-section">
              <h2 className="chart-title">System Health Score</h2>
              <p className="chart-subtitle">Average health score across all devices over time</p>
            </div>
            <div className="chart-legend">
              <span className="legend-dot"></span>
              <span className="legend-text">Health Score</span>
            </div>
          </div>
          <div className="chart-container">
            <SystemHealthChart />
          </div>
        </div>

        {/* Two Column Grid - Devices at Risk & Top Risk Factors */}
        <div className="two-column-grid">
          {/* Devices at Risk */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="section-title">Devices at Risk</h2>
                <p className="section-subtitle">Devices with elevated failure probability</p>
              </div>
              <Cpu size={24} className="icon-24" />
            </div>
            <div className="devices-list">
              {devices.length > 0 ? (
                devices.map((device) => (
                  <div key={device.id} className="device-item">
                    <div className="device-header">
                      <div>
                        <div className="device-id">{device.deviceId}</div>
                        <div className="device-name">{device.name}</div>
                      </div>
                      <span className={`risk-badge ${device.riskLevel}`}>
                        {device.riskLevel === 'high' ? 'High Risk' : 
                         device.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
                      </span>
                    </div>
                    <div className="device-probability">
                      <span className="prob-label">Failure Probability</span>
                      <span className="prob-value">{device.failureProbability}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${device.riskLevel}`} 
                        style={{width: `${device.failureProbability}%`}}
                      ></div>
                    </div>
                    <div className="device-footer">
                      <Calendar size={14} className="icon-14" />
                      <span className="footer-text">{device.estimatedFailure}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No devices at risk found
                </div>
              )}
            </div>
          </div>

          {/* Top Risk Factors */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="section-title">Top Risk Factors</h2>
                <p className="section-subtitle">Contributing factors to system degradation</p>
              </div>
              <TriangleAlert size={24} className="icon-24" />
            </div>
            <div className="risk-factors-list">
              {riskFactors.length > 0 ? (
                riskFactors.map((factor, index) => (
                  <div key={factor.id || index} className="risk-factor">
                    <div className="factor-header">
                      <span className="factor-label">{factor.label || factor.name}</span>
                      <span className="factor-value">{factor.percentage}%</span>
                    </div>
                    <div className="factor-bar">
                      <div 
                        className="factor-fill" 
                        style={{
                          width: `${factor.percentage}%`, 
                          backgroundColor: factor.color || '#fb2c36'
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No risk factors data available
                </div>
              )}
            </div>
            <div className="recommendation-box">
              <Lightbulb size={20} className="icon-20" />
              <div className="recommendation-content">
                <div className="recommendation-title">Recommendation</div>
                <div className="recommendation-text">
                  Focus maintenance efforts on temperature and vibration monitoring to reduce overall system risk by an estimated 40%.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Grid - Temperature & Vibration Charts */}
        <div className="two-column-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="section-title-small">Temperature Trends</h2>
                <p className="section-subtitle">Average temperature across sensors</p>
              </div>
              <Thermometer size={20} className="icon-20" />
            </div>
            <div className="chart-container-small">
              <TemperatureChart />
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="section-title-small">Vibration Intensity</h2>
                <p className="section-subtitle">Average vibration levels over time</p>
              </div>
              <Activity size={20} className="icon-20" />
            </div>
            <div className="chart-container-small">
              <VibrationChart />
            </div>
          </div>
        </div>

        {/* Full Width - Alerts & Incident Trends */}
        <div className="card full-width">
          <div className="card-header-alert">
            <div>
              <h2 className="section-title">Alerts & Incident Trends</h2>
              <p className="section-subtitle">Alert frequency and severity distribution over the week</p>
            </div>
            <div className="alert-legend">
              <div className="legend-item">
                <div className="legend-dot critical"></div>
                <span>Critical</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot warning"></div>
                <span>Warning</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot info"></div>
                <span>Info</span>
              </div>
            </div>
          </div>
          <div className="chart-container" style={{height: '300px'}}>
            <AlertsIncidentChart />
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="card full-width">
          <div className="card-header">
            <div>
              <h2 className="section-title">Predictive Insights</h2>
              <p className="section-subtitle">AI-powered predictions and recommended actions</p>
            </div>
            <Zap size={24} className="icon-24" />
          </div>
          <div className="insights-grid">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <div key={insight.id} className={`insight-card ${insight.severity || 'warning'}`}>
                  <div className="insight-header">
                    <div className={`insight-icon-wrapper ${insight.severity || 'warning'}`}>
                      {insight.severity === 'critical' ? (
                        <AlertCircle size={20} className="icon-20" />
                      ) : (
                        <AlertTriangle size={20} className="icon-20" />
                      )}
                    </div>
                    <div className="accuracy-badge">
                      <CheckCircle size={14} className="icon-14" />
                      <span>{insight.accuracy}%</span>
                    </div>
                  </div>
                  <h3 className="insight-title">{insight.title}</h3>
                  <p className="insight-description">{insight.description}</p>
                  <div className="insight-action">
                    <ArrowRight size={16} className="icon-16" />
                    <div className="action-content">
                      <div className="action-label">Recommended Action</div>
                      <div className="action-text">{insight.recommendedAction}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No predictive insights available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
