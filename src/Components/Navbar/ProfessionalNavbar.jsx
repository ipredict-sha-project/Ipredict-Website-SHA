import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfessionalNavbar.css';
import { 
  Menu, ChevronDown, Search, Bell, LayoutDashboard,
  BarChart3, FileText, Users, Cpu, Radio, 
  AlertCircle, Shield, Settings, HelpCircle 
} from 'lucide-react';

// Icon mapping for menu items
const iconMap = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  reports: FileText,
  users: Users,
  devices: Cpu,
  sensors: Radio,
  alerts: AlertCircle,
  security: Shield,
  settings: Settings,
  support: HelpCircle
};

const ProfessionalNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', desc: 'System overview & real-time metrics' },
        { path: '/analytics', label: 'Analytics', icon: 'analytics', desc: 'Data insights & performance trends' },
        { path: '/reports', label: 'Reports', icon: 'reports', desc: 'Generate & export reports' },
      ]
    },
    {
      title: 'MANAGEMENT',
      items: [
        { path: '/users', label: 'Users', icon: 'users', desc: 'Manage user accounts & roles' },
        { path: '/devices', label: 'Devices', icon: 'devices', desc: 'Connected devices & hardware' },
        { path: '/sensors', label: 'Sensors', icon: 'sensors', desc: 'Sensor network & monitoring' },
        { path: '/alerts', label: 'Alerts', icon: 'alerts', desc: 'Active alerts & notifications' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/security', label: 'Security', icon: 'security', desc: 'Access control & permissions' },
        { path: '/settings', label: 'Settings', icon: 'settings', desc: 'System configuration & preferences' },
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
              <Menu className="icon-menu" size={20} />
              <span className="button-text">Main Menu</span>
              <ChevronDown className={`icon-chevron ${menuOpen ? 'rotated' : ''}`} size={16} />
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
                        {section.items.map((item) => {
                          const IconComponent = iconMap[item.icon];
                          return (
                            <button
                              key={item.path}
                              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                              onClick={() => handleNavigation(item.path)}
                            >
                              <div className="menu-item-icon-wrapper">
                                <IconComponent className="menu-item-icon-img" size={20} />
                              </div>
                              <div className="menu-item-content">
                                <span className="menu-item-label">{item.label}</span>
                                <p className="menu-item-desc">{item.desc}</p>
                              </div>
                              {location.pathname === item.path && (
                                <div className="menu-item-indicator"></div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {sectionIdx < menuSections.length - 1 && <div className="menu-divider"></div>}
                    </div>
                  ))}
                </div>
                
                <div className="menu-footer">
                  <button className="menu-support-btn" onClick={() => handleNavigation('/support')}>
                    <div className="menu-support-icon">
                      <HelpCircle className="menu-item-icon-img" size={20} />
                    </div>
                    <span className="menu-support-text">Get Support & Help</span>
                  </button>
                  <p className="menu-footer-text">Need assistance? We're here 24/7</p>
                </div>
              </div>
            )}
          </div>
          <div className="page-badge">
            <LayoutDashboard className="badge-icon" size={18} />
            <span className="badge-text">{getCurrentPageName()}</span>
          </div>
        </div>
        <div className="top-bar-center">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search devices, alerts, users..." 
            className="search-input"
          />
        </div>
        <div className="top-bar-right">
          <button className="notification-button">
            <Bell className="bell-icon" size={20} />
            <span className="notification-dot"></span>
          </button>
          <button className="user-button">
            <div className="user-avatar">
              <span>AD</span>
            </div>
            <ChevronDown className="icon-chevron" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalNavbar;
