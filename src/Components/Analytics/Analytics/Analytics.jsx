import React from 'react';
import "./style.css";
import SystemHealthChart from './SystemHealthChart';
import TemperatureChart from './TemperatureChart';
import VibrationChart from './VibrationChart';
import AlertsIncidentChart from './AlertsIncidentChart';

// Metric Card Icons
const iconInfo = "https://www.figma.com/api/mcp/asset/17bb3534-18e7-4aa2-a9cb-9824dc3cb1c6";
const iconDown = "https://www.figma.com/api/mcp/asset/d768f30f-59d6-4653-a6d0-6707594c744e";
const iconAlert = "https://www.figma.com/api/mcp/asset/d768f30f-59d6-4653-a6d0-6707594c744e";
const iconWarning = "https://www.figma.com/api/mcp/asset/f4763846-4410-4402-a314-63252eb31609";
const iconUp = "https://www.figma.com/api/mcp/asset/058fc6cc-a10a-4242-b9b7-9fe77543dd21";
const iconFlat = "https://www.figma.com/api/mcp/asset/fabf6d22-2e91-496c-97ec-159c15504ded";
const iconTarget = "https://www.figma.com/api/mcp/asset/36e4da8e-c259-4509-90c7-265a3443a0e0";

// Section Icons
const iconClock = "https://www.figma.com/api/mcp/asset/87c9f506-ba1d-4040-a789-2b9cf7a3c3e6";
const iconDownload = "https://www.figma.com/api/mcp/asset/95fcdb00-b817-42ba-982a-f99b28611f13";
const iconDevices = "https://www.figma.com/api/mcp/asset/0e54f584-89b8-4dd3-a41b-f7da5bb9e872";
const iconRiskFactors = "https://www.figma.com/api/mcp/asset/e2a291f5-1ebf-4688-8c07-b9fc7bef32c9";
const iconRecommend = "https://www.figma.com/api/mcp/asset/30a43124-67af-4628-80a1-b20722a7460c";
const iconCal = "https://www.figma.com/api/mcp/asset/3e0ffcc4-ee52-49c5-b09b-95b593e70133";
const iconTemp = "https://www.figma.com/api/mcp/asset/9026ebf5-81f4-4654-8a95-4ee2dd25ccb2";
const iconVibration = "https://www.figma.com/api/mcp/asset/f0c904dd-a5ba-4f28-9e76-e84dadf20ef0";
const iconPredictive = "https://www.figma.com/api/mcp/asset/9e4eb055-515f-43b1-9d50-01e3df2b2b31";
const iconPredAlert = "https://www.figma.com/api/mcp/asset/8ba82cd6-3bb9-40c9-9d9f-828d158a674b";
const iconPredWarn = "https://www.figma.com/api/mcp/asset/5e9c2097-778d-4c52-9262-dc0b1acf7c80";
const iconAccuracy = "https://www.figma.com/api/mcp/asset/2c2fa889-0657-4a5d-ab86-798814e78d5e";
const iconAction = "https://www.figma.com/api/mcp/asset/131906fa-a5ba-45fb-99fb-5510cb70b652";

