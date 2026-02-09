import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfessionalNavbar.css';

// Top Bar Icons
const iconMenu = "https://www.figma.com/api/mcp/asset/fceaff7c-d87b-4575-b548-72432be93910";
const iconChevron = "https://www.figma.com/api/mcp/asset/63cb7c1e-0a38-4d96-9bbc-5082ae044069";
const iconSearch = "https://www.figma.com/api/mcp/asset/fd877b0e-d06e-4005-94bb-bc72b8fb5f8b";
const iconBell = "https://www.figma.com/api/mcp/asset/e285bfc5-3989-4ffd-9722-3d4bc8305665";
const iconDashboardBadge = "https://www.figma.com/api/mcp/asset/c6c7aa63-cdba-4e93-be45-4cb3797835ec";

// Menu Item Icons
const iconDashboard = "https://www.figma.com/api/mcp/asset/4d2f361f-dd01-406d-ac81-f77145aa5de7";
const iconAnalytics = "https://www.figma.com/api/mcp/asset/15c13034-5415-4dbe-8d3a-1a3726383757";
const iconReports = "https://www.figma.com/api/mcp/asset/c015e0a1-c72a-49af-b525-735c24f70585";
const iconUsers = "https://www.figma.com/api/mcp/asset/ed408a5e-c7d9-4f8d-a2df-dd2d1753e4d0";
const iconDevices = "https://www.figma.com/api/mcp/asset/ce1bdb17-577a-4e1b-b8c2-21e020c48a8a";
const iconSensors = "https://www.figma.com/api/mcp/asset/07d5f830-30fd-4944-9245-6cb917e58e12";
const iconAlerts = "https://www.figma.com/api/mcp/asset/3bef10d6-8dd9-4e4e-befb-7c1bc61a76d5";
const iconSecurity = "https://www.figma.com/api/mcp/asset/a5cc48fe-e2dc-458c-a976-7bf7bc9bb4f0";
const iconSettings = "https://www.figma.com/api/mcp/asset/7d060d96-b390-44b3-9a93-313b7979128f";
const iconSupport = "https://www.figma.com/api/mcp/asset/eb72c4e5-a775-4841-99d8-6c649aaa5911";

const ProfessionalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: iconDashboard, desc: 'System overview & real-time metrics' },
        { path: '/analytics', label: 'Analytics', icon: iconAnalytics, desc: 'Data insights & performance trends' },
        { path: '/reports', label: 'Reports', icon: iconReports, desc: 'Generate & export reports' },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { path: '/users', label: 'Users', icon: iconUsers, desc: 'Manage user accounts & roles', badge: '1.2K', badgeColor: '#eff6ff', badgeText: '#155dfc' },
        { path: '/devices', label: 'Devices', icon: iconDevices, desc: 'Connected devices & hardware', badge: '3.5K', badgeColor: '#faf5ff', badgeText: '#9810fa' },
        { path: '/sensors', label: 'Sensors', icon: iconSensors, desc: 'Sensor network & monitoring', badge: '8.7K', badgeColor: '#ecfdf5', badgeText: '#096' },
        { path: '/alerts', label: 'Alerts', icon: iconAlerts, desc: 'Active alerts & notifications', badge: '24', badgeColor: '#fef2f2', badgeText: '#e7000b' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/security', label: 'Security', icon: iconSecurity, desc: 'Access control & permissions' },
        { path: '/settings', label: 'Settings', icon: iconSettings, desc: 'System configuration & preferences' },
      ]
    }
  ];

  // Get current page name
  const getCurrentPageName = () => {
    for (const section of menuSections) {
      const currentItem = section.items.find(item => item.path === location.pathname);
      if (currentItem) return currentItem.label;
    }
    return 'Dashboard';
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="professional-top-bar">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <div className="logo-section">
            <div className="logo-circle">
              <span className="logo-i">i</span>
            </div>
            <div className="logo-text">
              <div className="logo-title">iPredict</div>
              <div className="logo-subtitle">Admin Panel</div>
            </div>
          </div>
          <div className="menu-wrapper" ref={menuRef}>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              <img src={iconMenu} alt="" className="icon-menu" />
              <span className="button-text">Main Menu</span>
              <img src={iconChevron} alt="" className={`icon-chevron ${menuOpen ? 'rotated' : ''}`} />
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <div className="menu-header">
                  <div className="menu-header-text">
                    <h3 className="menu-title">Navigation</h3>
                    <p className="menu-subtitle">Access all features & pages</p>
                  </div>
                  <div className="menu-logo">
                    <span className="menu-logo-i">i</span>
                  </div>
                </div>
                
                <div className="menu-content">
                  {menuSections.map((section, sectionIdx) => (
                    <div key={section.title} className="menu-section">
                      <div className="menu-section-title">{section.title}</div>
                      <div className="menu-section-items">
                        {section.items.map((item) => (
                          <button
                            key={item.path}
                            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => handleNavigation(item.path)}
                          >
                            <div className="menu-item-icon-wrapper">
                              <img src={item.icon} alt="" className="menu-item-icon-img" />
                            </div>
                            <div className="menu-item-content">
                              <div className="menu-item-title-row">
                                <span className="menu-item-label">{item.label}</span>
                                {item.badge && (
                                  <span className="menu-item-badge" style={{backgroundColor: item.badgeColor, color: item.badgeText}}>
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="menu-item-desc">{item.desc}</p>
                            </div>
                            {location.pathname === item.path && (
                              <div className="menu-item-indicator"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      {sectionIdx < menuSections.length - 1 && <div className="menu-divider"></div>}
                    </div>
                  ))}
                </div>
                
                <div className="menu-footer">
                  <button className="menu-support-btn" onClick={() => handleNavigation('/support')}>
                    <div className="menu-support-icon">
                      <img src={iconSupport} alt="" className="menu-item-icon-img" />
                    </div>
                    <span className="menu-support-text">Get Support & Help</span>
                  </button>
                  <p className="menu-footer-text">Need assistance? We're here 24/7</p>
                </div>
              </div>
            )}
          </div>
          <div className="page-badge">
            <img src={iconDashboardBadge} alt="" className="badge-icon" />
            <span className="badge-text">{getCurrentPageName()}</span>
          </div>
        </div>
        <div className="top-bar-center">
          <img src={iconSearch} alt="" className="search-icon" />
          <input 
            type="text" 
            placeholder="Search devices, alerts, users..." 
            className="search-input"
          />
        </div>
        <div className="top-bar-right">
          <button className="notification-button">
            <img src={iconBell} alt="" className="bell-icon" />
            <span className="notification-dot"></span>
          </button>
          <button className="user-button">
            <div className="user-avatar">
              <span>AD</span>
            </div>
            <img src={iconChevron} alt="" className="icon-chevron" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalNavbar;