export const AnalyticsScreen = () => {
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
              <img src={iconClock} alt="" className="icon-small" />
              <span>Last 24 hours</span>
            </button>
            <button className="action-button primary">
              <img src={iconDownload} alt="" className="icon-small" />
              <span>Export Insights</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Average Health Score</span>
              <img src={iconInfo} alt="" className="info-icon" />
            </div>
            <div className="metric-value blue">87.5%</div>
            <div className="metric-change">
              <img src={iconDown} alt="" className="trend-icon" />
              <span className="change-text negative">-2.3% vs last period</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Devices at Risk</span>
              <img src={iconWarning} alt="" className="info-icon" />
            </div>
            <div className="metric-value red">12</div>
            <div className="metric-change">
              <img src={iconUp} alt="" className="trend-icon" />
              <span className="change-text positive">+3 from yesterday</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Alerts Trend</span>
              <img src={iconAlert} alt="" className="info-icon" />
            </div>
            <div className="metric-value orange">68</div>
            <div className="metric-change">
              <img src={iconFlat} alt="" className="trend-icon" />
              <span className="change-text neutral">No change</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Prediction Accuracy</span>
              <img src={iconTarget} alt="" className="info-icon" />
            </div>
            <div className="metric-value green">94.2%</div>
            <div className="metric-change">
              <img src={iconUp} alt="" className="trend-icon" />
              <span className="change-text positive">+1.8% improvement</span>
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
              <img src={iconDevices} alt="" className="icon-24" />
            </div>
            <div className="devices-list">
              {/* Device 1 */}
              <div className="device-item">
                <div className="device-header">
                  <div>
                    <div className="device-id">DEV-002</div>
                    <div className="device-name">Pressure Monitor B2</div>
                  </div>
                  <span className="risk-badge high">High Risk</span>
                </div>
                <div className="device-probability">
                  <span className="prob-label">Failure Probability</span>
                  <span className="prob-value">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill high" style={{width: '85%'}}></div>
                </div>
                <div className="device-footer">
                  <img src={iconCal} alt="" className="icon-14" />
                  <span className="footer-text">Est. failure: Next 24 hours</span>
                </div>
              </div>

              {/* Device 2 */}
              <div className="device-item">
                <div className="device-header">
                  <div>
                    <div className="device-id">DEV-003</div>
                    <div className="device-name">Humidity Detector C3</div>
                  </div>
                  <span className="risk-badge medium">Medium Risk</span>
                </div>
                <div className="device-probability">
                  <span className="prob-label">Failure Probability</span>
                  <span className="prob-value">60%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill medium" style={{width: '60%'}}></div>
                </div>
                <div className="device-footer">
                  <img src={iconCal} alt="" className="icon-14" />
                  <span className="footer-text">Est. failure: Next 7 days</span>
                </div>
              </div>

              {/* Device 3 */}
              <div className="device-item">
                <div className="device-header">
                  <div>
                    <div className="device-id">DEV-006</div>
                    <div className="device-name">Water Flow Meter F6</div>
                  </div>
                  <span className="risk-badge medium">Medium Risk</span>
                </div>
                <div className="device-probability">
                  <span className="prob-label">Failure Probability</span>
                  <span className="prob-value">55%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill medium" style={{width: '55%'}}></div>
                </div>
                <div className="device-footer">
                  <img src={iconCal} alt="" className="icon-14" />
                  <span className="footer-text">Est. failure: Next 7 days</span>
                </div>
              </div>

              {/* Device 4 */}
              <div className="device-item">
                <div className="device-header">
                  <div>
                    <div className="device-id">DEV-001</div>
                    <div className="device-name">Temperature Sensor A1</div>
                  </div>
                  <span className="risk-badge low">Low Risk</span>
                </div>
                <div className="device-probability">
                  <span className="prob-label">Failure Probability</span>
                  <span className="prob-value">35%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill low" style={{width: '35%'}}></div>
                </div>
                <div className="device-footer">
                  <img src={iconCal} alt="" className="icon-14" />
                  <span className="footer-text">Est. failure: Next 30 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Risk Factors */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="section-title">Top Risk Factors</h2>
                <p className="section-subtitle">Contributing factors to system degradation</p>
              </div>
              <img src={iconRiskFactors} alt="" className="icon-24" />
            </div>
            <div className="risk-factors-list">
              <div className="risk-factor">
                <div className="factor-header">
                  <span className="factor-label">Temperature</span>
                  <span className="factor-value">35%</span>
                </div>
                <div className="factor-bar">
                  <div className="factor-fill" style={{width: '35%', backgroundColor: '#fb2c36'}}></div>
                </div>
              </div>
              <div className="risk-factor">
                <div className="factor-header">
                  <span className="factor-label">Vibration</span>
                  <span className="factor-value">28%</span>
                </div>
                <div className="factor-bar">
                  <div className="factor-fill" style={{width: '28%', backgroundColor: '#ff6900'}}></div>
                </div>
              </div>
              <div className="risk-factor">
                <div className="factor-header">
                  <span className="factor-label">Sound</span>
                  <span className="factor-value">18%</span>
                </div>
                <div className="factor-bar">
                  <div className="factor-fill" style={{width: '18%', backgroundColor: '#fe9a00'}}></div>
                </div>
              </div>
              <div className="risk-factor">
                <div className="factor-header">
                  <span className="factor-label">Air Quality</span>
                  <span className="factor-value">12%</span>
                </div>
                <div className="factor-bar">
                  <div className="factor-fill" style={{width: '12%', backgroundColor: '#f0b100'}}></div>
                </div>
              </div>
              <div className="risk-factor">
                <div className="factor-header">
                  <span className="factor-label">Pressure</span>
                  <span className="factor-value">7%</span>
                </div>
                <div className="factor-bar">
                  <div className="factor-fill" style={{width: '7%', backgroundColor: '#00c950'}}></div>
                </div>
              </div>
            </div>
            <div className="recommendation-box">
              <img src={iconRecommend} alt="" className="icon-20" />
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
              <img src={iconTemp} alt="" className="icon-20" />
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
              <img src={iconVibration} alt="" className="icon-20" />
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
            <img src={iconPredictive} alt="" className="icon-24" />
          </div>
          <div className="insights-grid">
            {/* Insight 1 - Critical */}
            <div className="insight-card critical">
              <div className="insight-header">
                <div className="insight-icon-wrapper critical">
                  <img src={iconPredAlert} alt="" className="icon-20" />
                </div>
                <div className="accuracy-badge">
                  <img src={iconAccuracy} alt="" className="icon-14" />
                  <span>92%</span>
                </div>
              </div>
              <h3 className="insight-title">Early degradation detected</h3>
              <p className="insight-description">
                DEV-002 showing increasing pressure readings. Failure probability: 72%
              </p>
              <div className="insight-action">
                <img src={iconAction} alt="" className="icon-16" />
                <div className="action-content">
                  <div className="action-label">Recommended Action</div>
                  <div className="action-text">Schedule immediate maintenance check</div>
                </div>
              </div>
            </div>

            {/* Insight 2 - Warning */}
            <div className="insight-card warning">
              <div className="insight-header">
                <div className="insight-icon-wrapper warning">
                  <img src={iconPredWarn} alt="" className="icon-20" />
                </div>
                <div className="accuracy-badge">
                  <img src={iconAccuracy} alt="" className="icon-14" />
                  <span>85%</span>
                </div>
              </div>
              <h3 className="insight-title">Abnormal vibration trend</h3>
              <p className="insight-description">
                DEV-007 vibration levels rising steadily over 48 hours
              </p>
              <div className="insight-action">
                <img src={iconAction} alt="" className="icon-16" />
                <div className="action-content">
                  <div className="action-label">Recommended Action</div>
                  <div className="action-text">Inspect equipment mounting and calibration</div>
                </div>
              </div>
            </div>

            {/* Insight 3 - Warning */}
            <div className="insight-card warning">
              <div className="insight-header">
                <div className="insight-icon-wrapper warning">
                  <img src={iconPredWarn} alt="" className="icon-20" />
                </div>
                <div className="accuracy-badge">
                  <img src={iconAccuracy} alt="" className="icon-14" />
                  <span>78%</span>
                </div>
              </div>
              <h3 className="insight-title">Temperature instability increasing</h3>
              <p className="insight-description">
                Building A climate control showing irregular patterns
              </p>
              <div className="insight-action">
                <img src={iconAction} alt="" className="icon-16" />
                <div className="action-content">
                  <div className="action-label">Recommended Action</div>
                  <div className="action-text">Review HVAC system performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
